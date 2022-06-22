FROM node:14

WORKDIR /usr/app

COPY package.json .

COPY ./src/database/schema.prisma ./dist/database/schema.prisma

RUN npm install

COPY . .

RUN npm run prisma:generate
