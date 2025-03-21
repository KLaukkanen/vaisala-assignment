FROM node:22-alpine
ARG RUN_MODE
WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install && npm run build
