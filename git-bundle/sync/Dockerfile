# Copy and run NPM Install
FROM node:latest as base
LABEL "br.com.predialize"="Predialize" \
      maintainer="Rodrigo Brabo <brabo.rodrigo@gmail.com>" \
      version="1.0"
WORKDIR /srv/sync
COPY package* ./
COPY . .
RUN ["rm", "-rf", "node_modules"]
RUN ["npm", "install"]

# RUN DEVELOPMENT
FROM node:latest as development
WORKDIR /srv/sync
COPY --from=base /srv/sync ./
ARG NODE_ENV=development
CMD ["npm", "run", "development"]

# BUILD
FROM node:latest as build
WORKDIR /srv/sync
COPY --from=base /srv/sync ./
ARG NODE_ENV=production
RUN ["npm", "run", "build"]

# RUN PRODUCTION
FROM node:latest as production
WORKDIR /srv/sync
COPY --from=build /srv/sync/dist ./src/
COPY --from=build /srv/sync/node_modules ./node_modules
COPY --from=build /srv/sync/package* ./
ARG NODE_ENV=production
CMD ["npm", "run", "production"]