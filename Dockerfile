FROM node:16

#Install pm2
RUN yarn global add pm2;

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /usr/src/app

# Copying source files
COPY . .

# Build image
RUN yarn install --network-timeout 100000; \
    yarn build; 

EXPOSE 3000