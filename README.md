# Consulting Packages Manager

A modern React application for managing and exploring consulting packages. Built with React, Vite, and modern web technologies.

## Features

- **Package Discovery**: Browse and search through consulting packages with advanced filtering
- **Category Filtering**: Filter packages by industry categories
- **Favorites System**: Save packages to favorites with localStorage persistence
- **Package Comparison**: Compare packages side-by-side with detailed information
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Search**: Debounced search with instant results
- **Sorting & Filtering**: Sort packages by name with visual indicators

## Technology Stack

- **React 18**: Modern React with functional components and hooks
- **React Router**: Client-side routing and navigation
- **Vite**: Fast build tool and development server
- **Context API**: Global state management
- **Custom Hooks**: Reusable logic for data fetching and filtering
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **LocalStorage**: Client-side persistence for favorites

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── CategoryFilter.jsx
│   ├── EmptyState.jsx
│   ├── FavoriteButton.jsx
│   ├── LoadingState.jsx
│   ├── Navbar.jsx
│   ├── PackageInfo.jsx
│   ├── PackageRow.jsx
│   ├── PackageTable.jsx
│   └── SearchBar.jsx
├── context/              # Global state management
│   └── GlobalContext.jsx
├── hooks/                # Custom React hooks
│   ├── usePackages.js
│   └── usePackageFiltering.js
├── pages/                # Main application pages
│   ├── PackageDetail.jsx
│   ├── PackageFavs.jsx
│   └── PackageList.jsx
├── style/                # CSS modules
│   ├── components/
│   └── pages/
├── App.jsx              # Main app component
├── main.jsx             # App entry point
└── index.css            # Global styles
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd progetto-finale-spec-frontend-front
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your API URL:

```
VITE_API_URL=your_api_endpoint_here
```

4. Start the development server:

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## API Integration

The application expects a REST API with the following endpoints:

- `GET /consultingpackages` - Retrieve all packages
- `GET /consultingpackages/:id` - Retrieve specific package details

Expected package data structure:

```json
{
  "id": 1,
  "title": "Package Name",
  "category": "Industry Category",
  "price": 1000,
  "description": "Package description",
  "features": ["feature1", "feature2"]
}
```

## Key Features Implementation

### Global State Management

The application uses React Context API for global state management:

```jsx
export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const packagesFetch = usePackages();
  const [favorites, setFavorites] = useState([]);

  // LocalStorage persistence
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // ... rest of the provider logic
}
```

### Custom Hooks

**usePackages**: Handles API calls and data caching

```jsx
const { packages, packageDetails, fetchPackageDetails, loading } =
  usePackages();
```

**usePackageFiltering**: Manages search, filtering, and sorting logic

```jsx
const { filteredAndSortedPackages, handleSort, debouncedSetSearchQuery } =
  usePackageFiltering(packages, selectedCategory);
```

### Performance Optimizations

- **Debounced Search**: 500ms delay to reduce API calls
- **Memoization**: Using `useMemo` for expensive calculations
- **Lazy Loading**: Package details loaded on demand
- **Caching**: API responses cached to avoid redundant requests

## Responsive Design

The application features a mobile-first responsive design:

- **Desktop**: Full table layout with hover effects
- **Tablet**: Optimized grid layout
- **Mobile**: Card-based layout with touch-friendly interactions

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## Development Guidelines

- Follow React best practices and hooks patterns
- Use functional components with hooks
- Implement proper error handling
- Write semantic HTML for accessibility
- Use CSS custom properties for theming
- Optimize performance with memoization where appropriate
