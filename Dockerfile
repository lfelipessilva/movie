FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_TMDB_URL
ARG VITE_TMDB_API_KEY
ARG VITE_TMDB_IMAGE_URL

ENV VITE_TMDB_URL=$VITE_TMDB_URL
ENV VITE_TMDB_API_KEY=$VITE_TMDB_API_KEY
ENV VITE_TMDB_IMAGE_URL=$VITE_TMDB_IMAGE_URL

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]

