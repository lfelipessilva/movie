# Movie

Aplicação React para explorar filmes, buscar títulos, visualizar detalhes e gerenciar uma lista de favoritos, utilizando a API pública do The Movie Database (TMDB).

**Hospedagem:** [https://movie.luislab.xyz](https://movie.luislab.xyz)

## Demonstração

A aplicação está disponível em produção no endereço [https://movie.luislab.xyz](https://movie.luislab.xyz).

## Funcionalidades Principais

- **Exploração de filmes populares**: Visualização de filmes populares com scroll infinito
- **Busca de filmes**: Pesquisa de filmes por título
- **Detalhes do filme**: Visualização completa de informações, incluindo sinopse, gêneros, data de lançamento e avaliações
- **Sistema de favoritos**: Adição e remoção de filmes da lista de favoritos com persistência em localStorage
- **Ordenação de favoritos**: Ordenação por título ou avaliação, em ordem crescente ou decrescente
- **Interface responsiva**: Design adaptável para diferentes tamanhos de tela
- **Tratamento de erros**: Feedback visual para estados de carregamento e erros

## Estrutura de Páginas

A aplicação possui quatro páginas principais:

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial com lista de filmes populares e scroll infinito |
| `/movie/:id` | Página de detalhes do filme com informações completas |
| `/search?q=<query>` | Página de busca de filmes por título |
| `/favorites?sortBy=<field>&order=<asc\|desc>` | Página de favoritos com opções de ordenação |

## Configuração da API do TMDB

A aplicação utiliza a API do The Movie Database (TMDB). Para configurar:

1. Acesse [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)
2. Crie uma conta ou faça login
3. Solicite uma API Key (chave de API)
4. Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

5. Edite o arquivo `.env` e adicione sua chave de API:

```bash
VITE_TMDB_API_KEY=sua-chave-api-aqui
VITE_TMDB_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_URL=https://image.tmdb.org/t/p/
```

**Nota:** A API do TMDB é gratuita, mas requer registro e aprovação da chave de API.

## Instalação e Execução

### Pré-requisitos

- Node.js 20 ou superior
- npm ou yarn

### Instalação

Clone o repositório e instale as dependências:

```bash
git clone <repository-url>
cd movie
npm install
```

### Execução em Desenvolvimento

Execute o servidor de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

### Build para Produção

Gere o build de produção:

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `dist/`.

### Preview do Build

Visualize o build de produção localmente:

```bash
npm run preview
```

### Linting

Execute o linter para verificar o código:

```bash
npm run lint
```

## Tecnologias Utilizadas

### Core

- **React 19.2.0**: Biblioteca para construção de interfaces
- **TypeScript**: Superset do JavaScript com tipagem estática
- **Vite 7.2.2**: Build tool e dev server

### Roteamento

- **React Router 7.9.5**: Gerenciamento de rotas e navegação

### Gerenciamento de Estado e Requisições

- **TanStack React Query 5.90.7**: Gerenciamento de estado do servidor, cache e sincronização de dados
- **Axios 1.13.2**: Cliente HTTP para requisições à API

### Estilização

- **Tailwind CSS 4.1.17**: Framework CSS utility-first
- **Lucide React 0.553.0**: Biblioteca de ícones

### Testes

- **Jest 30.2.0**: Framework de testes
- **React Testing Library 16.3.0**: Utilitários para testes de componentes React
- **@testing-library/jest-dom**: Matchers customizados para Jest
- **@testing-library/user-event**: Simulação de interações do usuário
- **ts-jest**: Transpilador TypeScript para Jest

### Ferramentas de Desenvolvimento

- **ESLint**: Linter para JavaScript/TypeScript
- **TypeScript ESLint**: Regras ESLint para TypeScript

## Critérios de Avaliação

Este projeto demonstra os seguintes aspectos técnicos:

### Uso Correto de Hooks

- Hooks customizados para lógica reutilizável (`useFavorites`, `usePopularMovies`, `useMovieById`, etc.)
- Hooks do React Router (`useParams`, `useNavigate`, `useSearchParams`)
- Hooks do TanStack React Query (`useInfiniteQuery`, `useQuery`)
- Hooks de UI customizados (`useIntersectionObserver`, `useGlowEffect`)

### Gerenciamento de Estado Global

- TanStack React Query para estado do servidor (cache, sincronização, invalidação)
- LocalStorage com hook customizado para persistência de favoritos
- Estado local quando apropriado

### Consumo e Manipulação de APIs REST

- Cliente Axios configurado com baseURL e headers de autenticação
- Integração com a API do TMDB
- Tratamento de respostas paginadas com infinite queries
- Transformação e tipagem de dados da API

### Roteamento e Navegação

- React Router para navegação entre páginas
- Rotas protegidas e parâmetros dinâmicos
- Navegação programática com `useNavigate`
- Query parameters para busca e filtros

### Tratamento de Erros e Loading States

- Estados de loading (`isPending`, `isLoading`, `isFetchingNextPage`)
- Tratamento de erros com feedback visual
- Estados vazios (sem favoritos, sem resultados de busca)
- Fallbacks para dados não disponíveis

### Organização e Estrutura de Código

- Separação de responsabilidades (hooks, components, pages, lib, types)
- Componentes reutilizáveis e modulares
- Tipagem TypeScript completa
- Configuração centralizada (axios, query-client)

### Responsividade

- Layout adaptativo com Tailwind CSS
- Grid responsivo (1 coluna em mobile, 2 em tablet, 3 em desktop)
- Componentes que se adaptam a diferentes tamanhos de tela
- Imagens responsivas

## Testes

### Executar Testes em Modo Watch

Execute os testes em modo watch para desenvolvimento:

```bash
npm test
```

### Executar Testes em CI

Execute os testes uma vez (útil para CI/CD):

```bash
npm run test:ci
```

### Estrutura de Testes

Os testes estão localizados junto aos componentes, seguindo o padrão `*.test.tsx`:

- `src/components/rating/rating.test.tsx`

A configuração do Jest está em `jest.config.js` e utiliza:
- `ts-jest` para transpilação TypeScript
- `jsdom` como ambiente de testes
- `@testing-library/jest-dom` para matchers customizados
- Setup automático via `src/setupTests.ts`

## Deploy

A aplicação está hospedada em [https://movie.luislab.xyz](https://movie.luislab.xyz).

### Build com Docker

O projeto inclui um `Dockerfile` para containerização:

```bash
docker build \
  --build-arg VITE_TMDB_URL=https://api.themoviedb.org/3 \
  --build-arg VITE_TMDB_API_KEY=sua-chave-api \
  --build-arg VITE_TMDB_IMAGE_URL=https://image.tmdb.org/t/p/ \
  -t movie-app .
```

O container utiliza Nginx para servir os arquivos estáticos do build.

## Licença

MIT

