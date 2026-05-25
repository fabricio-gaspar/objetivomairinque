### Ajuste do Hero - Preencher espaço azul

**Objetivo:** Fazer com que as imagens do slideshow do hero preencham todo o container azul, eliminando as faixas laterais/topo que aparecem atualmente.

**Arquivo:** `src/routes/index.tsx`

**Alteração:**
Na linha onde as imagens do slideshow são renderizadas, trocar a classe CSS de `object-contain` para `object-cover`.

**Resultado:** As imagens cobrirão 100% da área azul, cortando automaticamente as bordas quando a proporção da imagem for diferente da proporção do container (21:9).