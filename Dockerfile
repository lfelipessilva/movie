FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_TMDB_URL
ARG VITE_TMDB_API_KEY
ARG VITE_TMDB_IMAGE_URL

RUN if [ -n "$VITE_TMDB_URL" ]; then export VITE_TMDB_URL="$VITE_TMDB_URL"; fi && \
    if [ -n "$VITE_TMDB_API_KEY" ]; then export VITE_TMDB_API_KEY="$VITE_TMDB_API_KEY"; fi && \
    if [ -n "$VITE_TMDB_IMAGE_URL" ]; then export VITE_TMDB_IMAGE_URL="$VITE_TMDB_IMAGE_URL"; fi && \
    npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

