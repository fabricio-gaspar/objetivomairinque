## Reformulação — Colégio Objetivo Mairinque

Site institucional + foco em matrículas, estética moderna/premium, CTA principal via WhatsApp.

### 1. Arquitetura de rotas (separar para SEO e compartilhamento)

```
src/routes/
  __root.tsx       → header + footer compartilhados
  index.tsx        → Home (hero, destaques, prova social, CTA)
  sobre.tsx        → /sobre — história, missão, autoridade
  educacao-infantil.tsx → /educacao-infantil
  fundamental-1.tsx     → /fundamental-1
  fundamental-2.tsx     → /fundamental-2
  contato.tsx      → /contato (mapa, formulário, WhatsApp)
```

Cada rota terá `head()` próprio (title, description, og:title, og:description).

### 2. Estrutura da Home (princípios do prompt, adaptados)

1. **Top bar** — telefone, e-mail, botão WhatsApp fixo
2. **Header** — logo + menu (Home, Sobre, Níveis ▾, Galeria, Contato) + CTA "Agendar Visita"
3. **Hero** — headline forte ("Onde seu filho aprende a pensar, criar e liderar"), subheadline, 2 CTAs (WhatsApp + Conhecer), imagem editorial
4. **Faixa de autoridade** — selo "+20 anos", contadores (alunos, professores, salas, aprovações)
5. **Níveis de ensino** — 3 cards (Infantil, Fund I, Fund II) com link para rota própria
6. **Sobre / Diferenciais** — 4–6 pilares (proposta pedagógica, infraestrutura, corpo docente, acompanhamento individual, atividades extras, segurança)
7. **Prova social** — depoimentos de pais/alunos (placeholders editáveis)
8. **Quebra de objeções** — bloco "Por que escolher a Objetivo?" com 3 dúvidas comuns respondidas
9. **CTA forte** — "Agende uma visita guiada" → WhatsApp
10. **FAQ** — accordion com 6–8 perguntas (mensalidade, transporte, material, integral, etc.)
11. **Footer** — contatos, horários, mapa, redes sociais
12. **Botão flutuante WhatsApp** — visível em todas as páginas

### 3. Direção visual (Moderno e Premium)

- **Tipografia**: Outfit (display) + Figtree (corpo) — via `@fontsource`
- **Paleta**: 
  - Primary: azul institucional profundo `oklch(0.32 0.16 260)`
  - Accent: dourado quente `oklch(0.78 0.13 75)` (sofisticação, não infantil)
  - Background: branco quebrado `oklch(0.99 0.005 90)`
  - Foreground neutro escuro
- **Layout**: muito espaço em branco, grids assimétricas, fotos em formato editorial (aspect ratio alongado), cantos suaves (radius 1rem)
- **Microinterações**: fade/slide on scroll discretos, hover suave em cards, contador animado nos números
- **Componentes shadcn**: Button (variantes hero/whatsapp), Card, Accordion (FAQ), Sheet (menu mobile), Carousel (depoimentos)

### 4. Copywriting

- 2ª pessoa ("Seu filho...", "Você encontra...")
- Tom: confiança + autoridade pedagógica, sem promessas milagrosas
- Headlines reescritas (exemplos):
  - Hero: "Educação que forma mentes preparadas para o futuro"
  - Sobre: "Mais de 20 anos formando gerações em Mairinque"
  - CTA: "Agende uma visita e conheça nossa proposta de perto"
- Marcarei `[SUBSTITUIR: …]` em depoimentos, números reais e diferenciais específicos para você completar.

### 5. CTA WhatsApp

- Botão flutuante (canto inferior direito) presente em todas as páginas
- Link `https://wa.me/5511997898763?text=...` com mensagem pré-preenchida contextual por página
- CTAs primários no hero, fim de cada seção de nível e bloco de conversão apontam para WhatsApp

### 6. Detalhes técnicos

- Instalar `@fontsource/outfit` e `@fontsource/figtree` via `bun add`
- Atualizar `src/styles.css` com nova paleta e fontes
- Header e footer extraídos para `src/components/site/Header.tsx` e `Footer.tsx` (usados via `__root.tsx`)
- Botão WhatsApp em `src/components/site/WhatsAppFloat.tsx`
- Corrigir o aviso de hydration (espaço extra em texto JSX)
- `head()` por rota com title/description/og únicos; og:image apenas em rotas-folha

### O que você precisa me enviar (depois)
- Logo oficial (se tiver)
- Depoimentos reais (3–4)
- Números reais (alunos, anos, aprovações)
- Diferenciais específicos da escola
- Texto institucional/missão se já tiver

Posso seguir com placeholders editáveis enquanto você prepara esses materiais.
