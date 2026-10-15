# First server preview: retain source and the Payload CLI for migrations.
# This uses standard next start, not Next.js standalone output.
FROM node:22-bookworm-slim AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
COPY package.json package-lock.json .npmrc ./
RUN npm ci --include=dev --include=optional

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN node deploy/check-migrations.mjs
# Current public pages do not query the database during build.
# These are disposable build values; real runtime secrets come from Compose.
RUN PAYLOAD_SECRET=build-only-placeholder-not-a-runtime-secret \
    DATABASE_URL=postgresql://build:build@127.0.0.1:5432/build \
    npm run build

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=3000
ENV UPLOAD_DIR=/app/media
COPY --from=builder --chown=node:node /app /app
RUN mkdir -p /app/media && chown node:node /app/media
USER node
EXPOSE 3000
CMD ["npm", "run", "start", "--", "--hostname", "0.0.0.0"]
