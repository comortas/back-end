FROM node:16.14.2
LABEL MAINTAINER Cloudix DevOps <devops@cloudix.io>

#Environment variables
ENV PORT=80

#Create work directory
WORKDIR /app

#Copy all node codes
COPY . .

#Install app dependencies
RUN npm install

#PORT expose
EXPOSE 80

#Startup command
CMD ["node", "/app/app.js"]