## Mudanças

### 1. Menu deslocado para a direita (Header.tsx)
- Ajustar o layout do `<nav>` no header para empurrar os links mais à direita, usando `ml-auto` no nav e adicionando espaçamento antes do botão "Agendar visita".

### 2. Atualizar texto para "Matrículas abertas 2026" (index.tsx)
- Trocar `"Matrículas abertas 2024"` por `"Matrículas abertas 2026"` na seção CTA.
- Também atualizar a meta description que menciona "Matrículas abertas 2024".

### 3. Redesenhar seção "NOSSA REALIZAÇÃO" no estilo da imagem (index.tsx)
A imagem mostra: fundo azul sólido, título em dourado/bege, 4 cards brancos com:
- Label em cinza no topo à esquerda (GRADUAÇÃO, PROFESSORES, SALAS DE AULA, ALUNOS)
- Ícone azul no canto superior direito
- Número grande em cinza escuro embaixo

Mudanças:
- Adicionar números reais: GRADUAÇÃO 9572, PROFESSORES 20, SALAS DE AULA 15, ALUNOS 1624 (conforme imagem do site original).
- Adicionar ícones do lucide-react: `GraduationCap`, `Paintbrush`, `Landmark`, `Users`.
- Cards brancos com sombra, padding generoso, layout: label + ícone na mesma linha (justify-between), número grande abaixo.
- Manter título "NOSSA REALIZAÇÃO" em dourado e subtítulo.

### 4. Corrigir enquadramento do Hero (index.tsx)
- O slideshow usa `object-cover` que corta laterais. Para evitar corte, mudar para `object-contain` com fundo azul, OU manter `object-cover` mas ajustar `object-position` para `center` e aumentar a altura mínima para que menos seja cortado.
- Melhor abordagem: manter `object-cover object-center` mas reduzir a constrição vertical — usar `aspect-[16/9]` ou altura adaptativa em vez de `h-[60vh]` fixo, para que a imagem caiba melhor em telas largas sem cortar tanto das laterais.

## Arquivos afetados
- `src/components/site/Header.tsx`
- `src/routes/index.tsx`
