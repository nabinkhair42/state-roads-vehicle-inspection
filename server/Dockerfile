FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

# for development mode only!
CMD ["npm", "run", "dev"]
