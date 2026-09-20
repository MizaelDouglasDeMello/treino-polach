# Treinos

Aplicativo de bolso para acompanhar as planilhas de treino na academia.

**Abrir:** https://mizaeldouglasdemello.github.io/treino-polach/

Um arquivo só, sem back-end e sem build. Ao escolher uma planilha ele já abre
o treino do dia; se hoje for descanso, avisa e deixa você escolher outro.

```
Planilhas  ──▶  Treino A–E  ──▶  Exercício
    │      ◀──             ◀──
    └──▶  Calendário
```

Funciona como app de hábito: você conclui os exercícios, o treino fecha
sozinho quando todos estão feitos, e o dia acende no calendário.

---

## No celular

Instale na tela de início — abre em tela cheia, com ícone próprio, e passa a
**funcionar sem internet**:

**Safari → botão de compartilhar → Adicionar à Tela de Início.**

Na primeira abertura com sinal, o app guarda tudo que precisa (a página, o
Bootstrap e os ícones). Depois disso abre no subsolo da academia, no modo
avião, com o Wi-Fi caindo — tanto faz. Quando houver sinal ele busca a versão
mais nova; sem sinal, usa a que está guardada.

O app segue o tema claro ou escuro do aparelho. O botão de sol/lua no topo
troca manualmente, e a escolha fica guardada.

> Na Navegação Privada do Safari a preferência de tema não persiste, porque
> o `localStorage` fica bloqueado. O app continua funcionando normalmente,
> só volta a seguir o tema do sistema.

---

## As planilhas

**Abertas** — servem para qualquer pessoa:

| Planilha | Frequência | Divisão |
|---|---|---|
| Hipertrofia Avançada | 5x por semana | A–E, alto volume, ênfase em peito e ombros |
| Hipertrofia Intermediária | 6x por semana | ABC repetido duas vezes |
| Adaptação Iniciante | 4x por semana | AB, 3x 10-15 em tudo |
| Força e Hipertrofia | 4x por semana | Dias 1–4, baixo volume e cargas altas |

**Personalizadas** — montadas a partir dos dados de cada um:

| Planilha | Frequência | Divisão |
|---|---|---|
| Mizael — Preservação Muscular | 5x por semana | A–E, superior/inferior com cardio de baixo impacto |
| Carol — Definição e Força | 5x por semana | A–E, máquinas e posições apoiadas |
| Em Dupla — Corpo Inteiro | 3x por semana | A–C em seg/qua/sex, revezando na máquina |
| Em Dupla — Divisão Completa | 5x por semana | A–E, mesma divisão das individuais |

### Restrições nas planilhas personalizadas

A planilha da Carol e as duas em dupla são montadas **sem força direta no
abdômen**, por causa de endometriose. Ficam de fora abdominal direto,
elevação pélvica, levantamento terra, stiff pesado, agachamento livre e
remada curvada — tudo que aumenta a pressão intra-abdominal. O glúteo é
trabalhado por extensão de quadril na máquina, coice na polia e abdutora.

Isso vale também para as **substituições**. Os blocos genéricos de `S` são
compartilhados entre planilhas e carregam variações com carga axial ou
tronco livre; se usados nessas três, o botão "Máquina ocupada" sugeriria
justamente o que precisa ser evitado. Por isso existem blocos paralelos com
sufixo `Seguro`/`Segura` (`flexorSeguro`, `remadaApoiadaSegura`,
`puxadaSegura`, `gluteoSeguro`…), usados só por elas.

Essas planilhas carregam `semAbdomen:true`, e é essa marca que as
[checagens](#checagens) usam para saber onde vale a restrição. Planilha nova
com a mesma necessidade só precisa da marca.

> **Ao editar essas três planilhas, use os blocos seguros.** Trocar por um
> bloco genérico não quebra nada e não aparece na tela — só volta a sugerir
> exercício contraindicado dentro do painel de substituições. As checagens
> existem justamente para esse erro não passar calado.

## As telas

O botão **Voltar**, no topo, sempre desce um nível: do exercício para o treino,
do treino para as planilhas. O **gesto de voltar do iOS** faz o mesmo — as duas
formas passam pelo mesmo caminho.

Voltando de um exercício, a lista reaparece na mesma altura em que estava —
você não perde o lugar no meio do treino.

### 1. Planilhas

A tela inicial. Cada planilha mostra nome, resumo, frequência e quais treinos
tem.

No topo fica o **seletor de perfil** — Mizael ou Carol. Logo abaixo, um cartão
mostra a **sequência de dias** e quantos treinos foram feitos no mês. Tocar nele
abre o calendário.

No fim, **Limpar tudo de hoje** zera as marcações e cargas do dia em todas as
planilhas de uma vez — útil quando você começou o treino errado ou quer
recomeçar. Ele só aparece quando há algo para limpar, pede confirmação, e **não
toca no histórico nem nos ajustes**. Depois vêm os botões de [backup](#backup).

### 2. Treino

As abas no topo são os dias (A–E, ou 1–4). O app já abre no treino de hoje, ou
avisa que hoje é descanso.

Cada exercício aparece em uma linha com nome, séries, intervalo e quanto já foi
feito — o treino inteiro cabe numa tela, sem rolagem. Toque para abrir.

No rodapé, **Limpar este treino** zera as marcações e cargas só do treino
aberto.

### 3. Exercício

É onde fica tudo que você usa enquanto treina:

- **Marcar série feita** — toque na série e ela fica preenchida. Fica salvo
  até o fim do dia, então trocar de treino, fechar o app ou recarregar não
  perde nada. Para zerar, "Limpar este treino" no rodapé da lista, ou
  "Limpar tudo de hoje" na tela inicial.
- **Anotar a carga** — um campo por série. `4x 6-10` vira quatro linhas, uma
  para cada série, porque é assim que dá para registrar progressão dentro do
  próprio exercício.
- **Ajustar séries e descanso** — muda quantas séries, quantas repetições e
  quantos segundos de descanso, sem mexer no código. Fica valendo só naquele
  exercício daquela planilha, e um selo *ajustado* avisa que ele não está mais
  igual à prescrição. "Voltar ao original" desfaz.
- **Progressão de carga** — o histórico daquele movimento, com barra por
  sessão e um aviso comparando com a vez anterior: *subiu 5 kg*, *manteve a
  carga*, *caiu 2,5 kg*. É o que responde se a progressão que as planilhas
  pedem está acontecendo.
- **Cronômetro de intervalo** — toque na ficha do intervalo e a contagem
  aparece numa barra no rodapé, que fica visível enquanto você rola a tela.
  Tem `+30s` e botão de parar. Ao zerar, mostra "Pode ir", apita e some
  sozinha depois de 10 s. **A tela não apaga durante o descanso.**
- **Máquina ocupada** — abre substituições que mantêm o mesmo estímulo do
  exercício, para quando o aparelho estiver em uso. Cada substituição tem os
  próprios atalhos de Instagram e YouTube.
- **Instagram / YouTube** — busca a execução daquele exercício.
- **Concluir exercício** — o check verde. Marca todas as séries que faltavam
  e pinta o exercício de verde na lista. Tocar de novo desfaz.
- **Anterior / Próximo** — anda pelo treino sem voltar para a lista.

### 4. Calendário

Chega pelo cartão no topo da tela inicial. Reúne o
[calendário](#calendário-e-sequência) e o
[peso corporal](#peso-corporal).

No topo de todas as telas, o **botão de som** desliga o apito do cronômetro e o
**de tema** alterna claro e escuro. As duas escolhas ficam guardadas.

## Calendário e sequência

Concluir **todos** os exercícios de um treino marca o dia no calendário. Não há
botão de "concluir treino": o treino fecha sozinho quando o último exercício é
concluído, e reabre se você desfizer algum.

A tela do calendário mostra três números — **dias seguidos**, **treinos no mês**
e **total** — e a grade do mês, com os dias treinados preenchidos. Tocar num dia
marcado mostra quais treinos foram feitos nele. As setas andam pelos meses.

A sequência conta os dias seguidos até hoje. Se você ainda não treinou hoje ela
conta a partir de ontem, para não zerar no meio do dia só porque você ainda não
foi à academia.

## Peso corporal

No fim da tela do calendário. Anote o peso do dia e o gráfico monta a linha ao
longo do tempo, com o peso atual em destaque e a variação **em 30 dias** e
**desde a primeira medida**.

O gráfico é SVG desenhado pelo próprio app — biblioteca de gráfico custaria mais
que o app inteiro e quebraria o funcionamento sem sinal. O eixo do tempo respeita
o intervalo real entre as pesagens, então uma semana sem pesar aparece como um
vão, não como um ponto a mais.

Uma medida por dia, a última vence. Aceita vírgula ou ponto, e recusa valor fora
de 30 a 300 kg. Com menos de duas medidas não há linha, só um convite a anotar.

> As setas de variação são **neutras de propósito**, sem verde nem vermelho.
> Perder peso é bom para quem está em déficit e ruim para quem está em
> recomposição, e o app não sabe qual é o caso de quem está olhando.

O peso é por perfil, então a linha do Mizael e a da Carol não se misturam.

## Sobre o cronômetro

Em intervalo com faixa (`2 a 3 min`) ele conta o **menor** valor — o aviso
marca quando você já pode voltar, não quando tem que voltar. Exercício com
dois intervalos (`30 s / 90 s`) ganha uma ficha para cada.

A contagem usa o relógio do sistema em vez de ir descontando, então continua
certa se o iPhone congelar o timer com a tela apagada.

A tela fica acesa enquanto a contagem roda (`Wake Lock`, iOS 16.4+) e a trava
é solta assim que ela termina — segurar o treino inteiro gastaria bateria à
toa. Onde o navegador não concede a trava, o resto continua funcionando igual.

> **O apito não toca com o iPhone no silencioso.** O Safari respeita a chave
> lateral de mudo, e não há como contornar isso pela página. A vibração
> também não funciona: o iOS não suporta a API. Na prática, conte com a barra
> na tela — e, se treinar no mudo, deixe o app visível.

## Perfis

O seletor no topo da tela inicial troca entre **Mizael** e **Carol**. Cada um
tem seu próprio histórico de carga, peso, calendário, ajustes e progresso do
dia — o app inteiro passa a responder pela pessoa selecionada.

O que **não** é por perfil: tema e som. São preferências do aparelho, não da
pessoa.

O perfil ativo aparece no rodapé de todas as telas, para não acontecer de
alguém anotar carga no perfil errado sem perceber.

**Backup** carrega o perfil de origem, e o arquivo sai como
`treinos-backup-mizael-2026-09-20.json`. Se você importar um backup de um perfil
estando no outro, o app avisa e pergunta antes — aceitando, ele troca para o
perfil dono do arquivo e importa lá, em vez de misturar.

> Os perfis são a lista `PERFIS` no `index.html`. Para acrescentar ou renomear,
> é uma linha. Dados gravados antes de os perfis existirem foram movidos para o
> primeiro da lista, uma única vez.

## Onde o progresso fica guardado

Duas chaves no `localStorage`, só no aparelho — nada vai para servidor nenhum.

| Chave | O que guarda |
|---|---|
| `treinos-sessao` | o dia de hoje, o que foi marcado e as cargas digitadas |
| `treinos-historico` | as últimas 8 sessões de cada exercício |
| `treinos-ajustes` | séries, repetições e descanso alterados por você |
| `treinos-diario` | os treinos concluídos em cada data |
| `treinos-peso` | o peso corporal medido em cada data |

`treinos-diario` é o que alimenta o calendário e a sequência. Diferente da
sessão, ele nunca expira — "Limpar tudo de hoje" só apaga o dia de hoje.

`treinos-ajustes` é indexado por `plano\|treino\|exercício` e **não expira com o
dia**: um ajuste vale até você desfazer. Ele altera só a prescrição na tela;
os dados da planilha continuam intactos no `index.html`.

Quando o app abre e o dia virou, as cargas da sessão passam para o histórico
e o dia recomeça limpo. O histórico é indexado pelo **nome do exercício**, não
pela planilha: a carga do supino é a mesma esteja ele em que planilha estiver.

Cada chave é gravada **por perfil** (`treinos-peso:mizael`,
`treinos-peso:carol`…), então os dois podem usar o mesmo aparelho sem misturar
carga, peso nem calendário. Veja [Perfis](#perfis).

## Backup

No fim da tela inicial, **Exportar** salva um `.json` com o histórico e o dia
em andamento — no iPhone ele vai para o app Arquivos ou para onde você mandar
pelo botão de compartilhar. **Importar** lê esse arquivo de volta.

A importação **junta, não substitui**: restaurar um backup antigo não apaga o
que foi registrado depois. Sessão do mesmo exercício na mesma data conta como
a mesma, então importar duas vezes não duplica nada. Arquivo que não for um
backup deste app é recusado com aviso.

Vale exportar de vez em quando: o histórico existe só no aparelho, e o Safari
pode limpar dados de sites que ficam dias sem abrir. Instalar na tela de início
reduz esse risco, mas não elimina.

## Os links de busca

O YouTube aceita busca por palavra na URL, então o link leva direto ao termo.

O Instagram não. A rota `/explore/search/keyword/?q=` responde **302 para a
tela de login** e o app do celular não a reconhece — abre a busca vazia, sem
o termo. A única rota que o app entende é a de hashtag, então `tagIG()` monta
uma tag a partir do nome: tira acentos e palavras como "de" e "com", e junta
as duas primeiras palavras restantes.

```
Supino reto            -> #supinoreto
Elevação lateral       -> #elevacaolateral
Remada baixa aberta    -> #remadabaixa
```

Funciona bem para exercício de nome comum. Para nome raro, a tag pode ter
pouco conteúdo — nesses casos o YouTube é o atalho mais confiável.

---

## Estrutura

```
index.html                     o app inteiro: dados, estilo e lógica
manifest.webmanifest           nome, cores e ícones do app instalado
sw.js                          service worker: é o que faz abrir sem sinal
icons/                         ícones do app (PNG, gerados)
vendor/
  bootstrap.min.css            Bootstrap 5.3.3
  bootstrap.bundle.min.js      Bootstrap 5.3.3
  icons/*.svg                  ícones de origem (Bootstrap Icons 1.11.3)
```

O `sw.js` busca o `index.html` **na rede primeiro**, caindo para o cache quando
não há sinal — assim um push novo aparece na abertura seguinte, em vez de ficar
preso numa versão antiga. Os arquivos do `vendor/` e `icons/`, que praticamente
não mudam, vêm do cache primeiro.

> Ao trocar arquivos do shell, suba o `VERSAO` no topo do `sw.js`. É o que
> descarta o cache antigo nos aparelhos já instalados.

Nada vem de CDN — na academia o sinal cai, e o app precisa abrir mesmo
assim. Os ícones não usam a fonte do Bootstrap Icons: eram 176 KB de woff2
para 10 ícones, então os SVGs de `vendor/icons/` foram embutidos no HTML
(~6 KB) no objeto `ICONES`.

---

## Editando os treinos

Tudo fica em dois objetos no `<script>` do `index.html`.

### `S` — substituições reaproveitáveis

Um bloco por padrão de movimento, para não repetir a mesma lista em várias
planilhas:

```js
supReto:["Supino reto com barra","Supino reto na máquina","Supino reto no smith"],
```

Os blocos com sufixo `Seguro`/`Segura` são as versões sem carga axial nem
tronco livre, descritas em [Restrições](#restrições-nas-planilhas-personalizadas).

Se um bloco contiver o próprio exercício que está sendo substituído, o app
descarta essa linha ao montar a tela — não precisa caçar repetição na mão.

### `PLANOS` — as planilhas

```js
forca:{
  nome:"Força e Hipertrofia",
  freq:"4x por semana",
  resumo:"Baixo volume e cargas altas, alternando superiores e inferiores",
  semana:{1:"1",2:"2",4:"3",5:"4"},
  treinos:{ ... }
}
```

`semana` liga o dia da semana ao treino. A chave é o número que o JavaScript
usa: **0 = domingo, 1 = segunda … 6 = sábado**. O exemplo acima marca treino
na segunda, terça, quinta e sexta. Dia que não aparece é descanso.

O valor é a letra (ou número) do treino dentro de `treinos`:

```js
"1":{dia:"SEG",ex:[ ... ]}
```

`dia` é só o rótulo que aparece na aba.

### Um exercício

```js
{n:"Levantamento terra",
 t:"Progressão de carga, coluna neutra do início ao fim",
 i:"2 a 3 min",
 s:["2x 6-8"],
 alt:S.terra}
```

| Campo | O que é |
|---|---|
| `n` | nome do exercício |
| `t` | técnica ou observação — use `"—"` para não mostrar nada |
| `i` | intervalo — use `"—"` para não mostrar nada |
| `s` | as séries — veja abaixo |
| `alt` | substituições: um bloco de `S` ou uma lista escrita ali mesmo |

#### O campo `s`

Cada série vira uma linha na tela, com botão de marcar e campo de carga. Há
duas formas de escrever, e o app expande a primeira:

```js
s:["4x 6-10"]                                        // 4 séries iguais
s:["1x 15-20","1x 10-15","1x 8-12","1x 6-10"]        // pirâmide, 4 séries
```

As duas dão quatro linhas. Antes, `"4x 6-10"` virava **uma** linha e um campo
de carga só — não dava para registrar a progressão dentro do exercício. A
expansão acontece na renderização, então vale para todas as planilhas sem
precisar reescrever os dados.

O cardio entra como um exercício comum, com a duração no lugar das séries:

```js
{n:"Caminhada inclinada na esteira", t:"Ritmo em que ainda dá para conversar",
 i:"—", s:["20 a 25 min"], alt:S.caminhada}
```

Para uma planilha nova, basta acrescentar uma chave em `PLANOS` — as três telas
se montam sozinhas a partir dela.

### Como as telas são montadas

Uma função por tela, cada uma reescrevendo `#conteudo`. Não há rotas nem
histórico do navegador: o estado vive em três variáveis.

| Função | Monta | Deixa `nivel` em |
|---|---|---|
| `home()` | lista de planilhas + backup | `"home"` |
| `abrirPlano(chave)` | abas dos dias, e chama `selecionar()` | `"treino"` |
| `selecionar(treino)` | lista de exercícios do treino | `"treino"` |
| `abrirExercicio(indice)` | a página do exercício | `"exercicio"` |
| `abrirCalendario()` | o calendário e os números | `"calendario"` |

- `nivel` diz em qual tela estamos.
- `planoAtual`, `treinoAtual` e `exAtual` dizem o quê está aberto. Os dois
  primeiros formam a chave do progresso (`plano|treino|exercício`).
- `voltandoPara` guarda a rolagem ao sair de um exercício, e `selecionar()` a
  consome para reposicionar a lista.

### Histórico e o gesto de voltar

Cada tela vira uma entrada no histórico, e é isso que faz o gesto do iOS subir
um nível em vez de sair do app.

- `historiar(estado, modo)` empilha o estado. Com `modo:"replace"` ele
  **substitui** em vez de empilhar — é o que usam trocar de dia e os botões
  Anterior/Próximo, que são movimento lateral e não merecem entrada própria.
  Resultado: voltar de qualquer exercício cai na lista, não no exercício
  anterior que você espiou.
- O botão Voltar chama `history.back()`. Assim ele e o gesto do iOS percorrem
  exatamente o mesmo caminho, e não existem dois jeitos de voltar que possam
  divergir.
- O `popstate` remonta a tela a partir do estado, com a flag `restaurando`
  ligada para as funções não empilharem de novo o que acabaram de restaurar.
- `history.scrollRestoration` fica em `"manual"`. A restauração automática do
  navegador não serve aqui: quando ela roda, o `popstate` ainda não remontou a
  lista, então não há o que rolar. `voltandoPara` é a única fonte.

> A URL nunca muda — o estado vai em `history.state`. Recarregar a página cai
> na tela inicial, e não existe link para um treino ou exercício específico.

---

## Rodando local

Abrir o `index.html` direto no navegador funciona. Para ficar igual ao
publicado (com `localStorage` ativo), sirva por HTTP:

```bash
python -m http.server 8765
```

Depois acesse `http://localhost:8765`.

## Checagens

```bash
node checagens.js
```

Sem dependência nenhuma. Lê os dados direto do `index.html` e falha com código
1 se algo estiver errado. Rodam sozinhas a cada push, pelo GitHub Actions.

O que elas conferem:

| Checagem | Por quê |
|---|---|
| Exercício ou substituição contraindicado em planilha `semAbdomen` | O erro que motivou o arquivo — invisível na tela |
| Substituições vazias ou só com o próprio exercício | `alt:S.nomeErrado` vira `undefined`; o botão some |
| Intervalo que o cronômetro não consegue ler | `i:"depende"` deixaria o exercício sem timer |
| Séries que não expandem, ou mais de 12 num exercício | Pega `"40x 10"` e afins |
| `semana` apontando para treino que não existe | Dia da semana abriria a planilha errada |
| Campos obrigatórios, séries vazias, nome de planilha repetido | Estrutura |
| Bloco de `S` que ninguém usa | Aviso, não falha — é sobra de edição |

Depois de mexer nas planilhas, rode antes de dar push. Se falhar, a mensagem
diz a planilha, o treino, o exercício e o motivo.

## Publicação

GitHub Pages, a partir da branch `main`. Todo push para `main` republica o
app.

## Créditos

[Bootstrap](https://getbootstrap.com) e
[Bootstrap Icons](https://icons.getbootstrap.com), ambos sob licença MIT.
