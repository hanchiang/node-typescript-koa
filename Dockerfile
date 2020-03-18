FROM node:12.13-buster-slim

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=8080
ENV PORT $PORT
EXPOSE 3000

# install dependencies first, in a different location for easier app bind mounting for local development
# due to default /opt permissions we have to create the dir with root and change perms
RUN mkdir -p /opt/node_app && chown -R node:node /opt/node_app
RUN apt-get install -y git
WORKDIR /opt/node_app

RUN apt-get update && \
  apt-get install -y git python build-essential

# the official node image provides an unprivileged user as a security best practice
# but we have to manually enable it. We put it here so npm installs dependencies as the same
# user who runs the app. 
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
USER node
COPY --chown=node:node package*.json tsconfig.json ./
RUN npm install
ENV PATH /opt/node_app/node_modules/.bin:$PATH

COPY --chown=node:node . .

RUN tsc

ENTRYPOINT [ "npm", "run", "start" ]
