# syntax = docker/dockerfile:1

# Adjust BUN_VERSION as desired
ARG BUN_VERSION=1.1.21
FROM oven/bun:${BUN_VERSION}-slim as base

LABEL fly_launch_runtime="Bun"

# Bun app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y build-essential pkg-config python-is-python3 unzip ca-certificates

ARG PB_VERSION=0.22.19

# download and unzip PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/
RUN mv /pb/pocketbase .

# Copy application code
COPY --link app .

# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 8090
CMD [ "./pocketbase", "serve", "--dev", "--http=0.0.0.0:8090", "--dir=/pb_data", "--migrationsDir=pb_migrations", "--hooksDir=pb_hooks" ]
