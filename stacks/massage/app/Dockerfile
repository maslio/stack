FROM --platform=linux/amd64 oven/bun:latest
WORKDIR /app
COPY .output ./
EXPOSE 3000
CMD ["bun", "run", "./server/index.mjs"]
