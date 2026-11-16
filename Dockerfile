FROM node:22-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install

COPY . .

RUN pnpm build

EXPOSE 4321

CMD ["pnpm", "preview", "--host", "0.0.0.0", "--port", "4321"]
