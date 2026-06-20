# Microfrontend App

A microfrontend architecture built with **React 19**, **Vite**, and **Module Federation** (`@originjs/vite-plugin-federation`). The project is split into five independent apps that run on separate ports and are stitched together by a shell (host) application.

## Architecture

```
shell (host)   :3000
├── home        :3001  → exposes ./Home
├── product     :3002  → exposes ./Product
├── cart        :3003  → exposes ./Cart
└── profile     :3004  → exposes ./Profile
```

The **shell** acts as the container. It loads each microfrontend at runtime via Module Federation remote entry files — no static bundling between apps.

## Project Structure

```
Microfrontend/
├── .env              # Shared port and remote URL configuration
├── shell/            # Host/shell application
├── home/             # Home microfrontend
├── product/          # Product microfrontend
├── cart/             # Cart microfrontend
└── profile/          # Profile microfrontend
```

## Prerequisites

- Node.js 18+
- npm or yarn

## Environment Variables

A single `.env` file at the **root** of the monorepo is shared by all apps (each `vite.config.js` loads it from `../`).

```env
SHELL_PORT=3000
HOME_PORT=3001
PRODUCT_PORT=3002
CART_PORT=3003
PROFILE_PORT=3004

HOME_REMOTE=http://localhost:3001/assets/remoteEntry.js
PRODUCT_REMOTE=http://localhost:3002/assets/remoteEntry.js
CART_REMOTE=http://localhost:3003/assets/remoteEntry.js
PROFILE_REMOTE=http://localhost:3004/assets/remoteEntry.js
```

## Getting Started

Install dependencies in each app:

```bash
cd home && npm install
cd ../product && npm install
cd ../cart && npm install
cd ../profile && npm install
cd ../shell && npm install
```

## Running in Development

Module Federation requires the **remote apps to be built and previewed** before the shell can consume them (the shell reads remote entry files from the preview server, not the dev server).

### Step 1 — Build and preview each remote

Open a terminal for each remote app and run:

```bash
# Terminal 1
cd home && npm run build && npm run preview

# Terminal 2
cd product && npm run build && npm run preview

# Terminal 3
cd cart && npm run build && npm run preview

# Terminal 4
cd profile && npm run build && npm run preview
```

### Step 2 — Start the shell

```bash
# Terminal 5
cd shell && npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

Each app supports the following scripts:

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Serve the production build locally |

The `profile` app also includes:

| Script | Description |
|--------|-------------|
| `npm run lint` | Run ESLint |

## Tech Stack

| Technology | Version | Role |
|------------|---------|------|
| React | 19 | UI library (shared singleton) |
| Vite | 8 | Build tool and dev server |
| @originjs/vite-plugin-federation | 1.4 | Module Federation for Vite |
| @vitejs/plugin-react | 6 | React fast refresh |

## How Module Federation Works Here

- Each **remote** app (home, product, cart, profile) exposes a component via `remoteEntry.js`.
- The **shell** declares those remotes by URL in its `vite.config.js` (values come from `.env`).
- `react` and `react-dom` are listed as `shared` in every app to ensure a single React instance across all microfrontends.
