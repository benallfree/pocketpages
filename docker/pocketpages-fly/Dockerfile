# syntax=docker/dockerfile:1

# Base image for running a PocketPages app on Fly.io (or any Docker host).
#
# An app's own Dockerfile only needs one line:
#
#   FROM ghcr.io/benallfree/pocketpages-fly:0.40
#
# The ONBUILD steps below then copy the app in and install its npm packages.

FROM alpine:3.22

# PocketBase release to install. The image is tagged with this version.
ARG PB_VERSION=0.40.6
# Set by Docker for each build: amd64 on Fly, arm64 on Apple silicon.
ARG TARGETARCH

RUN apk add --no-cache ca-certificates \
  && wget -q -O /tmp/pb.zip "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_${TARGETARCH}.zip" \
  && unzip -q /tmp/pb.zip pocketbase -d /usr/local/bin \
  && rm /tmp/pb.zip \
  && pocketbase --version

# PocketBase resolves require() from the working directory, so the app and its
# node_modules live here and the server starts here.
WORKDIR /app

# Install the app's npm packages. Node and npm are only needed for this step,
# so they're added and removed in the same layer and the final image stays small.
ONBUILD COPY package.json package-lock.json* ./
ONBUILD RUN apk add --no-cache --virtual .npm nodejs npm \
  && npm install --omit=dev --no-audit --no-fund \
  && npm cache clean --force \
  && apk del .npm
ONBUILD COPY . .

# Data goes in /pb_data. Mount a volume there (fly.toml [mounts]), or it is
# lost whenever the machine is replaced.
EXPOSE 8090

ENTRYPOINT ["pocketbase"]
CMD ["serve", "--http=0.0.0.0:8090", "--dir=/pb_data", "--hooksDir=/app/pb_hooks", "--migrationsDir=/app/pb_migrations", "--publicDir=/app/pb_public"]
