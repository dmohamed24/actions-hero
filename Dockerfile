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

# ---------- Base Image ----------
    FROM node:20.13-alpine AS base
    WORKDIR /usr/src/app
    COPY package*.json ./
    
    # ---------- Development Stage ----------
    FROM base AS development
    ENV NODE_ENV=development
    RUN npm install
    
    # Copy everything for dev, including source files and maybe nodemon config
    COPY . .
    
    CMD ["npm", "run", "dev"]  # or use nodemon here
    
    # ---------- Production Stage ----------
    FROM base AS production
    ENV NODE_ENV=production
    RUN npm ci --only=production
    
    COPY --chown=node:node src ./
    USER node
    
    EXPOSE 3000
    CMD ["node", "index.js"]
    