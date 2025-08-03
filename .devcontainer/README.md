# PocketPages Devcontainer

This devcontainer provides a complete development environment for PocketPages with:

- **PocketBase v0.29.0** - Pre-installed and ready to use
- **Bun** - Fast JavaScript runtime and package manager  
- **VS Code extensions** - Prettier and Tailwind CSS support

## Quick Start

1. Open this repository in GitHub Codespaces or VS Code with Dev Containers extension
2. Wait for the container to build and dependencies to install
3. Start the development server:

```bash
cd packages/site
pocketbase serve --dir=pb_data --dev
```

4. Access PocketPages at http://localhost:8090

That's it! The environment is ready to use with no additional setup required.