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

> **Ao editar essas três planilhas, use os blocos seguros.** Trocar por um
> bloco genérico não quebra nada e não aparece na tela — só volta a sugerir
> exercício contraindicado dentro do painel de substituições.

## O que dá para fazer

- **Marcar série feita** — toque na série e ela fica preenchida. Fica salvo
  até o fim do dia, então trocar de treino, fechar o app ou recarregar não
  perde nada. "Limpar este treino", no rodapé, zera só o treino aberto.
- **Anotar a carga** — campo ao lado de cada série. Acima dos exercícios
  aparece a última vez que você registrou aquele movimento:
  `Última vez: 82,5 kg · 19/09`. É o que responde se a progressão de carga
  que as planilhas pedem está acontecendo.
- **Cronômetro de intervalo** — toque na ficha do intervalo e a contagem
  aparece numa barra no rodapé, que fica visível enquanto você rola a tela.
  Tem `+30s` e botão de parar. Ao zerar, mostra "Pode ir", apita e some
  sozinha depois de 10 s.
- **Máquina ocupada** — abre substituições que mantêm o mesmo estímulo do
  exercício, para quando o aparelho estiver em uso. Cada substituição tem os
  próprios atalhos de Instagram e YouTube.
- **Instagram / YouTube** — busca a execução daquele exercício.
- **Botão de som** — no topo, desliga o apito do cronômetro. A escolha fica
  guardada.

### Sobre o cronômetro

Em intervalo com faixa (`2 a 3 min`) ele conta o **menor** valor — o aviso
marca quando você já pode voltar, não quando tem que voltar. Exercício com
dois intervalos (`30 s / 90 s`) ganha uma ficha para cada.

A contagem usa o relógio do sistema em vez de ir descontando, então continua
certa se o iPhone congelar o timer com a tela apagada.

> **O apito não toca com o iPhone no silencioso.** O Safari respeita a chave
> lateral de mudo, e não há como contornar isso pela página. A vibração
> também não funciona: o iOS não suporta a API. Na prática, conte com a barra
> na tela — e, se treinar no mudo, deixe o app visível.

### Onde o progresso fica guardado

Duas chaves no `localStorage`, só no aparelho — nada vai para servidor nenhum.

| Chave | O que guarda |
|---|---|
| `treinos-sessao` | o dia de hoje, o que foi marcado e as cargas digitadas |
| `treinos-historico` | as últimas 8 sessões de cada exercício |

Quando o app abre e o dia virou, as cargas da sessão passam para o histórico
e o dia recomeça limpo. O histórico é indexado pelo **nome do exercício**, não
pela planilha: a carga do supino é a mesma esteja ele em que planilha estiver.

> **Duas ressalvas.** O app não tem noção de usuário: se o Mizael e a Carol
> abrirem no mesmo aparelho e navegador, as cargas se misturam. Em celulares
> separados não há problema. E o Safari pode limpar dados de sites que ficam
> dias sem abrir — adicionar à tela de início reduz o risco, mas ainda não
> existe exportação de backup.

### Os links de busca

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
| `s` | lista de séries; **cada item vira um botão** de marcar |
| `alt` | substituições: um bloco de `S` ou uma lista escrita ali mesmo |

O cardio entra como um exercício comum, com a duração no lugar das séries:

```js
{n:"Caminhada inclinada na esteira", t:"Ritmo em que ainda dá para conversar",
 i:"—", s:["20 a 25 min"], alt:S.caminhada}
```

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
