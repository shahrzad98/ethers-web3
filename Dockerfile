FROM node:14 as builder

WORKDIR /app

ARG GA_SPARK_ID
ARG NPM_AUTH_TOKEN
ENV GA_SPARK_ID $GA_SPARK_ID
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
ENV PORT 8080 

RUN apt update
RUN apt install git
RUN apt install build-essential
# cache dependencies
RUN echo "//npm.pkg.github.com/:_authToken=$NPM_AUTH_TOKEN" >> .npmrc
RUN echo "@totemfi:registry=https://npm.pkg.github.com" >> .npmrc
RUN echo "//npm.pkg.github.com/:_authToken=$NPM_AUTH_TOKEN" >> .yarnrc
RUN echo "@totemfi:registry=https://npm.pkg.github.com" >> .yarnrc
COPY package.json ./
COPY yarn.lock ./
RUN yarn install
RUN npm install -g serve
# copy application
COPY . .
RUN REACT_APP_GA_ID=$GA_SPARK_ID yarn build

ENTRYPOINT [ "serve","-l","8080", "-s", "build" ]
# FROM nginx
# COPY --from=builder /app/build /usr/share/nginx/html
