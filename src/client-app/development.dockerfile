FROM node:alpine

WORKDIR /client-app

COPY package.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]