# 🎯 Yideng AI

A simple and elegant React + TypeScript frontend application with modern design and interactive features.

## 🚀 Features

- ⚛️ **React 18** - Latest React with modern features and Concurrent Mode
- 🔷 **TypeScript** - Type-safe development with excellent IDE support
- 🎨 **Modern UI** - Beautiful gradient design with glassmorphism effects
- 📱 **Responsive** - Works perfectly on all devices and screen sizes
- ⚡ **Fast** - Optimized for performance with efficient rendering
- 🧪 **Testing** - Jest and React Testing Library setup with comprehensive tests
- 🚀 **Auto Deploy** - Automatic deployment to GitHub Pages via GitHub Actions

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: CSS3 with modern features (Grid, Flexbox, Gradients)
- **Testing**: Jest & React Testing Library
- **Build**: Create React App
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 🏃‍♂️ Quick Start

### Prerequisites

Make sure you have the following installed:
- Node.js (>=16.0.0)
- npm (>=7.0.0) or yarn

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/zhenzhenxu/yideng-ai.git
cd yideng-ai
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
```

3. **Start the development server:**
```bash
npm start
# or
yarn start
```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000) to view the app.

## 📦 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the app in development mode. The page will reload if you make edits.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run deploy`
Deploys the built app to GitHub Pages.

### `npm run eject`
**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time.

## 🚀 Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Automatic Deployment

Every push to the `main` branch triggers an automatic deployment:

1. ✅ Tests run automatically
2. 🏗️ Project builds for production
3. 🚀 Deploys to GitHub Pages

**Live Demo**: [https://zhenzhenxu.github.io/yideng-ai/](https://zhenzhenxu.github.io/yideng-ai/)

### Manual Deployment

You can also deploy manually:

```bash
npm run build
npm run deploy
```

## 🏗️ Project Structure

```
yideng-ai/
├── public/                 # Static assets
│   ├── index.html         # Main HTML template
│   ├── manifest.json      # Web app manifest
│   └── robots.txt         # Robots file
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Counter.tsx    # Counter component
│   │   └── FeatureCard.tsx# Feature card component
│   ├── hooks/             # Custom React hooks
│   │   └── useTimer.ts    # Timer hook for real-time updates
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts       # Main type exports
│   ├── utils/             # Utility functions and constants
│   │   └── constants.ts   # App constants and data
│   ├── App.tsx            # Main App component
│   ├── App.css            # App styles
│   ├── App.test.tsx       # App tests
│   ├── index.tsx          # Entry point
│   ├── index.css          # Global styles
│   └── setupTests.ts      # Test configuration
├── .github/
│   └── workflows/
│       └── deploy.yml     # GitHub Actions workflow
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## ✨ Key Features Demo

### 🔢 Interactive Counter
- Real-time state management with React hooks
- Type-safe event handlers with TypeScript
- Smooth animations and hover effects

### 🕐 Live Clock
- Custom React hook for time management
- Automatic updates every second
- Localized time formatting

### 🎨 Modern Design
- Gradient backgrounds and glassmorphism effects
- Responsive design that works on all devices
- CSS Grid and Flexbox layouts
- Smooth transitions and hover animations

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Run tests with coverage:

```bash
npm test -- --coverage --watchAll=false
```

## 🔧 Development

### Code Style

This project follows standard React and TypeScript conventions:
- Functional components with hooks
- Strict TypeScript configuration
- Clean component architecture
- Custom hooks for reusable logic

### Adding New Features

1. Create new components in `src/components/`
2. Add type definitions in `src/types/`
3. Create custom hooks in `src/hooks/`
4. Add constants in `src/utils/constants.ts`
5. Write tests for new functionality

## 🌐 Browser Support

This project supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/zhenzhenxu/yideng-ai/issues).

## 📬 Contact

Created by [@zhenzhenxu](https://github.com/zhenzhenxu)

---

**Happy coding! 🚀**