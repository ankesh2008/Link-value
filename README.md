# Link Value — CS Study Resource Hub

Link Value is a React single-page app for discovering computer science learning
resources, following a 72-week frontend learning roadmap, and tracking study
progress. Resources can be searched and filtered, and user changes are saved in
the browser.

> **Roadmap versus app features:** The roadmap contains topics and mini-project
> suggestions for learners. A topic appearing in the roadmap does not mean that
> the corresponding tutorial or mini-project is implemented as a feature in
> Link Value. The implemented app features and current limitations are listed
> below.

## How the app is put together

The browser first loads [`index.html`](https://github.com/ankesh2008/Link-value/blob/main/index.html), which
defines page metadata, the `root` element, and the React entry script.
[`src/main.jsx`](https://github.com/ankesh2008/Link-value/blob/main/src/main.jsx) mounts React and wraps the app in
the Redux store provider and API context provider.

[`src/App.jsx`](https://github.com/ankesh2008/Link-value/blob/main/src/App.jsx) is the central coordinator. It
selects the landing page or dashboard, reads shared state from Redux, and passes
data and event handlers to its child components.

| Area | Components and code |
| --- | --- |
| Landing page | [`Hero.jsx`](https://github.com/ankesh2008/Link-value/blob/main/src/components/Hero.jsx), [`Features.jsx`](https://github.com/ankesh2008/Link-value/blob/main/src/components/Features.jsx), [`CategoriesSection.jsx`](https://github.com/ankesh2008/Link-value/blob/main/src/components/CategoriesSection.jsx), [`StatsSection.jsx`](https://github.com/ankesh2008/Link-value/blob/main/src/components/StatsSection.jsx), [`CtaSection.jsx`](https://github.com/ankesh2008/Link-value/blob/main/src/components/CtaSection.jsx), and [`Footer.jsx`](https://github.com/ankesh2008/Link-value/blob/main/src/components/Footer.jsx) |
| Navigation | [`Navbar.jsx`](https://github.com/ankesh2008/Link-value/blob/main/src/components/Navbar.jsx) |
| Resource dashboard | [`Dashboard.jsx`](https://github.com/ankesh2008/Link-value/blob/main/src/components/Dashboard.jsx) composes [`Sidebar.jsx`](https://github.com/ankesh2008/Link-value/blob/main/src/components/Sidebar.jsx) and a grid of [`ResourceCard.jsx`](https://github.com/ankesh2008/Link-value/blob/main/src/components/ResourceCard.jsx) cards |
| Resource and account forms | [`AddResourceModal.jsx`](https://github.com/ankesh2008/Link-value/blob/main/src/components/AddResourceModal.jsx) and [`AuthModal.jsx`](https://github.com/ankesh2008/Link-value/blob/main/src/components/AuthModal.jsx) |
| Redux state | [`store.js`](https://github.com/ankesh2008/Link-value/blob/main/src/store/store.js) configures the Redux store. [`appSlice.js`](https://github.com/ankesh2008/Link-value/blob/main/src/store/appSlice.js) contains shared state, actions, reducers, selectors, and resource-persistence middleware. |
| API and browser storage | [`ApiContext.jsx`](https://github.com/ankesh2008/Link-value/blob/main/src/context/ApiContext.jsx) provides API requests; [`storage.js`](https://github.com/ankesh2008/Link-value/blob/main/src/utils/storage.js) loads, migrates, and saves resource data. |
| Resource content | [`initialResources.json`](https://github.com/ankesh2008/Link-value/blob/main/src/data/initialResources.json) contains starting resources. [`curriculumResources.json`](https://github.com/ankesh2008/Link-value/blob/main/src/data/curriculumResources.json) contains the 12 roadmap modules. |
| Styling | [`index.css`](https://github.com/ankesh2008/Link-value/blob/main/src/index.css) defines global styles and theme tokens. The app and components also have focused stylesheets, including [`App.css`](https://github.com/ankesh2008/Link-value/blob/main/src/App.css), [`Dashboard.css`](https://github.com/ankesh2008/Link-value/blob/main/src/components/Dashboard.css), and [`ResourceCard.css`](https://github.com/ankesh2008/Link-value/blob/main/src/components/ResourceCard.css). |

## Implemented features

- Browse the landing page and move to the resource dashboard.
- Explore resources in **Core CS**, **AI/ML**, **Web Dev**, **Academics**, and
  **Learning Roadmap** categories.
- Search resource titles, descriptions, categories, study periods, and tags;
  filter by category, study period, or tag.
- Add resources with a title, URL, category, study period, status, tags, and
  description; delete resources; and cycle status through **To Read**,
  **In Progress**, and **Mastered**.
- Save resource changes in browser `localStorage`. Existing data is migrated
  from earlier storage versions, with roadmap resources added when needed.
- Use login and sign-up forms with client-side validation and API error
  handling. Authentication requires an external backend; this repository does
  not include one.
- Use the responsive React interface, built with reusable components and
  styled with CSS.

## Curriculum roadmap and what the app demonstrates

The app includes 12 curriculum modules in
[`curriculumResources.json`](https://github.com/ankesh2008/Link-value/blob/main/src/data/curriculumResources.json). Together they cover
the following topics and suggested projects:

| Weeks | Roadmap content |
| --- | --- |
| 1–6 | HTML5 structure and semantic tags, accessibility basics, CSS3, the box model, Flexbox, Grid, responsive design, media queries, mobile-first layouts; mini-project: static responsive landing page |
| 7–12 | JavaScript variables, functions, arrays, objects, loops, browser DevTools, VS Code, Git/GitHub; landing-page project practice |
| 13–18 | ES6+, modules, Promises, async/await, Fetch, DOM events, browser storage, JSON, and forms; mini-project: interactive to-do app |
| 19–24 | React setup with Vite or CRA, events, forms, controlled components; mini-project: counter or product card |
| 25–30 | React, JSX, components, props, state, lists, and conditional rendering |
| 31–36 | React hooks, composition, reusable UI, custom hooks, lifting state, and prop drilling; mini-project: weather app or notes app |
| 37–42 | React Router, nested and dynamic routes, route parameters, protected routes, and 404 pages; project-based evaluation |
| 43–48 | Navigation layouts and SPA page structure; mini-project: portfolio with routing |
| 49–54 | Context API, state architecture, global versus local state, Redux Toolkit or Zustand, asynchronous loading and errors; mini-project: cart or dashboard |
| 55–60 | React forms, validation strategies, and reusable inputs |
| 61–66 | Modals, tabs, dropdowns, toast notifications, search/filter/sort; mini-project: validated registration form |
| 67–72 | REST APIs, loading/retry/error handling, pagination, infinite scroll, debounce, CRUD, and third-party APIs; mini-project: movie search or GitHub profile viewer |

### Related skills used in the app

- **HTML and accessibility:** JSX renders semantic elements such as `nav`,
  `main`, `section`, `aside`, `article`, and `footer`. Search has an accessible
  label, the authentication panel has dialog semantics, and global styles
  include visible keyboard focus and reduced-motion support.
- **CSS:** Shared variables define colors, typography, spacing, and other theme
  values. The styles use the CSS box model, Flexbox, Grid, responsive
  breakpoints, and media queries.
- **JavaScript and ES modules:** The source uses variables, functions, arrays,
  objects, iteration, imports/exports, arrow functions, destructuring, spread
  syntax, and event handlers.
- **React:** Components render lists and conditional UI. `useState` manages
  local form and modal state; `useEffect` handles navbar scroll state. The
  project uses reusable components and passes data and callbacks through props.
- **Shared state:** Redux Toolkit manages resource and explorer state.
  Memoized selectors derive filtered resources and category counts. React
  Context provides the API request helper.
- **Forms and async requests:** Resource and authentication forms use
  controlled inputs. The authentication form uses `async`/`await` and Fetch
  through the shared API context, with validation, submission state, and
  visible errors.
- **Browser storage and JSON:** Initial resource data is supplied as JSON.
  Resource state is persisted in `localStorage` and older saved data is
  migrated.
- **Responsive interface:** CSS media queries adapt the landing page, dashboard,
  and component layouts for narrower screens.

### Topics from the curriculum that are not app features

The app does **not** currently use React Router; its home/dashboard navigation
is conditional rendering in `App.jsx`. There are no route parameters, protected
routes, or 404 route. The app also does not implement `useRef`, React's
`useMemo`/`useCallback`, custom hook logic beyond the `useApi` context hook,
toasts, tabs, sorting, pagination, infinite scrolling, debounced search, retry
logic, or movie/GitHub profile viewers. Those are roadmap topics or project
ideas, not current Link Value functionality.

The source uses Git and can be edited in VS Code, but those are development
tools rather than features in the running application.

## Technology stack

- React 18 and JSX
- Vite for local development and production builds
- Redux Toolkit and React Redux for shared app state
- React Context and Fetch for API requests
- CSS and Lucide React icons
- Browser `localStorage` for resource persistence

Dependency and script definitions are in [`package.json`](https://github.com/ankesh2008/Link-value/blob/main/package.json).

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (typically `http://localhost:5173`).

Create a production build with:

```bash
npm run build
```

## Authentication API configuration

The login and sign-up forms send JSON requests to:

- `POST /api/auth/login` with `{ "email", "password" }`
- `POST /api/auth/signup` with `{ "name", "email", "password" }`

Set `VITE_API_BASE_URL` in a local `.env` file to the API server's base URL.
Successful responses should contain a `user` object, for example:
`{ "user": { "name": "Ada", "email": "ada@example.com" } }`. API errors are
shown in the form. No authentication backend is included in this project.
