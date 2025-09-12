# Portfolio Vietcq

A modern, responsive portfolio website built with Next.js 15 and React 19, featuring a sleek design with dark/light theme support, interactive 3D elements, dynamic project galleries, and comprehensive project management system.

## 🌟 Demo Screenshots

<div align="center">

### Hero
![Hero](./public/data/project-demo/portfolio/portfolio%20(1).png)

### About me
![About me](./public/data/project-demo/portfolio/portfolio%20(2).png)

### Services Overview
![Services Overview](./public/data/project-demo/portfolio/portfolio%20(3).png)

### Repositories
![Repositories](./public/data/project-demo/portfolio/portfolio%20(4).png)

### Project showcase
![Project showcase](./public/data/project-demo/portfolio/portfolio%20(5).png)

### Contact Form
![Contact Form](./public/data/project-demo/portfolio/portfolio%20(6).png)

### Windows start
![Windows start](./public/data/project-demo/portfolio/portfolio%20(7).png)

### Project Details
![Project Details](./public/data/project-demo/portfolio/portfolio%20(8).png)

### Gallery System
![Gallery System](./public/data/project-demo/portfolio/portfolio%20(9).png)

### Ideas Section
![Ideas Section](./public/data/project-demo/portfolio/portfolio%20(10).png)

### Blog System
![Blog System](./public/data/project-demo/portfolio/portfolio%20(11).png)

</div>

## 🚀 Features

- **Modern Design** - Clean, professional layout with smooth animations and micro-interactions
- **Dark/Light Theme** - Toggle between themes with persistent preferences and system detection
- **macOS-style Dock** - Interactive navigation dock with hover magnification effects and smooth transitions
- **3D Elements** - Three.js integration for interactive 3D models and immersive experiences
- **Dynamic Gallery System** - Advanced project showcase with automatic image management and responsive layouts
- **Responsive Design** - Optimized for all device sizes from mobile to desktop
- **Project Management** - Comprehensive project detail pages with features, technologies, and galleries
- **Blog System** - Full-featured blog with markdown support and admin panel
- **Admin Dashboard** - Content management system for blog posts and project updates
- **Ideas Showcase** - Creative concepts and future project ideas display
- **Contact System** - Interactive contact form with validation
- **Performance Optimized** - Built with Next.js 15 App Router and React 19 concurrent features

## 🛠️ Tech Stack

### Core Framework
- **Next.js 15** - React framework with App Router and server components
- **React 19** - Latest React with concurrent features and improved performance
- **JavaScript ES6+** - Modern JavaScript with ES modules and async/await

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework with custom design system
- **Framer Motion** - Advanced animation library for smooth transitions
- **CSS-in-JS** - Dynamic styling with theme-aware components
- **Heroicons & Lucide React** - Professional icon libraries
- **Tailwind Animate** - Pre-built animation utilities

### 3D & Interactive Elements
- **Three.js** - 3D graphics library for immersive experiences
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber

### Utilities & Tools
- **next-themes** - Theme switching with system detection
- **React Markdown** - Markdown rendering for blog content
- **Lodash** - Utility functions for data manipulation
- **Class Variance Authority (CVA)** - Type-safe component variants
- **Tailwind Merge** - Intelligent Tailwind class merging

### Development Tools
- **PostCSS** - CSS processing with modern features
- **Autoprefixer** - Automatic vendor prefix handling
- **PostCSS Nesting** - CSS nesting support

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── layout.jsx         # Root layout with theme provider
│   │   ├── page.jsx           # Home page with all sections
│   │   ├── gallery/           # Dynamic gallery system
│   │   ├── project/[id]/      # Dynamic project detail pages
│   │   ├── blog/              # Blog system with markdown support
│   │   │   └── [slug]/        # Dynamic blog post pages
│   │   ├── admin/             # Admin dashboard for content management
│   │   ├── ideas/             # Ideas showcase page
│   │   └── api/               # API routes
│   │       ├── gallery/       # Gallery data API
│   │       ├── projects/      # Project data API
│   │       └── admin/         # Admin API endpoints
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   │   ├── hero/          # Hero section with 3D elements
│   │   │   ├── about/         # About section with interactive PC model
│   │   │   ├── Navigation.jsx # Main navigation with scroll detection
│   │   │   ├── Projects.jsx   # GitHub repositories showcase
│   │   │   ├── Services.jsx   # Services offered section
│   │   │   ├── Showcase.jsx   # Featured projects showcase
│   │   │   ├── Contact.jsx    # Contact form with validation
│   │   │   ├── Footer.jsx     # Footer with social links
│   │   │   └── ClockWidget.jsx # Real-time clock widget
│   │   ├── project/           # Project detail components
│   │   │   ├── ProjectOverview.jsx    # Project hero section
│   │   │   ├── ProjectDetails.jsx     # Timeline and role details
│   │   │   ├── ProjectFeatures.jsx    # Key features and achievements
│   │   │   ├── ProjectGallery.jsx     # Integrated gallery component
│   │   │   └── TrongDongBackground.jsx # Special background for Giveback project
│   │   ├── gallery/           # Gallery system components
│   │   │   ├── index.jsx      # Main gallery page client
│   │   │   └── ProjectCards.jsx # Animated project cards with infinite scroll
│   │   ├── blog/              # Blog system components
│   │   │   ├── BlogList.jsx   # Blog posts listing
│   │   │   └── BlogPost.jsx   # Individual blog post display
│   │   ├── admin/             # Admin panel components
│   │   │   ├── AdminPanel.jsx # Main admin dashboard
│   │   │   ├── AdminAuth.jsx  # Authentication component
│   │   │   └── BlogEditor.jsx # Blog post editor
│   │   ├── ideas/             # Ideas page components
│   │   │   └── index.jsx      # Ideas showcase layout
│   │   ├── dock/              # macOS-style dock navigation
│   │   │   ├── Dock.jsx       # Main dock component
│   │   │   └── Modal.jsx      # Dock modal dialogs
│   │   ├── ui/                # Reusable UI components
│   │   │   ├── Button.jsx     # Customizable button component
│   │   │   ├── GridBackground.jsx # Animated grid background
│   │   │   ├── WaveBackground.jsx # Wave background animations
│   │   │   └── loading.jsx    # Loading spinner components
│   │   ├── share/             # Shared components across pages
│   │   │   ├── ProjectsList.jsx     # Projects listing component
│   │   │   ├── RepositoriesList.jsx # GitHub repositories list
│   │   │   ├── NavigationList.jsx   # Navigation items helper
│   │   │   └── SocialList.jsx       # Social media links
│   │   ├── magicui/           # Enhanced UI components
│   │   │   └── highlighter.jsx # Text highlighting effects
│   │   └── Gallery.jsx        # Main gallery component with advanced features
│   ├── config/
│   │   └── navigation.js      # Navigation configuration for all pages
│   ├── hooks/                 # Custom React hooks
│   │   ├── useGallery.js      # Gallery data management hook
│   │   ├── useGitHubRepos.js  # GitHub API integration hook
│   │   └── useBlog.js         # Blog data management hook
│   ├── utils/                 # Utility functions
│   │   ├── info.js           # Site information and constants
│   │   ├── navigation.js     # Navigation helper functions
│   │   └── admin.js          # Admin utilities and validation
│   └── data/
│       └── socialPlatforms.js # Social media platform configurations
├── public/
│   ├── data/                  # Static data files
│   │   ├── project-detail/    # Project detail JSON files
│   │   ├── project-demo/      # Project screenshot galleries
│   │   │   └── portfolio/     # Portfolio project screenshots
│   │   ├── blog/              # Blog data
│   │   │   ├── posts.json     # Blog posts metadata
│   │   │   └── images/        # Blog post images
│   │   ├── admin/             # Admin configuration
│   │   └── models/            # 3D model files
│   ├── img/                   # Static images
│   │   ├── gif/               # Animated GIFs
│   │   └── icons/             # Icon files
│   ├── models/                # 3D models and assets
│   │   ├── bm86_portable_pc.glb # 3D PC model
│   │   └── license.txt        # Model licenses
│   └── fonts/                 # Custom fonts
│       └── CalSans-SemiBold.ttf # Primary display font
├── global.css                 # Global styles and CSS variables
├── next.config.mjs           # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
└── package.json             # Dependencies and scripts
```

## 🚦 Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm** or **yarn** package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation

```bash
# Clone repository
git clone https://github.com/CaoQuocViet/portfolio-vietcq.git
cd portfolio-vietcq

# Install dependencies  
npm install
# or
yarn install

# Start development server
npm run dev
# or
yarn dev

# Start development server with Turbopack (faster)
npm run dev-turbo
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Build for Production

```bash
# Build the application
npm run build
# or 
yarn build

# Start production server
npm start
# or
yarn start
```

### Development Scripts

```bash
# Development with standard compiler
npm run dev

# Development with Turbopack (experimental, faster builds)
npm run dev-turbo

# Production build only (without starting server)
npm run build-only

# Production build and start
npm run build && npm start
```

## ⚙️ Configuration

### Environment Setup

Create a `.env.local` file in the root directory for local development:

```env
# Optional: Configure any environment variables here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```


## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Cao Quoc Viet (Vietcq)**

- 🌐 **Website**: [https://portfolio-vietcq.vercel.app/](https://portfolio-vietcq.vercel.app/)
- 💻 **GitHub**: [@CaoQuocViet](https://github.com/CaoQuocViet)
- 📧 **Email**: [vietcao10@gmail.com](mailto:vietcao10@gmail.com)
- 💼 **LinkedIn**: [Cao Quoc Viet](https://linkedin.com/in/cao-quoc-viet-a10841230)

## ⭐ Show Your Support

If this project helped you, please give it a ⭐ on GitHub! Your support motivates continued development and improvements.

