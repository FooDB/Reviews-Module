FROM node:7.6-alpine

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN yarn install --ignore-engines

EXPOSE 8050

CMD [ "npm", "run", "build" ]

CMD [ "npm", "run", "seed" ]

CMD [ "npm", "start" ]