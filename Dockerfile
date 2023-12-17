FROM node:19.8-alpine

ARG NODE_ENV=production
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY ./src src/
COPY ./dist/app.js src/app.js

CMD [ "npm", "start" ]