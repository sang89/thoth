FROM node:14.4.0-alpine3.10
USER root
WORKDIR /thoth_frontend
COPY . /thoth_frontend

RUN npm install --silent
CMD ["npm", "start"]
