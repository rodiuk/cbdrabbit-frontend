# CBD Rabbit Frontend

Frontend storefront for CBD Rabbit built with Next.js App Router. The project includes a localized product catalog, checkout flow, user account area, blog/landing pages, and integrations with Monobank, NextAuth, Prisma, SendPulse, Telegram, and Nova Poshta.

## Stack

- Next.js 14 + React 18
- TypeScript
- Prisma + MySQL
- NextAuth
- Jotai
- CSS Modules
- Monobank merchant API
- SendPulse API
- Telegram Bot API

## Main Features

- Localized storefront for `uk` and `en`
- Product catalog rendered from Prisma
- Checkout with Monobank invoice creation and webhook status sync
- User auth with email/password, Google sign-in, and session handling via NextAuth
- User profile and order history pages
- Marketing and transactional email flows via SendPulse
- Telegram notifications
- Nova Poshta delivery selection in checkout

## Project Structure

```text
src/
  app/              Next.js routes, layouts, metadata, API routes
  components/       UI, checkout, auth, layout, landing, and domain components
  configs/          App/auth constants and environment-based config
  hooks/            Client hooks
  interfaces/       Shared TypeScript interfaces
  libs/
    18n/            Dictionaries and dictionary loader
    api/            Server-side business logic and integrations
    client/         Prisma client
    store/          Jotai atoms
  utils/            Utility helpers
prisma/
  schema.prisma     Database schema
public/             Static assets
```

## Requirements

- Node.js 18.17+ or 20+
- MySQL database
- Yarn or npm

## Getting Started

1. Install dependencies:

```bash
yarn install
```

2. Create an environment file:

```bash
cp .env.example .env
```

3. Fill in the required environment variables.

4. Sync the Prisma schema with the database:

```bash
yarn prisma db push
```

5. Start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `yarn dev` - start local development server
- `yarn build` - production build
- `yarn start` - run production server
- `yarn lint` - run Next.js ESLint checks

Note: `prebuild` runs `prisma db push`, so production builds expect a valid database connection.

## Environment Variables

Current `.env.example` includes only part of the required configuration. In practice, the app expects these variables:

### Core

- `DATABASE_URL` - MySQL connection string for Prisma
- `PUBLIC_DOMAIN` - public site URL, used in metadata and app config
- `NEXTAUTH_SECRET` - secret for NextAuth sessions

### Google Auth

- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

### Internal/App

- `API_KEY` - internal API key used for protected actions/endpoints

### Payments

- `MONOBANK` - Monobank merchant token

### Delivery

- `NOVA_POSHTA` - Nova Poshta API key

### Messaging and CRM

- `TG_BOT_TOKEN` - Telegram bot token
- `SENDPULSE_EVENTS_URL` - SendPulse events API base URL
- `SENDPULSE_API_URL` - SendPulse REST API base URL
- `SENDPULSE_CLIENT_ID`
- `SENDPULSE_CLIENT_SECRET`

### Optional/legacy

- `API_URL` - referenced in Next config

If you add or rename env vars, update both `.env.example` and [`src/configs/app.config.ts`](/Users/apetlovanyi/Desktop/rabbit/cbdrabbit-frontend/src/configs/app.config.ts).

## Authentication

Auth is configured in [`src/configs/auth.config.ts`](/Users/apetlovanyi/Desktop/rabbit/cbdrabbit-frontend/src/configs/auth.config.ts).

- Google provider
- Credentials provider
- Custom `autoSignIn` credentials flow
- Session data extended with `id` and `role`

API route:

- [`src/app/api/auth/[...nextauth]/route.ts`](/Users/apetlovanyi/Desktop/rabbit/cbdrabbit-frontend/src/app/api/auth/[...nextauth]/route.ts)

## Checkout Flow

Main checkout route:

- [`src/app/[lang]/(main)/checkout/page.tsx`](/Users/apetlovanyi/Desktop/rabbit/cbdrabbit-frontend/src/app/[lang]/(main)/checkout/page.tsx)

Core payment/order logic:

- [`src/libs/api/checkout.api.ts`](/Users/apetlovanyi/Desktop/rabbit/cbdrabbit-frontend/src/libs/api/checkout.api.ts)
- [`src/libs/api/order.api.ts`](/Users/apetlovanyi/Desktop/rabbit/cbdrabbit-frontend/src/libs/api/order.api.ts)
- [`src/app/api/checkout/route.ts`](/Users/apetlovanyi/Desktop/rabbit/cbdrabbit-frontend/src/app/api/checkout/route.ts)

High-level flow:

1. User builds cart and enters checkout data.
2. App creates a Monobank invoice.
3. Monobank calls the checkout webhook.
4. App validates invoice status and updates order state in Prisma.
5. Email and notification side effects are triggered from server logic.

## Internationalization

Supported locales are defined in [`i18n.config.ts`](/Users/apetlovanyi/Desktop/rabbit/cbdrabbit-frontend/i18n.config.ts).

- Default locale: `uk`
- Supported locales: `uk`, `en`

Dictionaries live in:

- [`src/libs/18n/dict/uk.json`](/Users/apetlovanyi/Desktop/rabbit/cbdrabbit-frontend/src/libs/18n/dict/uk.json)
- [`src/libs/18n/dict/en.json`](/Users/apetlovanyi/Desktop/rabbit/cbdrabbit-frontend/src/libs/18n/dict/en.json)

## Database

Schema:

- [`prisma/schema.prisma`](/Users/apetlovanyi/Desktop/rabbit/cbdrabbit-frontend/prisma/schema.prisma)

Main entities:

- `User`
- `Address`
- `Loyalty`
- `Order`
- `InstagramOrder`
- `OrderItem`
- `Product`
- `Property`
- `Image`
- `Post`

## Integrations

- Monobank for payments
- SendPulse for contact sync and transactional email events
- Telegram bot for order-related messaging
- Nova Poshta for delivery UX

## Development Notes

- Business logic is concentrated in `src/libs/api/*` and many modules are marked with `"use server"`.
- Prisma client singleton is defined in [`src/libs/client/prisma.client.ts`](/Users/apetlovanyi/Desktop/rabbit/cbdrabbit-frontend/src/libs/client/prisma.client.ts).
- Global providers are registered in [`src/app/[lang]/providers.tsx`](/Users/apetlovanyi/Desktop/rabbit/cbdrabbit-frontend/src/app/[lang]/providers.tsx).
- The current README intentionally documents the real structure of the project rather than the default Next.js template.
