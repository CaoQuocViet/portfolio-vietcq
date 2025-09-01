# Portfolio Vietcq

A modern, responsive portfolio website built with Next.js 15 and React 19, featuring a sleek design with dark/light theme support and macOS-style dock navigation.

## 🚀 Features

- **Modern Design** - Clean, professional layout with smooth animations
- **Dark/Light Theme** - Toggle between themes with persistent preferences  
- **macOS-style Dock** - Interactive navigation dock with hover magnification effects
- **3D Elements** - Three.js integration for interactive 3D models
- **Responsive Design** - Optimized for all device sizes
- **Project Gallery** - Dynamic project showcase with image galleries

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **Tailwind CSS 4** - Utility-first CSS framework
- **Three.js** - 3D graphics library
- **Framer Motion** - Animation library
- **next-themes** - Theme switching

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.jsx         # Root layout
│   │   ├── page.jsx           # Home page
│   │   ├── gallery/           # Gallery section
│   │   ├── project/[id]/      # Dynamic project pages
│   │   └── api/gallery/       # API routes
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   │   ├── hero/          # Hero section
│   │   │   ├── about/         # About section
│   │   │   ├── Navigation.jsx # Main navigation
│   │   │   ├── Projects.jsx   # Projects showcase
│   │   │   ├── Services.jsx   # Services section
│   │   │   ├── Contact.jsx    # Contact form
│   │   │   └── Footer.jsx     # Footer
│   │   ├── ui/                # UI components
│   │   │   ├── Button.jsx     # Reusable button
│   │   │   └── Dock.jsx       # macOS-style dock
│   │   └── gallery/           # Gallery components
│   ├── config/
│   │   └── navigation.js      # Navigation configuration
│   └── utils/
│       ├── info.js           # Site information
│       ├── navigation.js     # Navigation utilities
│       └── Projectimage.js   # Project image utilities
├── public/
│   ├── data/projects/        # Project JSON data
│   ├── img/projects/         # Project images
│   ├── models/               # 3D models
│   └── fonts/                # Custom fonts
├── global.css               # Global styles
├── next.config.mjs         # Next.js configuration
├── tailwind.config.js      # Tailwind configuration
└── package.json           # Dependencies
```

## 🚦 Getting Started

### Installation

```bash
# Clone repository
git clone https://github.com/caoquocviet/portfolio
cd portfolio

# Install dependencies  
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## ⚙️ Configuration

### Adding New Projects

1. Create JSON file in `public/data/projects/`
2. Add project images to `public/img/projects/project-name/`
3. Images should follow naming pattern: `project-name-1.png`

### Navigation Setup

Edit `src/config/navigation.js` to customize navigation items.

## 🎯 Key Components

- **Dock** - macOS-style navigation with hover effects
- **Gallery** - Dynamic project image showcase  
- **3D Model** - Interactive Three.js components

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 👤 Author

**Vietcq**
- Website: [https://portfolio-Vietcq.vercel.app/](https://portfolio-Vietcq.vercel.app/)
- GitHub: [@CaoQuocViet](https://github.com/CaoQuocViet)
- Email: vietcao10@gmail.com

---

Built with ❤️ using Next.js and modern web technologies.
