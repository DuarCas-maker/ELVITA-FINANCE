FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json ./
RUN pnpm install --prod=false

FROM base AS builder
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_DEMO_ANNUAL_INTEREST_RATE
ARG NEXT_PUBLIC_COMMERCIAL_NAME
ARG NEXT_PUBLIC_COMMERCIAL_EMAIL
ARG NEXT_PUBLIC_COMMERCIAL_IDENTIFIER
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_DEMO_ANNUAL_INTEREST_RATE=$NEXT_PUBLIC_DEMO_ANNUAL_INTEREST_RATE
ENV NEXT_PUBLIC_COMMERCIAL_NAME=$NEXT_PUBLIC_COMMERCIAL_NAME
ENV NEXT_PUBLIC_COMMERCIAL_EMAIL=$NEXT_PUBLIC_COMMERCIAL_EMAIL
ENV NEXT_PUBLIC_COMMERCIAL_IDENTIFIER=$NEXT_PUBLIC_COMMERCIAL_IDENTIFIER
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
