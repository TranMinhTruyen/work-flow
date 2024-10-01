# using Node.js base image
FROM node:22.7.0-alpine AS development
ENV NODE_ENV development

WORKDIR /app

COPY . .

RUN yarn install

COPY . .

EXPOSE 3000