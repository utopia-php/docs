FROM appwrite/synapse-server:latest@sha256:c43483d663d48890f4ad6a66681fcea2ac0dd1d5e0d05f3a52460170ca7dd9d6 AS base
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

