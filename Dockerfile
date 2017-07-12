FROM node:argon

# RUN groupadd -r app && useradd -r -g app app

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install --production

# Bundle app source
COPY dist /usr/src/app

EXPOSE 8080

CMD [ "npm", "start" ]
