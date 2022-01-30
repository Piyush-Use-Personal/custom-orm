# stage 1 building the code
FROM node:14
WORKDIR /app
COPY package*.json ./

RUN npm install
RUN npm install db-migrate-pg
COPY . .

# This is our secret sauce
RUN git clone https://github.com/vishnubob/wait-for-it.git