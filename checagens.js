/* Checagens do index.html. Sem dependencia nenhuma: node checagens.js
 *
 * Existe por um motivo concreto. Os blocos de substituicao em S sao
 * compartilhados entre planilhas, e varios trazem variacoes com carga axial ou
 * tronco livre. Usar um bloco generico numa planilha marcada semAbdomen nao
 * quebra nada, nao aparece na tela e passa despercebido numa revisao: o
 * exercicio proibido so surge depois, dentro do painel "Maquina ocupada".
 * Foi exatamente assim que remada curvada, stiff e nordico entraram na
 * planilha da Carol. Estas checagens existem para isso nao voltar calado.
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ARQUIVO = path.join(__dirname, "index.html");

/* Contraindicados para quem nao pode fazer forca abdominal (endometriose):
   abdominal direto, elevacao pelvica e tudo que sobe a pressao intra-abdominal
   por carga axial ou tronco livre. Lista conservadora de proposito. */
const PROIBIDOS = [
  /abdominal/i, /abd[oô]men/i, /prancha/i, /\bsupra\b/i, /\binfra\b/i,
  /eleva[çc][ãa]o de quadril/i, /hip thrust/i, /p[ée]lvica/i,
  /levantamento terra/i, /\bterra\b/i, /stiff/i, /good morning/i,
  /agachamento livre/i, /remada curvada/i, /cavalinho/i, /lombar/i,
  /sissy/i, /n[óo]rdico/i, /barra nas costas/i, /militar/i,
  /barra fixa/i, /superman/i, /paralelas/i, /mergulho/i
];

/* ------------------------------------------------------------------ */

function extrairDados() {
  const html = fs.readFileSync(ARQUIVO, "utf8");
  const pega = (nome) => {
    const i = html.indexOf("const " + nome + " = {");
    if (i === -1) throw new Error("não achei 'const " + nome + "' no index.html");
    const fim = html.indexOf("\n};", i);
    if (fim === -1) throw new Error("não achei o fim de " + nome);
    return html.slice(i, fim + 3);
  };
  const ctx = {};
  vm.createContext(ctx);
  vm.runInContext(pega("S") + "\n" + pega("PLANOS") + "\nvar __ = {S:S, PLANOS:PLANOS};", ctx);
  return ctx.__;
}

/* mesma expansao do app: "4x 6-10" sao quatro series, uma linha e um campo de
   carga cada. Se isso divergir do app, a contagem conferida aqui nao e a que
   aparece na tela. */
function expandirSeries(lista){
  const fora=[];
  (lista||[]).forEach(txt=>{
    const m=String(txt).match(/^\s*(\d+)\s*x\s*(.+)$/i);
    if(m){ const n=parseInt(m[1],10); for(let i=0;i<n;i++) fora.push(m[2].trim()); }
    else fora.push(String(txt).trim());
  });
  return fora;
}

/* mesmo parser do app; se divergir, a checagem perde o sentido */
function duracoes(txt) {
  return String(txt).split("/").map(p => p.trim()).filter(Boolean).map(p => {
    const nums = p.match(/\d+/g);
    if (!nums) return null;
    const n = parseInt(nums[0], 10);
    return { seg: /min/i.test(p) ? n * 60 : n, rotulo: p };
  }).filter(Boolean);
}

/* ------------------------------------------------------------------ */

const falhas = [];
const avisos = [];
let checados = 0;

function erro(onde, msg) { falhas.push(onde + " — " + msg); }
function aviso(onde, msg) { avisos.push(onde + " — " + msg); }

function checar(S, PLANOS) {
  const nomesDePlano = new Set();

  for (const chave of Object.keys(PLANOS)) {
    const p = PLANOS[chave];
    const ondeP = "PLANOS." + chave;

    for (const campo of ["nome", "freq", "resumo", "semana", "treinos"]) {
      if (!p[campo]) erro(ondeP, "falta o campo " + campo);
    }
    if (p.nome) {
      if (nomesDePlano.has(p.nome)) erro(ondeP, "nome repetido: " + p.nome);
      nomesDePlano.add(p.nome);
    }

    const letras = Object.keys(p.treinos || {});
    if (!letras.length) { erro(ondeP, "nenhum treino"); continue; }

    for (const dia of Object.keys(p.semana || {})) {
      const n = Number(dia);
      if (!Number.isInteger(n) || n < 0 || n > 6) erro(ondeP, "semana tem dia inválido: " + dia);
      if (!p.treinos[p.semana[dia]]) erro(ondeP, "semana[" + dia + "] aponta para o treino " + p.semana[dia] + ", que não existe");
    }

    for (const t of letras) {
      const treino = p.treinos[t];
      const ondeT = ondeP + "/" + t;
      if (!treino.dia) erro(ondeT, "falta o rótulo do dia");
      if (!Array.isArray(treino.ex) || !treino.ex.length) { erro(ondeT, "sem exercícios"); continue; }

      treino.ex.forEach((e, i) => {
        const onde = ondeT + "[" + i + "] " + (e.n || "?");
        checados++;

        if (!e.n) erro(onde, "sem nome");
        if (typeof e.t !== "string") erro(onde, "campo t ausente (use \"—\" para esconder)");
        if (typeof e.i !== "string") erro(onde, "campo i ausente (use \"—\" para esconder)");
        if (!Array.isArray(e.s) || !e.s.length) erro(onde, "sem séries");
        else {
          const series = expandirSeries(e.s);
          if (!series.length) erro(onde, "as séries não expandem em nada");
          if (series.length > 12) erro(onde, series.length + " séries — confira se não é erro de digitação em \"" + e.s.join('", "') + "\"");
          series.forEach((r, n) => { if (!r) erro(onde, "série " + (n + 1) + " ficou sem repetições"); });
        }
        if (!Array.isArray(e.alt) || !e.alt.length) {
          erro(onde, "sem substituições — bloco de S escrito errado vira undefined aqui");
          return;
        }

        // o app descarta a auto-referência; se sobrar zero, o botão some da tela
        const uteis = e.alt.filter(a => String(a).trim().toLowerCase() !== String(e.n).trim().toLowerCase());
        if (!uteis.length) erro(onde, "todas as substituições são o próprio exercício");

        // intervalo precisa render um tempo que o cronômetro aceite
        if (e.i !== "—") {
          const ds = duracoes(e.i);
          if (!ds.length) erro(onde, "intervalo \"" + e.i + "\" não vira tempo nenhum");
          ds.forEach(d => {
            if (!Number.isFinite(d.seg) || d.seg < 1 || d.seg > 600) {
              erro(onde, "intervalo \"" + e.i + "\" gera " + d.seg + "s, fora de 1–600");
            }
          });
        }

        // a checagem que motivou o arquivo
        if (p.semAbdomen) {
          const alvos = [["exercício", e.n]].concat(e.alt.map(a => ["substituição", a]));
          for (const [tipo, texto] of alvos) {
            for (const rx of PROIBIDOS) {
              if (rx.test(texto)) {
                erro(onde, "contraindicado nesta planilha (" + tipo + "): \"" + texto + "\" casa com " + rx);
              }
            }
          }
        }
      });
    }
  }

  // bloco de S que ninguém usa: sobra de edição, não é erro
  const usados = new Set();
  for (const p of Object.values(PLANOS)) {
    for (const t of Object.values(p.treinos || {})) {
      for (const e of t.ex || []) {
        for (const chave of Object.keys(S)) {
          if (S[chave] === e.alt) usados.add(chave);
        }
      }
    }
  }
  const orfaos = Object.keys(S).filter(k => !usados.has(k));
  if (orfaos.length) aviso("S", "blocos que nenhuma planilha usa: " + orfaos.join(", "));

  const restritas = Object.keys(PLANOS).filter(k => PLANOS[k].semAbdomen);
  if (!restritas.length) aviso("PLANOS", "nenhuma planilha marcada semAbdomen — confira se isso está certo");
  return { planos: Object.keys(PLANOS).length, restritas };
}

/* ------------------------------------------------------------------ */

let resumo;
try {
  const { S, PLANOS } = extrairDados();
  resumo = checar(S, PLANOS);
} catch (err) {
  console.error("não consegui ler os dados do index.html: " + err.message);
  process.exit(2);
}

console.log("Checagens do index.html");
console.log("  " + resumo.planos + " planilhas, " + checados + " exercícios");
console.log("  restritas (semAbdomen): " + (resumo.restritas.join(", ") || "nenhuma"));
console.log("");

if (avisos.length) {
  console.log("Avisos (" + avisos.length + "):");
  avisos.forEach(a => console.log("  ~ " + a));
  console.log("");
}

if (falhas.length) {
  console.error("FALHOU — " + falhas.length + " problema(s):");
  falhas.forEach(f => console.error("  x " + f));
  process.exit(1);
}

console.log("Tudo certo.");
