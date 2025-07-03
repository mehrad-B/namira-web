FROM node:22-alpine AS builder

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM node:22-alpine AS runtime

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@latest --activate && \
    pnpm install --prod --frozen-lockfile

EXPOSE 80
ENV PORT=80

CMD ["node", "build"]
