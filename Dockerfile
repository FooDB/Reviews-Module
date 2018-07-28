FROM node:7.6-alpine

RUN mkdir -p /client/src

WORKDIR /client/src

COPY . .

RUN yarn install --ignore-engines

EXPOSE 3005

CMD [ "npm", "start" ]