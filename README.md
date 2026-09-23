# Ridepad (frontend)

Peer to peer car rental for Lagos. Private owners list idle cars, renters book them by the day, and money moves through escrow instead of a cash handover.

Trips come with a driver by default. Self drive unlocks for a renter after a set number of clean trips.

This repository holds the web frontend only. Escrow, wallets, identity checks and pricing live in the backend API.

## Stack

| Concern      | Choice                                         |
| ------------ | ---------------------------------------------- |
| Framework    | Next.js, App Router, plain JavaScript          |
| Styling      | Tailwind CSS                                   |
| Server data  | TanStack Query                                 |
| Client state | Zustand                                        |
| Forms        | React Hook Form with Zod                       |
| Auth         | NextAuth, credentials provider against the API |
| HTTP         | Axios wrapper in `lib/api.js`                  |
| Payments     | Paystack or Flutterwave checkout               |

No TypeScript. Do not add a `tsconfig.json`.

## Getting started

```bash
git clone <repo-url>
cd ridepad-web
nvm use
npm install
cp .env.example .env.local   # fill in the values
npm run dev
```

The app runs on http://localhost:3000. It needs the API running, or requests fail with a network error. Point `NEXT_PUBLIC_API_URL` at a local API or the staging one.

## Environment variables

| Variable                          | What it is                                             |
| --------------------------------- | ------------------------------------------------------ |
| `NEXT_PUBLIC_API_URL`             | Base URL of the backend API                            |
| `NEXTAUTH_URL`                    | This app's URL, `http://localhost:3000` in development |
| `NEXTAUTH_SECRET`                 | Random string, generate with `openssl rand -base64 32` |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Public key for checkout                                |
| `NEXT_PUBLIC_MAPS_KEY`            | Map provider key for the search page                   |

Never commit `.env.local`. Only `NEXT_PUBLIC_` variables reach the browser, so nothing secret goes behind that prefix.

## Scripts

| Command          | What it does               |
| ---------------- | -------------------------- |
| `npm run dev`    | Development server         |
| `npm run build`  | Production build           |
| `npm run start`  | Serve the production build |
| `npm run lint`   | ESLint                     |
| `npm run format` | Prettier across the repo   |

## Structure

```
app/            routes, grouped by role: (auth) (renter) (owner) (admin)
components/     ui/ layout/ car/ booking/ owner/
lib/            api.js, queries/, validators/, format.js, constants.js
hooks/          useAuth, useDebounce, useUpload, useGeolocation
store/          filterStore, bookingDraftStore
public/
```

Route groups keep the three user areas apart without adding segments to the URL. Each group has its own layout, navigation and access check through `RoleGuard`.

`app/api` holds only the NextAuth handler and the payment webhook. Business endpoints belong to the backend.

## How state is split

Server data lives in TanStack Query: search results, a car, availability, bookings, wallet balance, payouts. Cache keys carry the filter object or the resource id, so `['cars', filters]` and `['booking', bookingId]`. Booking status is polled every few seconds while a payment is pending, then left alone.

Client state lives in Zustand and stays small. `filterStore` holds current search filters so a user can open a car and come back without losing them. `bookingDraftStore` holds dates, trip type and extras before the booking exists on the server.

Session state comes from NextAuth and carries the role.

Public pages render on the server for speed and search indexing. Interactive parts inside them are client components. Dashboards render on the client.

## Booking flow

The client never calculates money. Every figure comes from the API.

1. **Quote.** Dates, car id and trip type go to the API. It returns rental fee, deposit, service charge and total.
2. **Hold.** On accept the API creates a booking in `pending_payment` and returns a payment reference. Availability is held for 20 minutes.
3. **Pay.** Checkout hands off to the payment provider with that reference.
4. **Confirm.** The provider redirect is not proof of payment. Poll `['booking', id]` until the API reports `confirmed`, which happens when the webhook lands.
5. **Pickup.** Owner and renter upload photos and confirm the handover.
6. **Return.** Photos again, both confirm, the API releases the rental fee to the owner wallet.
7. **Settle.** If no damage claim is filed inside the window, the deposit returns to the renter.

Statuses: `pending_payment`, `confirmed`, `active`, `returned`, `settled`, `cancelled`, `disputed`. They live in `lib/constants.js`. `StatusTimeline` reads from the same list, so status handling stays in one place.

Three failures to handle on every screen that touches a booking:

- The webhook arrives late, so wait rather than error.
- The user closes the tab mid payment, so the trips page must let them resume.
- The hold expires, so checkout re-quotes instead of booking at a stale price.

## Photo check in

Photos are the evidence behind damage claims, so uploads have to survive a weak roadside connection. `useUpload` compresses in the browser, requests a signed URL, uploads straight to storage, shows per file progress and retries a single failed file rather than the batch.

The check in asks for a fixed set of angles: front, rear, both sides, dashboard, odometer, fuel gauge, and any existing damage. Both parties confirm before the booking status moves.

## Brand

| Token           | Value     | Used for                                    |
| --------------- | --------- | ------------------------------------------- |
| Burgundy        | `#6E1128` | Primary actions, active states, brand marks |
| Burgundy bright | `#9A1F38` | The same on dark backgrounds                |
| Burgundy tint   | `#F3E9EC` | Badges, selected rows                       |
| Ink             | `#141414` | Text, headers, navigation                   |
| Ink soft        | `#6B6763` | Secondary text                              |
| Canvas          | `#FAF9F7` | Page background                             |
| Surface         | `#FFFFFF` | Cards                                       |
| Line            | `#E4E0DC` | Borders                                     |
| Night           | `#0B0B0B` | Marketing pages                             |

Sora for headings, Public Sans for body. Burgundy is for actions only, never for large fills behind body text.

Manufacturer names in listings are fine. Manufacturer logos are trademarks and stay out unless you have written permission.

## Conventions

- No component calls the API directly. Calls go through a hook in `lib/queries`.
- Anything in `components/ui` knows nothing about cars or bookings.
- Validation schemas live in `lib/validators` and are shared between the form and the payload.
- Comments are short and precise.
- Money is formatted with `formatNaira` from `lib/format.js`, never by hand.
- Touch targets are at least 44px.

## Branching and commits

Branch from `main` as `feat/<short-name>`, `fix/<short-name>` or `chore/<short-name>`. Keep commit subjects in the imperative and under 72 characters. Run `npm run lint` and `npm run build` before opening a pull request.

## Open decisions

These are not settled yet, so check before building around them.

- Map provider, Google Maps or Mapbox.
- Whether owners stay in this app behind a role flag or move to a separate dashboard.
- Payment provider, Paystack or Flutterwave. Escrow, split payouts and refunds differ between them.
- Identity provider for BVN and NIN checks, and whether verification blocks booking or only self drive.
- How far offline support goes beyond queued uploads.
