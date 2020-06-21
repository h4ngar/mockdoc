FROM node:13.12.0

LABEL maintainer="Danijel Garic"

ENV TZ=Europe/Berlin

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    echo $TZ > /etc/timezone

WORKDIR /app

COPY . /app

RUN npm install && npm run bundle

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
