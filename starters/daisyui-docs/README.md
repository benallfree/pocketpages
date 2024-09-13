# DaisyUI PocketPages Starter Kit

This setup provides a minimal docs app integrated with **Tailwind CSS** and **DaisyUI**, giving you a solid foundation for building modern, responsive, and aesthetically pleasing docs site.

## Features

- **Tailwind CSS**: A utility-first CSS framework that makes styling your application easy and flexible.
- **DaisyUI**: A Tailwind CSS component library that offers a collection of pre-designed components to speed up your development.

## Installation

To create your PocketPages app with Tailwind CSS and DaisyUI using the `daisyui-docs` template, run:

```bash
bunx pocketpages new myapp --template=daisyui-docs
```

This command sets up a new PocketPages project in the `myapp` directory, pre-configured with Tailwind CSS and DaisyUI.

## Usage

### Enter Development Mode

To start the development server with live reloading and other development features, run:

```bash
bunx dev
```

This command serves your app in development mode, allowing you to see changes in real-time as you build and style your application.

### Enter Production Mode

When you're ready to deploy your app in production, use:

```bash
bunx serve
```

This command optimizes and serves your app in production mode, ready for deployment.

### Access PocketPages Commands

After setting up your app, you can access all PocketPages-related commands and tools with:

```bash
bunx pocketpages
```

This gives you access to various PocketPages utilities and commands for managing your application.

### Access PocketBase

To interact with or manage the PocketBase binary installed by PocketPages, use:

```bash
bunx pocketbase
```

This command provides direct access to the PocketBase version installed by PocketPages, allowing you to perform low-level PocketBase operations when needed.
