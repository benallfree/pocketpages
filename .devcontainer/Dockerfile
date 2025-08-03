FROM mcr.microsoft.com/devcontainers/base:ubuntu-22.04

# Set environment variables
ENV POCKETBASE_VERSION=0.29.0
ENV DEBIAN_FRONTEND=noninteractive

# Install basic dependencies
RUN apt-get update && apt-get install -y \
    curl \
    unzip \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Install Bun into vscode user
USER vscode
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/home/vscode/.bun/bin:${PATH}"
USER root

# Install PocketBase
RUN curl -L -o /tmp/pocketbase.zip \
    "https://github.com/pocketbase/pocketbase/releases/download/v${POCKETBASE_VERSION}/pocketbase_${POCKETBASE_VERSION}_linux_amd64.zip" \
    && unzip /tmp/pocketbase.zip -d /tmp \
    && mv /tmp/pocketbase /usr/local/bin/ \
    && chmod +x /usr/local/bin/pocketbase \
    && rm /tmp/pocketbase.zip

# Set working directory
WORKDIR /workspace

# Install dependencies when container starts
CMD ["bash"]