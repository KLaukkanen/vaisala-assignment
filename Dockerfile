FROM node:22-alpine
WORKDIR /usr/app
COPY ./ /usr/app
RUN npm install && npm run build
