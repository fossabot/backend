FROM node:carbon
LABEL maintainer="ryan@ryandowling.me"

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app

RUN /usr/local/bin/npm install

COPY . /app

RUN /usr/local/bin/npm run build

RUN /usr/local/bin/npm prune --production

ENV NODE_ENV production

VOLUME ["/app/logs"]

EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/npm"]
CMD ["start"]
