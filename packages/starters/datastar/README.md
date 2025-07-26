# DataStar Starter Kit

This starter kit demonstrates how to build realtime web applications using [DataStar](https://github.com/starfederation/datastar) with PocketPages. It includes a live chat demo and counter example.

## Features

- Realtime chat with emoji avatars
- Live counter with instant updates
- DataStar signal management
- Server-sent events (SSE) integration
- Modern UI with Tailwind CSS

## Installation

```bash
npx tiged benallfree/pocketpages/packages/starters/datastar .
cd datastar
npm i
pocketbase serve --dir=pb_data --dev
```

## Usage

1. Start the server and visit `http://127.0.0.1:8090`
2. Open multiple browser tabs to see realtime updates
3. Send messages in the chat to see them appear instantly across all tabs
4. Click the counter button to see live updates

## Key Components

- **Chat System**: Real-time messaging with random emoji avatars
- **Counter**: Simple state management with live updates
- **DataStar Integration**: Server-side signal reading and client-side binding
- **Realtime Broadcasting**: Updates sent to all connected clients

## DataStar Features Demonstrated

- `datastar.patchElements()` - DOM updates
- `datastar.patchSignals()` - Signal management
- `datastar.readSignals()` - Form data reading
- `datastar.realtime.*` - Broadcasting to all clients
- Client-side data binding with `data-bind-*` attributes
- Event handling with `data-on-click` attributes
