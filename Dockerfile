FROM node:7.6-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN yarn install

EXPOSE 8050

CMD [ "npm", "build" ]

CMD [ "npm", "start" ]