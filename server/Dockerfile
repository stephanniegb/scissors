FROM node:14-alpine

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install --production

COPY . /app/

RUN npm run build

RUN npm install pm2 -g

EXPOSE 4000

CMD ["pm2-runtime", "process.json"]
