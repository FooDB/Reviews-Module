FROM node:7.6-alpine

RUN mkdir -p /client/src

WORKDIR /client/src

COPY . /client/src

RUN yarn install --production --ignore-engines

EXPOSE 3025

CMD [ "npm", "start"]