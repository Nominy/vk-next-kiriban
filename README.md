# VK Next Kiriban

A small Next.js application for tracking VK group membership counts. Add groups with a target member goal and the app periodically checks each group via the VK API. When a goal is reached you will see a popup notification.

## Prerequisites

- Node.js 18+
- A `VK_TOKEN` environment variable for API access

## Install

```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

Open <http://localhost:3000> in your browser.

## Build

Create a production build:

```bash
npm run build
```

## Run

Serve the built app (honours the `PORT` variable):

```bash
npm run start
```

