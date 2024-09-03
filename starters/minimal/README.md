# Minimal PocketPages Starter Kit

This is the smallest possible setup for a **PocketPages** app, designed to get you up and running quickly with a minimal configuration.

## Features

- **Minimal Setup**: A single `index.ejs` file to serve as the starting point for your app.
- **Simple Commands**: Use `bunx` commands to manage your development and production environments effortlessly.

## Installation

To create your PocketPages app using the minimal template, run:

```bash
bunx pocketpages new myapp --template=minimal
```

This will set up a new PocketPages project in the `myapp` directory with the minimal configuration.

## Usage

### Enter Development Mode

To start the development server with live reloading and other development features, run:

```bash
bunx dev
```

This command will serve your app in development mode, allowing you to make changes and see them reflected immediately.

### Enter Production Mode

When you're ready to serve your app in production mode, use:

```bash
bunx serve
```

This command starts the server in production mode, optimized for deployment.

### Access PocketPages Commands

After installation, you can access all PocketPages-related commands and utilities with:

```bash
bunx pocketpages
```

This gives you access to tools and commands specific to managing your PocketPages app.

### Access PocketBase

If you need to manage or interact with the PocketBase version that PocketPages installs, you can do so with:

```bash
bunx pocketbase
```

This command provides direct access to the PocketBase version installed by PocketPages, allowing you to perform low-level PocketBase operations when needed.

## Summary

This minimal setup is designed to get you started with PocketPages as quickly as possible, with just the essential files and commands needed to build and serve your application. Whether you're developing locally or deploying to production, the provided `bunx` commands streamline your workflow.
