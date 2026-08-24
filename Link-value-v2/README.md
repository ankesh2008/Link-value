# 📚 linkvalue — Simple React Resource Hub

**linkvalue** is a clean, minimal, and beginner-friendly React application designed for college project presentations. It focuses strictly on core React principles: component architecture, props, state, array methods (`.map()`, `.filter()`), event handling, and pure CSS3 styling.

---

## 🌟 Refactored & Simplified Features

- 📑 **Clean Resource Cards**: Displays **Title**, **Short Description**, **Category Badge**, and an **Open Resource** button.
- 🎯 **Simple Category Filtering**: Filter links by domain (**Core CS**, **Web Dev**, **AI & ML**, **Academics**, or **All**).
- 🔍 **Basic Search**: Instant search matching titles, categories, and descriptions without tags or complex regex.
- 📦 **In-Memory JavaScript Array**: Uses a plain JavaScript data array in React state (`useState`) without `localStorage` or `JSON.stringify`/`parse`.
- ⚛️ **Pure React Basics**: Built strictly using `useState`, Props, `.map()`, `.filter()`, and basic event handlers (`onClick`, `onChange`, `onSubmit`).
- 🎨 **Minimal Pure CSS3**: Clean, unbloated stylesheet with **Roboto Condensed** typography, simple borders, and responsive grid (no Tailwind, glassmorphism, or heavy animations).

---

## 📁 Component Architecture (4 Core Components)

```
src/
├── main.jsx                     # Entry point (React 18 createRoot)
├── index.css                    # Base CSS variables & font styling
├── App.jsx                      # Main container component (State & Filter logic)
├── App.css                      # Simplified stylesheet (Navbar, Sidebar, Card Grid)
├── data/
│   └── resources.js             # Initial JavaScript array of resources
└── components/
    ├── Navbar.jsx               # Header with brand title & search input
    ├── Sidebar.jsx              # Category navigation with count badges
    ├── ResourceCard.jsx         # Card displaying title, desc, category & link
    └── AddResourceModal.jsx     # Simple modal form to add a resource
```

---

## 🛠️ Code Breakdown for College Presentation

### 1. Simple State Management (`src/App.jsx`)
```javascript
// State initialized directly with plain JavaScript data array
const [resources, setResources] = useState(INITIAL_RESOURCES);
const [selectedCategory, setSelectedCategory] = useState('All');
const [searchQuery, setSearchQuery] = useState('');
```

### 2. Filtering with `.filter()` (`src/App.jsx`)
```javascript
const filteredResources = resources.filter((item) => {
  const matchCategory = selectedCategory === 'All' || item.category === selectedCategory;
  const matchSearch =
    !searchQuery.trim() ||
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase());

  return matchCategory && matchSearch;
});
```

### 3. Rendering Lists with `.map()` (`src/App.jsx`)
```javascript
{filteredResources.map((resource) => (
  <ResourceCard
    key={resource.id}
    resource={resource}
    onDelete={handleDeleteResource}
  />
))}
```

---

## 🚀 How to Run Locally

1. **Install Dependencies**: `npm install`
2. **Start Dev Server**: `npm run dev`
3. **Open Browser**: `http://localhost:3000/`
4. **Build Production Version**: `npm run build`
# Link-value
