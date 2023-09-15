FROM node:16
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
EXPOSE 3000
ENV YARN_COMMAND=dev

# If you want to use a different command, pass the YARN_COMMAND env variable to 
# docker-compose up --build

# Ex. YARN_COMMAND=build docker-compose up --build

ENTRYPOINT ["sh", "-c", "yarn $YARN_COMMAND"]
