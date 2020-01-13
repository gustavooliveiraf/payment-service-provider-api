FROM node:12
WORKDIR /api
COPY package*.json ./
RUN npm ci --only=production
COPY . .

EXPOSE 80
CMD [ "npm", "start" ]
