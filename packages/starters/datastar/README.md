# Datastar Starter Kit

This starter kit demonstrates how to build realtime web applications using [Datastar](https://github.com/starfederation/datastar) with PocketPages. It includes a live chat demo and counter example.

## Features

- Realtime chat with emoji avatars
- Live counter with instant updates
- Datastar signal management
- Server-sent events (SSE) integration
- Modern UI with Tailwind CSS

## Installation

```bash
npx tiged benallfree/pocketpages/packages/starters/datastar .
cd datastar
npm i
pocketbase serve --dir=pb_data --dev
```

## Setup

The starter kit is pre-configured with the required Datastar setup:

1. **Plugin Configuration** (`+config.js`): Includes the datastar plugin
2. **Script Injection** (`+layout.ejs`): Includes `<%- datastar.scripts() %>` in the `<head>` section
3. **Realtime Integration**: Configured for realtime updates

## Usage

1. Start the server and visit `http://127.0.0.1:8090`
2. Open multiple browser tabs to see realtime updates
3. Send messages in the chat to see them appear instantly across all tabs
4. Click the counter button to see live updates

## Key Components

- **Chat System**: Real-time messaging with random emoji avatars
- **Counter**: Simple state management with live updates
- **Datastar Integration**: Server-side signal reading and client-side binding
- **Realtime Broadcasting**: Updates sent to all connected clients

## Datastar Features Demonstrated

- `datastar.patchElements()` - DOM updates
- `datastar.patchSignals()` - Signal management
- `datastar.readSignals()` - Form data reading
- `datastar.realtime.*` - Broadcasting to all clients
- Client-side data binding with `data-bind-*` attributes
- Event handling with `data-on-click` attributes
