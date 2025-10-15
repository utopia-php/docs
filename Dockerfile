FROM appwrite/synapse-server:latest AS base
RUN apt-get update && apt-get install -y git
RUN npm install -g pnpm pm2
RUN apt-get update && apt-get install -y lsof
RUN apt-get install -y curl

RUN mkdir -p /app

WORKDIR /template
COPY pm2.config.cjs ./

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

WORKDIR /app
RUN git init
RUN cp -r /template/node_modules /app/node_modules
RUN rm -rf /template/node_modules

WORKDIR /turborepo
ENV FS_ROOT_PATH=/app

