## Objetivo

Dar mais presença e elegância às faixas de título (a área onde aparecem "Contatos", "Sobre Nós", "Educação Infantil", etc.) que hoje ficam quase em branco. A solução precisa ser harmônica com o tema escola (azul + dourado) e aplicada de forma consistente em todas as páginas.

## Abordagem

Criar uma classe utilitária única — `.page-header` — em `src/styles.css` e aplicar essa classe em todas as seções de cabeçalho de página. Assim, mudanças futuras ficam centralizadas.

### Visual do fundo `.page-header`

Camadas sobrepostas, todas sutis para não competir com o título:

1. **Base**: gradiente muito suave do `--muted` para o `--background`, dando profundidade sem escurecer.
2. **Padrão decorativo**: grade fina dourada (pattern SVG inline em `background-image`) com baixíssima opacidade (~6%) — remete a papel pautado/caderno escolar de forma elegante.
3. **Brilhos radiais**: dois `radial-gradient` discretos nos cantos (um azul `--primary` no canto superior esquerdo, um dourado `--gold` no canto superior direito), bem difusos e com opacidade ~8%.
4. **Linhas finas douradas** no topo e na base da faixa (1px, opacidade ~30%) emoldurando a seção.
5. **Ornamento decorativo SVG** em marca d'água ao fundo (ex.: `BookOpen` ou pequeno emblema), posicionado à direita, opacidade ~5%, escondido em mobile.

O resultado: faixa clara, com textura sutil, brilhos suaves de cor e moldura dourada — coerente com o resto do site.

### Variante para páginas dos níveis de ensino

As páginas `educacao-infantil`, `fundamental-1`, `fundamental-2`, `integral` usam um hero escuro (`bg-hero`) em vez da faixa clara. Para essas, aplicar uma variante `.page-header--dark`:
- Mantém o gradiente escuro existente.
- Adiciona o mesmo padrão de grade dourada (opacidade um pouco maior, ~8%).
- Adiciona os brilhos radiais (mais visíveis no fundo escuro).
- Linhas douradas no topo/base.
- Ornamento em marca d'água à direita.

## Arquivos afetados

- **`src/styles.css`** — Adicionar `.page-header` e `.page-header--dark` com todas as camadas (gradiente, pattern SVG inline, radial gradients, bordas douradas, ornamento ::before/::after).
- **`src/routes/contato.tsx`** — Trocar `bg-muted/40` por `page-header` na seção do título.
- **`src/routes/sobre.tsx`** — Aplicar `page-header` na faixa do título "Sobre Nós".
- **`src/routes/index.tsx`** — Aplicar `page-header` em faixas de seção que hoje ficam em branco/muted (mantendo o hero principal como está).
- **`src/components/site/NivelLayout.tsx`** — Adicionar `page-header--dark` à seção hero, cobrindo automaticamente as 4 páginas de níveis de ensino.

## Detalhes técnicos

O pattern de grade é um SVG inline em `background-image: url("data:image/svg+xml;utf8,...")` com linhas dourados a cada 32px. Combinado via `background-blend-mode` ou simplesmente sobreposto com `::before` absoluto e `pointer-events: none` para não interferir em cliques. Todas as camadas decorativas usam `pointer-events: none` e `aria-hidden`.
