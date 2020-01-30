FROM node:12
WORKDIR /api
COPY package*.json ./
RUN npm ci --only=production
COPY . .

EXPOSE 3000
CMD npm run db:init && npm start
