# Treinos

Aplicativo de bolso para acompanhar as planilhas de treino na academia.

**Abrir:** https://mizaeldouglasdemello.github.io/treino-polach/

Uma página só, sem back-end e sem build. Ao abrir, ele já mostra o treino
do dia; se hoje for descanso, avisa e deixa você escolher outro.

---

## No celular

Vale adicionar à tela de início — assim abre em tela cheia, sem a barra do
Safari:

**Safari → botão de compartilhar → Adicionar à Tela de Início.**

O app segue o tema claro ou escuro do aparelho. O botão de sol/lua no topo
troca manualmente, e a escolha fica guardada.

> Na Navegação Privada do Safari a preferência de tema não persiste, porque
> o `localStorage` fica bloqueado. O app continua funcionando normalmente,
> só volta a seguir o tema do sistema.

---

## As planilhas

| Planilha | Frequência | Divisão |
|---|---|---|
| Hipertrofia Avançada | 5x por semana | A–E, alto volume, ênfase em peito e ombros |
| Hipertrofia Intermediária | 6x por semana | ABC repetido duas vezes |
| Adaptação Iniciante | 4x por semana | AB, 3x 10-15 em tudo |
| Força e Hipertrofia | 4x por semana | Dias 1–4, baixo volume e cargas altas |

## O que dá para fazer

- **Marcar série feita** — toque na série e ela fica preenchida. As marcações
  são só da sessão: somem ao trocar de treino ou recarregar.
- **Máquina ocupada** — abre substituições que mantêm o mesmo estímulo do
  exercício, para quando o aparelho estiver em uso.
- **Instagram / YouTube** — busca a execução daquele exercício.

---

## Estrutura

```
index.html                     o app inteiro: dados, estilo e lógica
vendor/
  bootstrap.min.css            Bootstrap 5.3.3
  bootstrap.bundle.min.js      Bootstrap 5.3.3
  icons/*.svg                  ícones de origem (Bootstrap Icons 1.11.3)
```

Nada vem de CDN — na academia o sinal cai, e o app precisa abrir mesmo
assim. Os ícones não usam a fonte do Bootstrap Icons: eram 176 KB de woff2
para 10 ícones, então os SVGs de `vendor/icons/` foram embutidos no HTML
(~6 KB) no objeto `ICONES`.

---

## Editando os treinos

Tudo fica em dois objetos no `<script>` do `index.html`.

### `S` — substituições reaproveitáveis

43 blocos, um por padrão de movimento. Servem para não repetir a mesma lista
em várias planilhas:

```js
supReto:["Supino reto com barra","Supino reto na máquina","Supino reto no smith"],
```

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
| `s` | lista de séries; **cada item vira um botão** de marcar |
| `alt` | substituições: um bloco de `S` ou uma lista escrita ali mesmo |

Para uma planilha nova, basta acrescentar uma chave em `PLANOS` — a home e a
navegação se montam sozinhas a partir dela.

---

## Rodando local

Abrir o `index.html` direto no navegador funciona. Para ficar igual ao
publicado (com `localStorage` ativo), sirva por HTTP:

```bash
python -m http.server 8765
```

Depois acesse `http://localhost:8765`.

## Publicação

GitHub Pages, a partir da branch `main`. Todo push para `main` republica o
app.

## Créditos

[Bootstrap](https://getbootstrap.com) e
[Bootstrap Icons](https://icons.getbootstrap.com), ambos sob licença MIT.
