### Hero adapta ao tamanho da imagem

**Arquivo:** `src/routes/index.tsx`

**Mudanças no slideshow:**
1. Remover a proporção fixa (`aspect-[21/9] max-h-[640px] min-h-[320px]`) do container.
2. Usar a primeira imagem como referência de altura: renderizá-la em fluxo normal (não absolute) com `w-full h-auto` para definir o tamanho real do container.
3. As demais imagens ficam em `absolute inset-0` com `object-cover` para preencher exatamente esse mesmo espaço durante a transição entre slides.
4. Assim, o container azul tem exatamente a altura da imagem em sua proporção original — sem cortes e sem faixas azuis sobrando.

**Resultado:** O hero se adapta automaticamente à proporção real das imagens do slideshow, sem cortar nada e sem deixar espaços azuis.