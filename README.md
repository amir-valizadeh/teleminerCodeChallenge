# Movie Discovery Application

A modern React application for discovering and browsing movies, built with TypeScript, Vite, and TailwindCSS. Features include infinite scrolling, responsive design, and smooth animations using Framer Motion.

## 🚀 Features

- Movie listing with pagination
- Responsive grid layout
- Skeleton loading states
- Smooth animations with Framer Motion
- TypeScript support
- Comprehensive test coverage
- Modern UI with TailwindCSS

## 📦 Tech Stack

- **Core:**
    - React 18
    - TypeScript
    - Vite

- **Styling:**
    - TailwindCSS
    - Framer Motion

- **Testing:**
    - Vitest
    - React Testing Library
    - Jest DOM

- **Development Tools:**
    - ESLint
    - Prettier
    - PostCSS
    - Autoprefixer

## 🛠️ Project Structure

```
movie-discovery/
├── src/
│   ├── assets/           # Static assets (images, fonts)
│   ├── components/       # Reusable React components
│   │   ├── MovieCard.tsx
│   │   ├── MovieCardSkeleton.tsx
│   │   └── Pagination.tsx
│   ├── services/        # API and other services
│   │   └── api.ts
│   ├── types/           # TypeScript type definitions
│   │   └── movie.ts
│   ├── __tests__/       # Test files
│   │   └── App.test.tsx
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── public/              # Public assets
├── .env                 # Environment variables
├── .env.example         # Example environment variables
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── vitest.config.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- pnpm (v8 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/movie-discovery.git
cd movie-discovery
```

2. Install dependencies:
```bash
pnpm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Add your TMDB API key to `.env`:
```
VITE_API_KEY=your_api_key_here
VITE_API_BASE_URL=https://api.themoviedb.org/3
```

### Development

Run the development server:
```bash
pnpm dev
```

### Testing

Run tests:
```bash
pnpm test              # Run tests in watch mode
pnpm test:coverage     # Run tests with coverage report
pnpm test:ui           # Run tests with UI
```

### Building

Build for production:
```bash
pnpm build
```

## 🧪 Testing Strategy

The project uses a comprehensive testing approach:

### Unit Tests
- Component testing with React Testing Library
- API service mocking
- State management testing

### Integration Tests
- Component interaction testing
- User event simulation
- Async operation testing

### Test Files Structure
```
src/__tests__/
├── App.test.tsx            # Main application tests
├── MovieCard.test.tsx      # MovieCard component tests
├── Pagination.test.tsx     # Pagination component tests
└── api.test.tsx           # API service tests
```

## 📝 Environment Variables

Required environment variables:

```env
VITE_API_KEY=your_tmdb_api_key
VITE_API_BASE_URL=https://api.themoviedb.org/3
```

## 🎨 Styling Guidelines

The project uses TailwindCSS with custom configuration:

- Consistent spacing scale
- Custom color palette
- Responsive breakpoints
- Component-specific styles

### CSS Structure
```
styles/
├── globals.css     # Global styles and Tailwind imports
└── components/     # Component-specific styles
```

## 🔨 Development Workflow

1. Create feature branch
2. Implement changes
3. Write tests
4. Create pull request
5. Code review
6. Merge to main

### Branch Naming Convention
- Feature: `feature/description`
- Bugfix: `fix/description`
- Hotfix: `hotfix/description`

## 📈 Performance Optimization

- Lazy loading of images
- Code splitting
- Component memoization
- Skeleton loading states
- Efficient re-rendering strategies

## 🔐 Security

- Environment variable protection
- API key security
- XSS prevention
- CORS configuration

## 🐛 Known Issues

- None at the moment

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Amir Valizadeh - Initial work - [Github](https://github.com/amir-valizadeh)

## 🙏 Acknowledgments

- TMDB for providing the movie data API
- React community for excellent tools and libraries
- Contributors who have helped improve the project