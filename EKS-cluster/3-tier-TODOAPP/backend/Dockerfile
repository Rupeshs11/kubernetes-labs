FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

# Specify the command to run when the container starts
CMD [ "node", "index.js" ]
