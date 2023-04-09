FROM node:16
LABEL maintainer "angelamariag074@gmail.com"

WORKDIR /app
EXPOSE 3000

COPY package.json yarn.lock ./
RUN touch .env

RUN yarn

COPY . .
ENV NODE_ENV production
RUN npm run build

CMD [ "node", "src/app.ts" ]