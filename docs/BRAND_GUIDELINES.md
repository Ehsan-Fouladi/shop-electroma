# BRAND GUIDELINES

## Digital Electronics E-Commerce

---

# 1. Purpose

This document defines the visual identity, UX principles, UI rules, technical conventions, architecture principles, and implementation standards for this project.

This is a Persian RTL digital electronics e-commerce website.

The project is intended to be:

* Professional
* Modern
* Trustworthy
* Technology-oriented
* Fast and easy to navigate
* Responsive
* SEO-friendly
* Accessible
* Maintainable
* Easy for another developer to understand and continue

This project is currently **UI/UX only**.

There is no real backend, API, authentication system, payment gateway, or real business logic at this stage.

The architecture must, however, remain compatible with future backend integration.

---

# 2. Reference Websites

The primary visual and UX references are:

### Primary Reference 1

Technolife:

https://www.technolife.com/

### Primary Reference 2

SnappShop:

https://snappshop.ir/

Digital category:

https://snappshop.ir/category/digital

These websites should be studied for:

* Information architecture
* E-commerce UX
* Header and navigation
* Search experience
* Category organization
* Product discovery
* Product cards
* Filtering
* Sorting
* Product detail structure
* Promotional sections
* Trust elements
* Account experience
* Mobile behavior
* Overall shopping flow

## IMPORTANT

The project must NOT copy these websites.

Do not reproduce their:

* exact layouts
* exact components
* exact spacing
* exact colors
* exact typography
* exact visual identity
* exact content
* exact page composition

Instead, use them as UX and product-design references.

The final product must have its own visual identity and implementation.

The goal is:

**Inspired by the strengths of Technolife + SnappShop, but designed as an original product.**

---

# 3. Product Direction

The website is focused specifically on digital and electronic products.

Primary categories may include:

* Smartphones
* Laptops
* Tablets
* Smartwatches
* Headphones
* Earbuds
* Speakers
* Monitors
* Computer accessories
* Gaming
* Cameras
* Storage
* Power banks
* Chargers
* Cables
* Networking equipment
* Smart home products
* Other digital accessories

The UI should feel appropriate for a serious technology retailer.

The visual language should communicate:

* Trust
* Product quality
* Technical expertise
* Modern technology
* Price transparency
* Easy comparison
* Fast product discovery

---

# 4. Visual Direction

The overall visual direction is:

**Modern + Clean + Premium + Technology-focused + Trustworthy**

The design should not feel:

* overly colorful
* childish
* unnecessarily futuristic
* visually noisy
* overly decorative
* like a generic dashboard

The interface should prioritize product discovery and shopping.

Products remain the visual focus.

---

# 5. Color System

The project uses a blue-led visual identity.

All custom colors MUST be defined centrally in CSS.

Primary location:

```text
src/app/globals.css
```

Do NOT scatter custom HEX colors throughout components.

Avoid:

```tsx
bg-[#2563EB]
text-[#0F172A]
border-[#E2E8F0]
```

when a semantic token already exists.

Tailwind should consume semantic CSS variables.

The purpose is to make future rebranding easy.

---

## Primary Colors

```css
--color-primary: #2563EB;
--color-primary-hover: #1D4ED8;
--color-primary-active: #1E40AF;
--color-primary-soft: #EFF6FF;
--color-primary-subtle: #DBEAFE;
```

---

## Success

```css
--color-success: #16A34A;
--color-success-soft: #F0FDF4;
```

---

## Warning

```css
--color-warning: #D97706;
--color-warning-soft: #FFFBEB;
```

---

## Error

```css
--color-error: #DC2626;
--color-error-soft: #FEF2F2;
```

---

## Sale / Discount

Red may be used for:

* Discounts
* Sale labels
* Limited offers
* Price reductions

Use it carefully.

Do not make the entire interface red.

---

## Background

```css
--color-background: #FFFFFF;
--color-background-secondary: #F8FAFC;
--color-background-subtle: #F1F5F9;
```

---

## Text

```css
--color-text-primary: #0F172A;
--color-text-secondary: #334155;
--color-text-muted: #64748B;
--color-text-disabled: #94A3B8;
```

---

## Borders

```css
--color-border: #E2E8F0;
--color-border-strong: #CBD5E1;
--color-border-subtle: #F1F5F9;
```

---

# 6. HEX Color Requirement

All custom color tokens must use HEX values.

Do not introduce arbitrary RGB/HSL colors for custom design tokens unless technically required by a third-party library.

Do not create duplicate color definitions.

If a new color is genuinely necessary:

1. Add it to the central CSS token system.
2. Give it a semantic name.
3. Use that semantic token throughout the project.

---

# 7. Light Mode

The entire project is **LIGHT MODE ONLY**.

There is no dark mode.

Do NOT implement:

* dark theme
* theme switcher
* dark-mode CSS variables
* theme toggle
* unnecessary next-themes integration

The interface should be designed specifically for the light visual system.

---

# 8. Typography

Use:

**IRANSans**

The font must be self-hosted.

Preferred weights:

* Regular
* Medium
* Bold

Typography should be centralized.

Avoid arbitrary font sizes throughout components.

Use a consistent hierarchy:

* Display
* H1
* H2
* H3
* Body
* Body Small
* Caption
* Label
* Price

Typography must remain readable in Persian RTL.

---

# 9. Language and Direction

The application is Persian.

Use:

```html
<html lang="fa" dir="rtl">
```

RTL must be treated as a first-class requirement.

Do not build the interface LTR-first and fix RTL later.

Use CSS logical properties whenever possible.

Prefer:

```css
margin-inline
padding-inline
inset-inline-start
inset-inline-end
border-inline
```

instead of unnecessary:

```css
margin-left
margin-right
padding-left
padding-right
left
right
```

---

# 10. Responsive Design

Responsive design is mandatory.

The UI must be intentionally designed for:

* 320px
* 360px
* 390px
* 430px
* 768px
* 1024px
* 1280px
* 1440px
* 1920px

Do not simply scale the desktop layout down.

Mobile should have deliberate UX decisions.

Pay special attention to:

* Header
* Search
* Navigation
* Product cards
* Product filters
* Product gallery
* Product variants
* Product comparison
* Cart
* Checkout
* Account panel
* Tables
* Forms
* Dialogs
* Drawers
* Horizontal product lists

---

# 11. Layout System

The layout should use a consistent container system.

Avoid creating different arbitrary widths for every page.

Use reusable layout primitives.

Examples:

* Page container
* Section container
* Content wrapper
* Full-width section
* Grid wrapper

Spacing should follow a consistent scale.

Do not randomly use different spacing values throughout the application.

---

# 12. Border Radius

Use a consistent radius system.

Possible semantic tokens:

```css
--radius-sm
--radius-md
--radius-lg
--radius-xl
```

Avoid excessive rounding.

The visual language should feel like a professional technology marketplace rather than a playful application.

---

# 13. Shadows

Use shadows carefully.

Preferred hierarchy:

* subtle shadow
* card shadow
* elevated shadow
* modal shadow

Do not make every card heavily shadowed.

Use borders and background contrast where appropriate.

---

# 14. UI Foundation

The primary UI foundation MUST be:

https://ui.shadcn.com/

Use shadcn/ui for standard interface primitives.

Use Radix primitives through shadcn/ui where appropriate.

Common primitives may include:

* Button
* Input
* Select
* Checkbox
* Radio Group
* Dialog
* Sheet
* Dropdown Menu
* Tabs
* Accordion
* Tooltip
* Popover
* Card
* Badge
* Separator
* Skeleton
* Pagination
* Breadcrumb
* Alert
* Toast/Sonner

Do not build custom replacements for standard UI primitives when shadcn/ui already provides an appropriate solution.

However, domain-specific components must remain custom.

Examples:

* ProductCard
* ProductGallery
* ProductVariantSelector
* ProductSpecifications
* CartSummary
* CheckoutForm
* AccountSidebar

---

# 15. Component Architecture

Components are a core requirement.

Do not build huge page components.

Pages should compose smaller, meaningful components.

For example:

```text
Product Page
│
├── Product Gallery
├── Product Information
│   ├── Product Title
│   ├── Product Rating
│   ├── Product Price
│   ├── Product Variant Selector
│   └── Product Actions
│
├── Delivery Information
├── Technical Specifications
├── Description
├── Reviews
└── Related Products
```

Each component should have a clear responsibility.

Avoid:

```text
MegaProductPage.tsx
```

containing the entire product experience.

---

# 16. Project Architecture

The architecture must be professional but easy to understand.

Do NOT use an unnecessarily complex architecture.

## Do NOT create:

```text
src/features/
```

The project does not use feature-based architecture.

Instead use:

```text
src/
├── app/
│   ├── (shop)/
│   ├── (auth)/
│   ├── account/
│   ├── admin/
│   ├── blog/
│   ├── cart/
│   ├── category/
│   ├── checkout/
│   ├── compare/
│   ├── products/
│   ├── search/
│   ├── support/
│   └── ...
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── navigation/
│   ├── product/
│   ├── category/
│   ├── cart/
│   ├── checkout/
│   ├── account/
│   ├── blog/
│   ├── support/
│   └── admin/
│
├── data/
│   ├── products/
│   ├── categories/
│   ├── brands/
│   ├── orders/
│   ├── users/
│   ├── reviews/
│   └── blog/
│
├── hooks/
│
├── lib/
│   ├── utils/
│   ├── validations/
│   ├── formatters/
│   └── constants/
│
├── store/
│
├── types/
│
└── config/
```

---

# 17. Architecture Responsibilities

## `app/`

Contains:

* routes
* pages
* layouts
* loading states
* error states
* route-level composition

Pages should not contain unnecessary reusable UI implementation.

---

## `components/ui/`

Contains shadcn/ui components and small project-specific adaptations.

---

## `components/layout/`

Contains:

* Header
* Footer
* Main layout
* Page shell
* Container
* Section wrappers
* Breadcrumb layout

---

## `components/navigation/`

Contains:

* Main navigation
* Mega menu
* Mobile navigation
* Search navigation
* Account navigation

---

## `components/product/`

Contains reusable product-related UI.

Examples:

```text
product-card.tsx
product-gallery.tsx
product-price.tsx
product-rating.tsx
product-variant-selector.tsx
product-specifications.tsx
product-actions.tsx
```

---

## `components/cart/`

Examples:

```text
cart-item.tsx
cart-list.tsx
cart-summary.tsx
cart-empty.tsx
cart-drawer.tsx
```

---

## `components/checkout/`

Examples:

```text
checkout-form.tsx
address-form.tsx
shipping-method.tsx
payment-method.tsx
order-summary.tsx
```

---

## `components/account/`

Examples:

```text
account-sidebar.tsx
profile-form.tsx
address-card.tsx
order-card.tsx
notification-item.tsx
wallet-card.tsx
```

---

## `data/`

Contains centralized mock data.

Large mock-data structures must not be scattered across pages.

---

## `hooks/`

Contains reusable React hooks.

Do not create hooks for trivial one-line abstractions.

---

## `lib/`

Contains reusable non-UI logic:

* utilities
* formatters
* validation
* constants

---

## `store/`

Contains Zustand stores.

Only genuinely shared client state should live here.

---

## `types/`

Contains shared TypeScript types.

---

## `config/`

Contains project-level configuration.

---

# 18. No Over-Engineering

The architecture must remain understandable.

Do NOT introduce unnecessary:

* service layers
* repository patterns
* dependency injection
* factories
* providers
* abstraction layers
* design patterns
* state management
* custom frameworks

unless the project genuinely requires them.

The developer should be able to quickly answer:

**Where is the route?**

`app/`

**Where is the reusable component?**

`components/`

**Where is the mock data?**

`data/`

**Where is shared client state?**

`store/`

**Where are shared types?**

`types/`

**Where are utilities?**

`lib/`

**Where are visual tokens?**

`app/globals.css`

This clarity is a core requirement.

---

# 19. Authentication Architecture

Authentication must be architecturally separated from the Shop.

Use a dedicated route group:

```text
src/app/(auth)/
```

Authentication pages include:

```text
login
register
verify
forgot-password
reset-password
```

Auth UI must not be mixed with Shop page implementation.

At this stage authentication is UI only.

Do not implement:

* real authentication
* sessions
* OAuth
* backend authentication
* password storage
* real verification
* API authentication

The UI should simply be prepared for future implementation.

---

# 20. Customer Account / User Panel

The customer account area is separate from authentication.

Authentication answers:

**Who are you / sign in or register?**

Account answers:

**What can you do after signing in?**

Use:

```text
src/app/account/
```

The Account area should contain the customer dashboard and customer-related pages.

Examples:

```text
/account
/account/orders
/account/orders/[id]
/account/tracking
/account/returns
/account/addresses
/account/profile
/account/security
/account/notifications
/account/wallet
/account/coupons
/account/reviews
/account/questions
/account/recently-viewed
```

The Account panel should use the same visual language as the Shop but have its own dashboard-oriented layout.

It should include reusable components such as:

* Account sidebar
* Account header
* Profile card
* Order card
* Order status
* Address card
* Wallet card
* Notification item
* Review item

The account UI should feel like part of the same product, not like a completely different application.

---

# 21. Admin Panel

The Admin Panel is separate from both Shop and Customer Account.

Use:

```text
src/app/admin/
```

The admin interface may later include:

* Dashboard
* Products
* Categories
* Brands
* Inventory
* Orders
* Customers
* Discounts
* Campaigns
* Reviews
* Questions
* Blog
* Media
* Support
* Notifications
* Settings
* Analytics
* SEO
* Activity

The current project only needs the UI.

Do not implement real admin authorization or backend functionality.

---

# 22. Shop Architecture

The Shop is the customer-facing commerce experience.

The Shop should include routes such as:

```text
/
 /products
 /category/[slug]
 /category/[category]/[subcategory]
 /search
 /brands
 /brand/[slug]
 /collections
 /collections/[slug]
 /sale
 /deals
 /product/[slug]
 /compare
 /wishlist
 /cart
 /checkout
```

Use the UI specification as the source of truth for the complete route list.

---

# 23. Product Card

Product cards are one of the most important components.

They should support appropriate combinations of:

* Product image
* Brand
* Product title
* Rating
* Review count
* Current price
* Previous price
* Discount
* Stock state
* Sale badge
* Quick actions
* Wishlist
* Compare
* Quick add where appropriate

Do not overload every card with every possible action.

The card should remain readable and visually balanced.

---

# 24. Product Detail

Product detail should support:

* Image gallery
* Product title
* Brand
* Rating
* Review count
* Price
* Discount
* Variant selection
* Storage
* Color
* Model
* Availability
* Seller information where appropriate
* Delivery information
* Purchase actions
* Highlights
* Technical specifications
* Description
* Reviews
* Questions
* Related products
* Frequently bought together

Technical specifications are particularly important for electronics.

---

# 25. Product Comparison

Comparison is a core electronics-shopping feature.

The UI should support comparison of products based on technical specifications.

Examples:

* Display
* CPU
* RAM
* Storage
* Camera
* Battery
* Dimensions
* Weight
* Connectivity
* Operating system

Comparison should remain readable on desktop and mobile.

---

# 26. Filtering and Search

Product discovery is a major UX priority.

Filtering may include:

* Category
* Brand
* Price
* Availability
* Rating
* Discount
* Technical specifications
* Color
* Storage
* RAM
* Screen size
* Connectivity
* Other category-specific attributes

Filters should be appropriate to the product category.

Do not show irrelevant filters.

Search should support:

* Search input
* Suggestions
* Recent searches
* Popular searches
* Product results
* Category results
* Brand results
* No-result state

---

# 27. Navigation

Navigation must prioritize product discovery.

Desktop navigation may include:

* Logo
* Search
* Account
* Cart
* Main categories
* Mega menu
* Promotional links where appropriate

Mobile navigation should be redesigned intentionally rather than simply collapsing desktop navigation.

---

# 28. Homepage

The homepage should combine the strengths of the references while remaining original.

Possible sections include:

* Hero
* Main categories
* Featured categories
* Flash sale
* Best sellers
* New arrivals
* Popular products
* Featured brands
* Promotional banners
* Product collections
* Editorial content
* Buying guides
* Trust section
* Blog preview

Do not blindly reproduce the homepage structure of Technolife or SnappShop.

Use their successful UX patterns as inspiration and create a distinct composition.

---

# 29. Footer

Footer should provide:

* Brand information
* Customer service
* Shopping links
* Important categories
* Support links
* Legal links
* Contact information
* Social links where appropriate
* Trust/security elements
* Required Iranian e-commerce trust marks where applicable

Do not add fake certifications.

Use realistic placeholders only when required by the UI.

---

# 30. SEO

SEO is a core requirement.

Use:

* Semantic HTML
* Correct heading hierarchy
* Meaningful page titles
* Metadata
* Description
* Canonical URLs where appropriate
* Open Graph metadata
* Product metadata
* Structured data where appropriate
* Crawlable links
* SEO-friendly URL structure
* Breadcrumbs
* Descriptive image alt text

Product pages should be designed so they can later support structured product data.

Category pages should have meaningful semantic structure.

Blog and editorial content should be SEO-friendly.

Do not implement fake SEO data.

---

# 31. Accessibility

The interface should follow accessibility best practices.

Pay attention to:

* Keyboard navigation
* Focus states
* Visible focus indicators
* Semantic HTML
* Form labels
* Accessible names
* ARIA only where necessary
* Sufficient contrast
* Touch target sizes
* Screen-reader-friendly structure

Target WCAG AA-level contrast where applicable.

---

# 32. Images

Use appropriate image handling.

Product images should:

* preserve aspect ratio
* avoid unexpected layout shifts
* use appropriate object-fit behavior
* have meaningful alt text
* work correctly on mobile

Do not use images merely as decorative backgrounds when semantic images are more appropriate.

---

# 33. Motion

Motion should be subtle and purposeful.

Use animation for:

* feedback
* state transitions
* navigation
* dialogs
* drawers
* loading
* hover interactions

Avoid excessive animation.

Respect reduced-motion preferences.

---

# 34. Forms

Forms should use:

* clear labels
* appropriate input types
* validation
* error states
* loading states
* success states
* accessible messages

Use Zod for schema validation where appropriate.

Do not implement backend submission.

---

# 35. State Management

Use Zustand 5.0.0 only where shared client-side state is genuinely needed.

Potential stores:

```text
cart-store
wishlist-store
compare-store
recently-viewed-store
```

Do not create a global store for every UI interaction.

Use local React state for local interactions.

---

# 36. Mock Data

The project must use realistic centralized mock data.

Mock data should represent realistic electronics products.

For example:

* Apple
* Samsung
* Xiaomi
* Lenovo
* ASUS
* HP
* Sony
* Anker
* JBL
* Huawei

Use realistic product structures and technical specifications.

Do not rely on meaningless placeholder text such as:

```text
Product 1
Product 2
Test Product
Lorem ipsum
```

The interface should look like a real electronics store.

---

# 37. Future Backend Compatibility

Although the current project has no backend, the frontend architecture should make future integration straightforward.

Avoid coupling UI components directly to imaginary API implementations.

For example:

```text
UI
 ↓
Typed data model
 ↓
Mock data now
 ↓
API/backend later
```

The goal is that replacing mock data with real API data later should not require rewriting the entire UI.

---

# 38. Code Quality

Use clean, maintainable TypeScript/React code.

Follow:

* Single Responsibility Principle
* meaningful naming
* small focused components
* reusable components
* strict typing
* minimal duplication
* predictable folder structure
* clear imports
* appropriate Server/Client boundaries

Avoid:

* giant files
* duplicated components
* duplicated constants
* unnecessary abstractions
* `any`
* deeply nested component structures
* unclear naming
* magic values
* scattered custom colors

Code should be understandable by a developer who did not create the project.

---

# 39. Next.js Architecture

Use Next.js 16.3.6.

Use the App Router.

Server Components should be the default.

Use Client Components only where interaction requires them.

Examples:

Client Components may be appropriate for:

* filters
* product gallery interactions
* carousels
* drawers
* forms
* interactive comparison
* Zustand consumers
* browser APIs

Do not mark entire pages as Client Components without a reason.

---

# 40. Required Technology Stack

The project should use:

```text
Next.js: 16.3.6
React: 19.3.0
TypeScript: 7.x
Tailwind CSS: 4.3.3
Zod: 4.6.5
Zustand: 5.0.0
Radix UI: 1.6.7
shadcn/ui
```

Additional dependencies should only be introduced when there is a real requirement.

Before changing dependencies:

1. Inspect `package.json`.
2. Inspect the lockfile.
3. Determine what is already installed.
4. Avoid unnecessary upgrades.
5. Avoid unnecessary packages.

---

# 41. Tailwind CSS

Use Tailwind CSS 4.3.3.

Tailwind should consume the project's semantic CSS variables.

Do not create a second independent design-token system inside Tailwind.

Custom design values belong in the centralized CSS token system.

Tailwind is responsible for applying those tokens consistently.

---

# 42. CSS Architecture

Primary global design tokens:

```text
src/app/globals.css
```

This file should contain centralized values for:

* Colors
* Typography tokens
* Radius
* Shadows
* Spacing where appropriate
* Other global visual tokens

Do not scatter project-wide visual constants across unrelated files.

---

# 43. Dependency Discipline

Do not add a package simply because it makes one small task easier.

Before adding a dependency ask:

1. Is it necessary?
2. Does Next.js already provide this?
3. Does React already provide this?
4. Does shadcn/ui already solve it?
5. Can it be solved cleanly with existing utilities?

Keep the dependency tree lean.

---

# 44. Design System Consistency

All components must feel like part of the same system.

Maintain consistency in:

* Buttons
* Inputs
* Cards
* Badges
* Borders
* Radius
* Typography
* Spacing
* Icons
* Shadows
* States
* Error messages
* Loading states

Do not create visually different versions of the same UI element without a genuine reason.

---

# 45. Loading / Empty / Error States

Every major data-driven UI should consider:

* Loading
* Empty
* Error
* Success
* Disabled

Examples:

* Empty cart
* Empty wishlist
* No search results
* No comparison products
* No orders
* Product unavailable
* Failed form state
* Loading product cards
* Loading account data

These states should use the same design system.

---

# 46. No Backend

This project is UI/UX only.

Do NOT implement:

* database
* API server
* real authentication
* payment gateway
* real order processing
* real inventory
* real email
* real SMS
* real backend authorization

Use realistic UI states and mock data instead.

---

# 47. Originality

The project is inspired by Technolife and SnappShop.

It must NOT become a clone.

Use references to understand:

* what information users need
* how electronics stores organize products
* how filtering works
* how product discovery works
* how promotions are presented
* how shopping flows work

Then create an original visual and structural implementation.

---

# 48. Development Principle

The project should be built incrementally.

Do not implement the entire application in one giant step.

Recommended order:

### Phase 1

Foundation:

* Architecture
* Global CSS
* Tokens
* Typography
* RTL
* Light mode
* shadcn/ui
* Core layout
* Navigation foundation
* Base components

### Phase 2

Core Shop:

* Homepage
* Product listing
* Category
* Search
* Product detail
* Cart
* Checkout

### Phase 3

Customer:

* Auth UI
* Account dashboard
* Orders
* Addresses
* Profile
* Wishlist
* Compare
* Notifications

### Phase 4

Discovery & Content:

* Brands
* Collections
* Deals
* Sale
* Blog
* Buying guides
* Reviews
* Glossary

### Phase 5

Support:

* FAQ
* Shipping
* Returns
* Warranty
* Contact
* About
* Legal pages

---

# 49. Final Principle

The most important principle of this project is:

> Build a professional, original Persian electronics e-commerce experience inspired by the best UX patterns of Technolife and SnappShop, while keeping the codebase simple, structured, maintainable, and understandable enough that another developer can confidently continue the project manually.

The project should be:

**Clean UI + Strong UX + Clear Architecture + Reusable Components + Centralized Design Tokens + SEO + Responsive RTL + Maintainable Code.**
