# Movie

Aplicação React para explorar filmes, buscar títulos, visualizar detalhes e gerenciar uma lista de favoritos, utilizando a API pública do The Movie Database (TMDB).

## Demonstração

Aplicação disponível em: [https://movie.luislab.xyz](https://movie.luislab.xyz)

## Funcionalidades Principais

- **Exploração de Filmes**: Visualização de filmes populares com scroll infinito
- **Busca de Filmes**: Pesquisa de filmes por título
- **Detalhes do Filme**: Visualização completa de informações, incluindo sinopse, gêneros, data de lançamento e avaliações
- **Gerenciamento de Favoritos**: Adição e remoção de filmes da lista de favoritos com persistência em localStorage
- **Ordenação de Favoritos**: Ordenação por título ou avaliação em ordem crescente ou decrescente
- **Internacionalização (i18n)**: Suporte para múltiplos idiomas (inglês e português) com detecção automática e troca de idioma
- **Tratamento de Erros**: Exibição de mensagens de erro com opção de retry
- **Estados de Loading**: Indicadores visuais durante carregamento de dados
- **Design Responsivo**: Interface adaptável para diferentes tamanhos de tela

## Estrutura de Páginas

A aplicação possui as seguintes rotas:

| Rota | Componente | Descrição |
|------|------------|-----------|
| `/` | `HomePage` | Exibe filmes populares com scroll infinito |
| `/movie/:id` | `MoviePage` | Exibe detalhes completos de um filme específico |
| `/search` | `SearchPage` | Exibe resultados de busca de filmes com scroll infinito |
| `/favorites` | `FavoritesPage` | Exibe lista de filmes favoritos com opções de ordenação |

## Configuração da API do TMDB

Para utilizar a aplicação, é necessário obter uma chave de API do TMDB:

1. Acesse [https://www.themoviedb.org/](https://www.themoviedb.org/)
2. Crie uma conta ou faça login
3. Acesse as configurações da conta
4. Navegue até a seção "API"
5. Solicite uma chave de API (tipo "Developer")
6. Copie a chave gerada

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```bash
VITE_TMDB_URL=https://api.themoviedb.org/3
VITE_TMDB_API_KEY=sua_chave_api_aqui
VITE_TMDB_IMAGE_URL=https://image.tmdb.org/t/p
```

**Exemplo de `.env.example`:**

```bash
VITE_TMDB_URL=https://api.themoviedb.org/3
VITE_TMDB_API_KEY=your_api_key_here
VITE_TMDB_IMAGE_URL=https://image.tmdb.org/t/p
```

## Instalação e Execução

### Pré-requisitos

- Node.js 20 ou superior
- npm ou yarn

### Instalação

```bash
npm install
```

### Execução em Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`

### Preview da Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## Tecnologias Utilizadas

### Core

- **React**: Biblioteca para construção de interfaces
- **TypeScript**: Superset do JavaScript com tipagem estática
- **Vite**: Build tool e dev server

### Roteamento

- **React Router**: Gerenciamento de rotas e navegação

### Gerenciamento de Estado e Dados

- **TanStack Query**: Gerenciamento de estado do servidor, cache e sincronização
- **Context API**: Gerenciamento de estado global para favoritos

### Estilização

- **Tailwind CSS**: Framework CSS utility-first
- **Lucide React**: Biblioteca de ícones

### Requisições HTTP

- **Axios**: Cliente HTTP para requisições à API

### Internacionalização

- **i18next**: Framework de internacionalização

### Testes

- **Jest**: Framework de testes
- **React Testing Library**: Utilitários para testes de componentes React

### Ferramentas de Desenvolvimento

- **ESLint**: Linter para JavaScript/TypeScript
- **TypeScript ESLint**: Regras ESLint para TypeScript

## Critérios de Avaliação

Este projeto demonstra os seguintes aspectos técnicos:

### Uso Correto de Hooks

- Custom hooks para consumo de API (`usePopularMovies`, `useMovieById`, `useMovieByQuery`, `useFavoriteMovies`)
- Hooks de UI (`useIntersectionObserver`, `useFavorites`, `useGlowEffect`)
- Uso adequado de hooks nativos do React (`useState`, `useEffect`, `useCallback`, `useLayoutEffect`, `useRef`)

### Gerenciamento de Estado Global

- Context API implementado para gerenciamento de favoritos (`FavoritesContext`)
- Persistência de estado em localStorage
- TanStack Query para gerenciamento de estado do servidor e cache

### Consumo e Manipulação de APIs REST

- Cliente Axios configurado com interceptors
- Integração com API do TMDB
- Tratamento de respostas paginadas
- Infinite queries para scroll infinito
- Queries com parâmetros dinâmicos

### Roteamento e Navegação

- React Router configurado com rotas aninhadas
- Layout compartilhado entre rotas
- Navegação programática
- Parâmetros de rota e query strings

### Tratamento de Erros e Loading States

- Componentes de erro reutilizáveis com opção de retry
- Componentes de loading com labels personalizáveis
- Estados de loading, error e success gerenciados pelo TanStack Query
- Mensagens de erro contextuais

### Organização e Estrutura de Código

- Separação clara de responsabilidades
- Estrutura de pastas organizada por feature
- Componentes reutilizáveis
- Hooks customizados para lógica de negócio
- Tipos TypeScript bem definidos
- Configurações centralizadas (axios, query-client)

### Responsividade

- Design mobile-first
- Grid responsivo com breakpoints
- Componentes adaptáveis a diferentes tamanhos de tela
- Navegação otimizada para mobile e desktop

## Testes

### Executar Testes em Modo Watch

```bash
npm test
```

### Executar Testes uma Vez (CI)

```bash
npm run test:ci
```

### Estrutura de Testes

Os testes estão organizados junto aos componentes e hooks, seguindo o padrão `*.test.tsx` ou `*.test.ts`. A configuração do Jest utiliza:

- Ambiente jsdom para simulação do DOM
- Setup automático com `@testing-library/jest-dom`
- Suporte a TypeScript e ES Modules
- Transformação com ts-jest

### Exemplos de Cobertura

- Testes de componentes (`Layout`, `Header`, `Error`, `Loading`, `MovieCard`, etc.)
- Testes de hooks customizados
- Testes de funcionalidades de favoritos
- Testes de ordenação

## Adicionais


### Acessibilidade (a11y)

A aplicação foi desenvolvida seguindo as diretrizes WCAG 2.1 nível AA, garantindo uma experiência acessível para todos os usuários.

#### Funcionalidades de Acessibilidade

- **Navegação por Teclado**: Suporte completo para navegação usando apenas o teclado
- **Skip Link**: Link de navegação rápida para pular para o conteúdo principal (visível ao focar com Tab)
- **ARIA Labels**: Todos os elementos interativos possuem labels descritivos para leitores de tela
- **Semantic HTML**: Uso de elementos semânticos (`<main>`, `<nav>`, `<section>`, etc.) para melhor estruturação
- **Hierarquia de Cabeçalhos**: Estrutura adequada de h1-h6 em todas as páginas
- **Anúncios de Estado**: Uso de `aria-live` para anunciar mudanças dinâmicas de conteúdo (loading, erros)
- **Atributo Lang Dinâmico**: O atributo `lang` do HTML é atualizado automaticamente conforme o idioma selecionado
- **Ícones Decorativos**: Todos os ícones decorativos possuem `aria-hidden="true"`
- **Foco Visível**: Indicadores de foco claros e visíveis para todos os elementos interativos
- **Contraste de Cores**: Cores seguem os requisitos de contraste WCAG AA (4.5:1 para texto, 3:1 para componentes)

#### Ferramentas de Acessibilidade

- **ESLint Plugin**: Configurado com `eslint-plugin-jsx-a11y` para validação automática de acessibilidade durante o desenvolvimento
- **Validação Contínua**: Regras de acessibilidade são verificadas automaticamente no processo de linting

#### Suporte a Leitores de Tela

A aplicação foi testada e otimizada para funcionar com leitores de tela populares:
- VoiceOver (macOS/iOS)

### Internacionalização (i18n)

A aplicação possui suporte completo para internacionalização usando **i18next** e **react-i18next**, permitindo que os usuários alternem entre diferentes idiomas.

#### Idiomas Suportados

- **Inglês (en)**: Idioma padrão
- **Português (pt)**: Suporte completo

#### Funcionalidades

- **Detecção Automática de Idioma**: O sistema detecta automaticamente o idioma preferido do navegador
- **Persistência de Preferência**: A preferência de idioma é salva no localStorage

## Deploy

A aplicação está configurada para deploy usando Docker e Nginx.

### Build com Docker

```bash
docker build \
  --build-arg VITE_TMDB_URL=https://api.themoviedb.org/3 \
  --build-arg VITE_TMDB_API_KEY=sua_chave_api \
  --build-arg VITE_TMDB_IMAGE_URL=https://image.tmdb.org/t/p \
  -t movie-app .
```

### Executar Container

```bash
docker run -p 80:80 movie-app
```

### Deploy em Produção

A aplicação está hospedada em: [https://movie.luislab.xyz](https://movie.luislab.xyz)

O deploy utiliza:
- Build multi-stage com Docker
- Nginx como servidor web
- Configuração de SPA (Single Page Application) com fallback para `index.html`
- Cache otimizado para assets estáticos
- Compressão gzip habilitada

## Estrutura do Projeto

```
movie/
├── dist/                 # Build de produção
├── public/               # Arquivos estáticos públicos
├── src/
│   ├── components/       # Componentes React reutilizáveis
│   │   ├── favorite/     # Componentes relacionados a favoritos
│   │   ├── language-switcher/ # Componente de troca de idioma
│   │   ├── layout/       # Componentes de layout (Header, Error, Loading)
│   │   ├── movie/        # Componentes relacionados a filmes
│   │   ├── rating/       # Componente de avaliação
│   │   └── search-input/ # Componente de busca
│   ├── contexts/         # Context API providers
│   │   └── favorites/    # Context de favoritos
│   ├── hooks/            # Custom hooks
│   │   ├── ui/           # Hooks de UI
│   │   └── *.ts          # Hooks de API
│   ├── lib/              # Configurações e utilitários
│   │   ├── axios.ts      # Cliente HTTP configurado
│   │   ├── i18n.ts       # Configuração do i18next
│   │   └── query-client.ts # Configuração do TanStack Query
│   ├── locales/          # Arquivos de tradução
│   │   ├── en/           # Traduções em inglês
│   │   └── pt/           # Traduções em português
│   ├── pages/            # Páginas da aplicação
│   │   ├── favorites/    # Página de favoritos
│   │   ├── home/         # Página inicial
│   │   ├── movie/id/     # Página de detalhes do filme
│   │   └── search/       # Página de busca
│   ├── test/             # Configurações e helpers de teste
│   ├── types/            # Definições de tipos TypeScript
│   ├── index.css         # Estilos globais e tema
│   ├── main.tsx          # Ponto de entrada da aplicação
│   └── router.tsx        # Configuração de rotas
├── Dockerfile            # Configuração Docker
├── nginx.conf            # Configuração Nginx
├── jest.config.js        # Configuração Jest
├── vite.config.ts        # Configuração Vite
└── package.json          # Dependências e scripts
```

## Licença

MIT
