FROM node:12
WORKDIR /api
COPY package*.json ./
RUN npm ci --only=production
RUN npm install pm2 -g
COPY . .

EXPOSE 3000
CMD npm run db:prodAndJest:init && npm start
