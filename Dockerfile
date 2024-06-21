FROM node:18-alpine

WORKDIR /user-frontend

RUN yarn --version || npm install -g yarn

COPY package.json package-lock.json ./

RUN yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]
