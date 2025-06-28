# version 1 

# FROM ubuntu

# RUN apt update && apt install nodejs -y npm -y

# COPY . .

# RUN npm install

# CMD ["npm" , "run" , "start"]

# version 2

# FROM node:20.13-alpine

# WORKDIR /usr/src/app

# ENV NODE_ENV=production

# COPY package*.json ./

# RUN npm ci --only=production

# USER node

# COPY --chown=node:node src public ./

# EXPOSE 3000

# CMD ["node" , "index.js"]

