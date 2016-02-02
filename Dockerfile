# Basic docker launcher for simulating the AWS API.

FROM node:slim

COPY . /usr/src/app/
WORKDIR /usr/src/app
RUN npm install


EXPOSE 3000
CMD [ "npm", "start" ]
