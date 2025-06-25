FROM node:22-slim AS base
WORKDIR /app
RUN apt-get update -y && apt-get install -y openssl
RUN npm i -g pnpm

FROM base AS dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod=false

FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN pnpx prisma generate && \
    pnpm run build

CMD ["pnpm", "run", "start"]