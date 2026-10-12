# Electroma — Digital Electronics Store

Electroma is a Persian RTL digital electronics e-commerce storefront built with Next.js. The project focuses on a responsive shopping experience, reusable UI components, product discovery, and a consistent design system.

## Features

- **Persian RTL interface** with `lang="fa"` and `dir="rtl"`.
- **Light theme only**, with a consistent design system.
- **Responsive layouts** for mobile, tablet, and desktop.
- Product catalog, categories, search, filters, and sorting.
- Product detail pages with image galleries, specifications, and variant selection.
- Wishlist, product comparison, and shopping cart.
- Multi-step checkout flow with mock payment methods.
- Customer account pages, profile management, addresses, and order history.
- Authentication and verification flows using mock/local data.
- Form validation with React Hook Form and Zod.
- Reusable UI components based on shadcn/ui patterns and Radix UI.
- Toast notifications and user feedback.
- SEO metadata, page titles, and indexing controls for private routes.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui component patterns
- Radix UI
- Zustand
- Zod
- React Hook Form
- Sonner
- IRANSans typography

## Getting Started

### Prerequisites

- Node.js compatible with the project's Next.js version
- pnpm

### Installation

Clone or download the project, navigate to its root directory, and install the dependencies:

```bash
pnpm install
```

### Development Server

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Type Checking

```bash
pnpm typecheck
```

### Production Build

```bash
pnpm build
```

Use the scripts defined in `package.json` if their names differ from these examples.

## Project Scope and Limitations

Electroma is currently a **frontend demonstration using mock and local data**.

- No production backend or database is connected.
- Authentication and verification flows are simulated.
- Checkout and payment methods are demonstrational; no real payment gateway is connected.
- Orders, customer information, and other state depend on the implemented local/mock storage behavior.
- The project is not ready to process real customer orders or payments without backend integration and appropriate security measures.

## Design Principles

- Native RTL behavior throughout the application.
- Consistent typography, spacing, colors, and component styling.
- Reusable components and maintainable page architecture.
- Responsive and accessible interaction patterns.
- Avoid unnecessary redesigns or changes to established UI conventions.

## Development Notes

Before changing shared UI components or design tokens:

1. Inspect existing implementations and usage across the application.
2. Preserve working features and established design decisions.
3. Verify RTL behavior, keyboard interaction, and responsive layouts.
4. Run type checking and the production build after changes.
5. Test affected routes and interactions in a browser when possible.

## Status

The core Electroma storefront UI and customer-facing demonstration flows have been implemented. Further development can focus on verified UI refinements, testing, or a separately planned backend integration.