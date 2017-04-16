FROM node:7.2.1-alpine

RUN apk add --update tzdata
ENV TZ=Europe/Moscow
RUN npm install yarn source-map-support express node-version-compare\
  --global --no-progress --silent --depth 0

# Copy application files
COPY ../build /usr/src/app
WORKDIR /usr/src/app

RUN yarn install --production --no-progress

EXPOSE 3000

CMD [ "node", "server.js" ]