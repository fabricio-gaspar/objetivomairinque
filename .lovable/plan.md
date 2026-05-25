## Objetivo
Adicionar um fundo elegante e harmonioso (tema escola) atrás de todos os títulos, bandeirinha nos idiomas em "Sobre Nós" e detalhes sutis no layout.

## 1. Fundo elegante para títulos (global)

Atualizar o componente `src/components/site/SectionHeading.tsx` para incluir, atrás do título, um ornamento sutil tema escola:

- Linha dourada horizontal fina à esquerda e direita do eyebrow (separadores tipo "régua acadêmica").
- Ícone decorativo discreto (ex.: `BookOpen` ou pequeno losango/medalha em dourado) sobreposto ao fundo do título, com opacidade baixa, alinhado ao centro.
- Texto do título com um leve gradiente do `--primary` para um tom mais claro, mantendo legibilidade.
- Pequeno traço (underline) dourado animado abaixo do título centrado.

Como o `SectionHeading` é usado em todas as páginas (Home, Sobre, Contato, níveis de ensino), uma única edição aplica o efeito em todos os títulos automaticamente.

Para títulos que NÃO usam `SectionHeading` (h2 internos como "Proposta Pedagógica", "Atividade Extracurricular", "Sobre Nós" no corpo), criar uma classe utilitária `.section-title` em `src/styles.css` com:
- Pequeno traço dourado vertical à esquerda (border-left de 3px dourado).
- Padding-left adequado.
- Aplicar essa classe nos `<h2>` internos das páginas (sobre, contato, níveis).

## 2. Bandeirinha nos idiomas (página Sobre)

Na lista de atividades extracurriculares de `src/routes/sobre.tsx`, transformar os itens em objetos com label + emoji opcional:

- "Espanhol" → 🇪🇸
- Adicionar campos para outros itens? Só "Espanhol" é idioma na lista atual. Manter apenas a bandeira da Espanha ao lado de "Espanhol".

Renderizar a bandeira (emoji) à esquerda do nome em um pequeno chip arredondado dentro do card.

## 3. Detalhes elegantes no layout (página Sobre)

- Card da imagem: adicionar uma moldura sutil (ring dourado de 1px com offset) e um pequeno selo decorativo "22 anos" no canto.
- Seção "Proposta Pedagógica": fundo `bg-muted/40` ganha um ornamento sutil (linha dourada horizontal acima do título e um ícone `BookOpen` discreto).
- Cards de atividades extracurriculares: ganham hover com elevação suave, ícone dourado à esquerda e transição.
- Espaçamento vertical entre seções harmonizado.

## Arquivos afetados
- `src/components/site/SectionHeading.tsx` — ornamento elegante no eyebrow/título.
- `src/styles.css` — classe utilitária `.section-title` com traço dourado.
- `src/routes/sobre.tsx` — bandeirinha em Espanhol, classe `.section-title` nos h2, polish nos cards e na imagem.
