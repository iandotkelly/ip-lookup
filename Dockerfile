FROM node:12.14.0-alpine

WORKDIR /usr/src/geo-location

COPY . ./

RUN npm install
RUN npm run compile

EXPOSE 3000

CMD [ "node", "build/src/index.js" ]