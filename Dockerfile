FROM node:14 as base

WORKDIR /home/pitang/Desktop/prog/estudos/dockerize-node-crud

COPY package*.json ./

RUN yarn install

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN yarn build