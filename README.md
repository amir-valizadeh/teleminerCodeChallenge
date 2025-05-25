# Movie Search Application

A React application for searching and browsing movies, built with TypeScript, Vite, and TailwindCSS. Features include infinite scrolling, search functionality, genre filtering, and user authentication.

## Features

- **Movie Search**: Debounced search with real-time results
- **Genre Filtering**: Filter movies by genre categories
- **Infinite Scrolling**: Automatic loading of more content
- **Movie Details**: Comprehensive information including cast and crew
- **User Authentication**: Login and registration system
- **Favorites**: Save and manage favorite movies
- **Responsive Design**: Works on all screen sizes

## Tech Stack

**Core**: React 18, TypeScript, Vite
**Styling**: TailwindCSS, Framer Motion
**State Management**: Zustand
**Data Fetching**: TanStack React Query
**Routing**: React Router DOM
**Testing**: Vitest, React Testing Library
**API**: The Movie Database (TMDB)

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── hooks/              # Custom React Query hooks
├── stores/             # Zustand state stores
├── services/           # API client
├── types/              # TypeScript definitions
└── __tests__/          # Test files
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- TMDB API key from [themoviedb.org](https://www.themoviedb.org/settings/api)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/movie-search-app.git
cd movie-search-app
```

2. Install dependencies:
```bash
pnpm install
```

3. Setup environment variables:
```bash
cp .env.sample .env
```

4. Add your TMDB API key to `.env`:
```env
VITE_API_KEY=your_tmdb_api_key_here
VITE_API_BASE_URL=https://api.themoviedb.org/3
```

### Development

Run the development server:
```bash
pnpm dev
```

Run tests:
```bash
pnpm test
pnpm test:coverage
```

Build for production:
```bash
pnpm build
```

## Docker Setup

Run with Docker Compose:
```bash
docker-compose up
```

## Key Components

**SearchBar**: Debounced search input with 500ms delay
**GenreFilter**: Dropdown for filtering by movie genres
**InfiniteMovieGrid**: Grid with automatic content loading
**MovieCard**: Display movie poster, title, rating, and genres
**MovieDetailPage**: Comprehensive movie information with cast

## Authentication

Simple email/password authentication with persistent sessions using localStorage. User state is managed through Zustand store.

## API Integration

Uses TMDB API for:
- Movie search and discovery
- Genre information
- Movie details with cast and crew
- Similar movie recommendations

## Testing

Test coverage includes:
- Component rendering and interactions
- Custom hooks functionality
- API service methods
- User authentication flows

## Environment Variables

```env
VITE_API_KEY=your_tmdb_api_key        # Required
VITE_API_BASE_URL=https://api.themoviedb.org/3  # Optional
```

## Deployment

The application is configured for deployment on Vercel. Add environment variables in your deployment platform dashboard.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

Please follow conventional commit format for commit messages.

## License

This project is licensed under the MIT License.

## Acknowledgments

Thanks to The Movie Database (TMDB) for providing the movie data API.