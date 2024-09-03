# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.1.21
FROM oven/bun:${BUN_VERSION}-slim as base

LABEL fly_launch_runtime="Bun"

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential pkg-config python-is-python3 unzip ca-certificates

# NOOP

# Final stage for app image
FROM base


WORKDIR /app-home
COPY --link package.json .
COPY --link bun.lockb .
RUN bun i --production --verbose
COPY --link . .

# Start the server by default, this can be overwritten at runtime
EXPOSE 8090
CMD [ "bun", "serve", "--dev", "--dir=/pb_data", "--hooksDir=app" ]
