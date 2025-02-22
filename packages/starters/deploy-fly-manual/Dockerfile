# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.1.26
ARG NODE_VERSION=20
FROM imbios/bun-node:${BUN_VERSION}-${NODE_VERSION}-alpine 

RUN apk add ca-certificates

LABEL fly_launch_runtime="Bun"

# Set production environment
ENV NODE_ENV="production"

WORKDIR /app-home
COPY --link package.json .
COPY --link bun.lockb .
RUN bun i --production --verbose
COPY --link . .

# Start the server by default, this can be overwritten at runtime
EXPOSE 8090
CMD [ "bun", "serve", "--dev", "--dir=/pb_data", "--hooksDir=app" ]
