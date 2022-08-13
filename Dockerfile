FROM node:16.16.0-alpine

WORKDIR /src/app

COPY package*.json ./

RUN npm install
RUN npm install pm2 --location=global

COPY . ./

EXPOSE 3000 
EXPOSE 9200

CMD npm run start