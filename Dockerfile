# Basic docker launcher for simulating the AWS API.

FROM node:slim

COPY . /usr/src/app/
WORKDIR /usr/src/app
RUN npm install \
    && mkdir -p /var/pipit

VOLUME ["/var/pipit"]

# References the hostname as declared in the docker-compose.yml file
ENV DYNAMODB_ENDPOINT=http://dynamodb:8000

# Custom volume for on-the-fly updates to extensions.
ENV PIPIT_EXTENSIONS=/var/pipit
ENV PORT 3000

EXPOSE 3000
CMD [ "npm", "start" ]
