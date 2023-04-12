FROM node:18
LABEL maintainer "angelamariag074@gmail.com"

WORKDIR /app
EXPOSE 3000

COPY package.json yarn.lock ./
RUN touch .env

RUN yarn

COPY . .
RUN npm run build

CMD [ "node", "build/app.js" ]
