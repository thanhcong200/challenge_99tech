FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
COPY .env.example .env.example

RUN npm run build

EXPOSE ${APP_PORT}

CMD ["npm", "run", "start"]
