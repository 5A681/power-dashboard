# Bun-based multi-stage Dockerfile

# Builder: install with bun and build the Next.js app
FROM oven/bun:latest AS builder
WORKDIR /app

# Copy package metadata (works whether lockfile exists or not)
COPY package*.json ./

# Install dependencies with bun
RUN bun install
# Ensure TypeScript is available for next.config.ts during build
RUN bun add -d typescript

# Copy the rest of the source and build
COPY . .
RUN bun run build

# Runner: lean runtime image using bun
FROM oven/bun:latest AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy package metadata and install only production deps
COPY package*.json ./
RUN bun install --production

# Copy build output from builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# do not copy next.config.ts into the runner to avoid requiring TypeScript at runtime

EXPOSE 3000

# Start the app (expects a "start" script in package.json, e.g. "next start -p 3000")
CMD ["bun", "run", "start"]
