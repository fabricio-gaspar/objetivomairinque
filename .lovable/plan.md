## Ajustes nos cards de Níveis de Ensino (Home)

### 1. Título acima de cada card
Adicionar um título em destaque **acima** de cada card (além do que já existe dentro do card), com o nome do nível:
- EDUCAÇÃO INFANTIL
- FUNDAMENTAL I
- FUNDAMENTAL II
- INTEGRAL

Estilo: fonte display, dourado (`var(--gold)`), centralizado, com pequeno traço decorativo — alinhado ao restante do site.

### 2. Adicionar o 4º nível: Integral
Incluir um novo card apontando para `/integral`, usando uma imagem existente (reutilizando `slide-4.jpg` ou similar — confirmar depois qual asset usar). Texto curto descritivo do período integral.

### 3. Transformar a grade em carrossel
Substituir o grid atual (`grid md:grid-cols-3`) por um carrossel usando o componente `Carousel` (`src/components/ui/carousel.tsx`, já disponível via Embla):
- **Mobile**: 1 card por vez
- **Tablet**: 2 cards
- **Desktop**: 3 cards visíveis, com o 4º acessível ao deslizar
- Setas de navegação (`CarouselPrevious` / `CarouselNext`) nas laterais
- Dots ou indicador opcional abaixo
- Auto-play suave (opcional, com plugin `embla-carousel-autoplay` se desejado — posso instalar)

### Arquivo afetado
- `src/routes/index.tsx` — adicionar item Integral ao array `niveis`, envolver em `<Carousel>` com `<CarouselContent>` / `<CarouselItem>`, e renderizar o título acima de cada card.

### Pergunta rápida
Deseja autoplay no carrossel? E qual imagem usar para o card "Integral" (posso gerar uma nova ou reaproveitar um asset existente)?
