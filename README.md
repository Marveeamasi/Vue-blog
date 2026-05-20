# Edy's Blog

A simple blog application built with **Vue 3** and **Vue Router**, fetching posts from the [api.oluwasetemi.dev](https://api.oluwasetemi.dev) REST API.

---

## What I Built

- **Home Page** — displays a paginated list of blog posts fetched from `GET /posts`. Each post shows a title and excerpt with a link to its detail page. Includes a search bar that queries the API using the `search` parameter.
- **Post Detail Page** — fetches and displays the full content of a single post from `GET /posts/{id}`. Includes a back button and a link to return home.
- **404 Page** — a fallback page rendered for any route that does not exist, using Vue Router's catch-all route (`/:pathMatch(.*)*`).

---

## Key Features

| Feature | How it's implemented |
|---|---|
| **Vue Router** | `createWebHistory` with named routes and a catch-all 404 |
| **Lazy Loading** | All route components use dynamic `import()` so chunks load on demand |
| **Suspense** | Wraps `<RouterView>` in `<Suspense>` with a spinner fallback shown while route chunks load |
| **Error Boundary** | A custom `ErrorBoundary.vue` component using `onErrorCaptured` catches runtime errors in the component tree and shows a recovery UI |
| **API composables** | `usePosts()` and `usePost()` in `src/composables/usePosts.js` handle all fetch logic, loading state, and error state |
| **Skeleton loading** | `SkeletonCard.vue` renders shimmer placeholders while posts are being fetched |
| **Pagination** | Controlled via `meta` returned by the API (`page`, `totalPages`, `hasNextPage`, `hasPreviousPage`) |

---

## API Endpoints Used

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/posts` | Fetch paginated list of posts |
| `GET` | `/posts/{id}` | Fetch a single post by ID |

---

## Project Structure

```
src/
├── main.js                  # App entry point
├── App.vue                  # Root component (Suspense + ErrorBoundary)
├── router/index.js          # Route definitions with lazy loading
├── composables/usePosts.js  # API fetch logic
├── components/
│   ├── AppNavbar.vue
│   ├── AppFooter.vue
│   ├── ErrorBoundary.vue
│   ├── PostCard.vue
│   ├── SkeletonCard.vue
│   └── PaginationControls.vue
├── views/
│   ├── HomeView.vue         # Post listing page
│   ├── PostDetailView.vue   # Single post page
│   └── NotFoundView.vue     # 404 page
└── assets/main.css          # All styles
```

---

## Running Locally

```bash
npm install
npm run dev
```

## Building for Production

```bash
npm run build
```

The `vercel.json` files are included so the app routes correctly when hosted on Vercel
