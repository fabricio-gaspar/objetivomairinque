# Painel Admin Completo — Colégio Objetivo Mairinque

Vou expandir o painel atual (que tem Dashboard, Configurações, Páginas e Mídia) para incluir todos os 17 itens da imagem, com editores amigáveis (formulários, não JSON cru) para cada seção do site.

## Estrutura final do menu lateral

```
Dashboard
Layout da Home      → ordem e visibilidade das seções da home
Hero Slides         → slides do banner principal (imagem, título, CTA)
Segmentos           → Infantil / Fund. I / Fund. II / Integral (cards + páginas)
Acessórios          → itens/recursos extras exibidos na home
Diferenciais        → cards de "por que escolher" com ícone + texto
Estatísticas        → números (alunos, anos, aprovações…)
Big Counter         → bloco grande de contador animado
História            → timeline / texto da trajetória
FAQs                → perguntas e respostas
Materiais           → lista de materiais/livros por segmento
Sobre               → conteúdo da página /sobre
Mensagens           → leads recebidos (do formulário de contato)
Configurações       → contatos, WhatsApp, e-mail, endereço, portal
Menu                → itens do menu do site (label, link, ordem, visível)
Rodapé              → colunas e links do rodapé
Usuários            → admins (convidar, remover)
```

## O que será criado/alterado

### 1. Banco de dados (novas tabelas)
- `hero_slides` (imagem, título, subtítulo, cta_label, cta_link, ordem, ativo)
- `segments` (slug, nome, descrição curta, imagem, idade, cor, ordem) — alimenta cards e páginas dos níveis
- `accessories` (título, descrição, ícone, ordem, ativo)
- `differentials` (ícone, título, texto, ordem)
- `stats` (label, valor, sufixo, ordem)
- `big_counter` (singleton: título, número, legenda, imagem de fundo)
- `history_events` (ano, título, descrição, ordem)
- `faqs` (pergunta, resposta, categoria, ordem)
- `materials` (segmento, título, descrição, arquivo/link, ordem)
- `home_layout` (singleton: ordem JSON das seções + flags de visibilidade)
- `menu_items` (label, link, ordem, visível, parent_id p/ dropdown)
- `footer_columns` + `footer_links` (colunas com título e links)
- `messages` (nome, email, telefone, assunto, mensagem, lido, criado_em) — captura do form de contato
- `site_settings` já existe → adicionar campos de redes sociais

Tabelas existentes mantidas: `site_settings`, `pages` (Sobre vira página), `media`, `user_roles`.

Todas com RLS: leitura pública nas tabelas de conteúdo; escrita só admin; `messages` insert público + leitura/update só admin.

### 2. Editores no painel (1 rota por item do menu)
Cada seção terá:
- **Listagens** com drag-to-reorder, toggle ativo/inativo, editar e excluir
- **Formulários amigáveis** (campos nomeados, não JSON) com seleção de imagem da biblioteca de Mídia
- **Preview** quando fizer sentido (hero slides, cards)

Singletons (Big Counter, Home Layout, Sobre, Rodapé) usam formulário único.

### 3. Frontend público conectado ao banco
Componentes da home, Sobre e páginas de níveis passam a ler do banco via server functions + React Query, com fallback para os textos atuais até o admin popular.

### 4. Mensagens (formulário de contato)
A página `/contato` ganha um formulário simples (nome, e-mail, telefone, mensagem) que grava em `messages`. WhatsApp continua como botão paralelo. Admin vê a caixa de entrada em "Mensagens" com badge de não lidos.

### 5. Usuários
Tela para listar admins, conceder/revogar papel admin por e-mail (busca em `auth.users` via server function).

### 6. Seeds iniciais
Migration popula: 4 segmentos, 6 diferenciais, 4 estatísticas, 8 FAQs, eventos de história, 1 big counter, layout padrão da home, menu/rodapé atuais — para o site não ficar vazio no primeiro deploy.

## Detalhes técnicos
- Novas rotas em `src/routes/_authenticated/admin.{secao}.tsx`
- Server functions em `src/lib/{secao}.functions.ts` com `requireSupabaseAuth` + checagem de role admin para escrita
- Drag-and-drop com `@dnd-kit/sortable` (a instalar)
- Seleção de ícones com `lucide-react` (lista pré-definida no UI)
- Picker de imagem reutilizável que abre a biblioteca de Mídia
- Hooks `useHomeData`, `useFaqs`, etc. com React Query para o site público

## Escopo / tempo
É um trabalho grande: ~14 tabelas novas, ~15 telas de admin novas, refatoração da home/sobre/níveis para ler do banco, formulário de contato com persistência e gestão de usuários admin. Vou entregar em uma única implementação completa após sua aprovação.

## Pergunta antes de implementar
**Confirma que quer TUDO de uma vez?** Se preferir, posso priorizar em 2 fases:
- **Fase 1 (essencial visual):** Hero Slides, Segmentos, Diferenciais, Estatísticas, FAQs, Sobre, Menu, Rodapé, Configurações, Mídia, Dashboard
- **Fase 2 (extras):** Layout da Home (reordenação), Acessórios, Big Counter, História, Materiais, Mensagens, Usuários

Responda **"tudo"** para implementar os 17 itens, ou **"fase 1"** para começar pelo essencial.
