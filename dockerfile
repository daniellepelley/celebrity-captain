FROM node:8-alpine

WORKDIR /usr/app

COPY . .
RUN npm i --quiet
RUN npm run build

RUN npm install pm2 -g

CMD ["pm2-runtime", "dist/index.js"]