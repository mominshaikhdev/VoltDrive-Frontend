# ⚡ VoltDrive Frontend

[![React](https://img.shields.io/badge/React-v18.3%2B-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-v5.4%2B-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8.svg)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.5%2B-blue.svg)](https://www.typescriptlang.org/)

VoltDrive Frontend is a premium, interactive, and responsive web application designed for a state-of-the-art Electric Vehicle (EV) marketplace. Built with React, Vite, and TypeScript, it implements a cyber-obsidian dark theme with modern glassmorphism components, detailed specification cards, Recharts visualizations, and secure authentication routing using Better Auth.

---

## 🎨 Design Systems & UI Features

- **Cyber-Obsidian Dark Mode**: Sleek dark aesthetic designed with custom CSS variables and premium Tailwind utility classes.
- **Glassmorphic Elements**: Cards and headers using backdrop-blur effects and subtle border glow accents.
- **Recharts Analytics Hub**: Dynamic scatter plots (EV Range vs Price comparison) and comparative brand pricing bar charts that adjust responsively.
- **Micro-Animations**: Hover-active scale effects, rotating loaders, and pulse-skeleton screens during network fetching states.
- **Form Validation**: Strict client-side validation logic built into vehicle submission forms.

---

## 🛠️ Technology Stack

- **Framework**: [React](https://react.dev/) (v18.3+)
- **Build System**: [Vite](https://vitejs.dev/) (v5.4+)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (v5.5+)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) featuring the `@tailwindcss/vite` compiler plugin
- **Visualizations**: [Recharts](https://recharts.org/) (v2.12+)
- **Iconography**: [Lucide React](https://lucide.dev/) (v0.428+)
- **Auth Client**: Better Auth React SDK (`better-auth/react`)
- **Routing**: [React Router DOM](https://reactrouter.com/) (v6.26+)

---

## 📂 Project Directory Structure

```text
frontend/
├── src/
│   ├── components/       # Reusable layout and UI elements (Navbar, Footer, Cards)
│   ├── context/          # Global application state (AuthContext)
│   ├── lib/              # Client-side SDK instantiations (auth-client)
│   ├── pages/            # Page components representing views/routes
│   ├── App.tsx           # Router and application shell configuration
│   ├── main.tsx          # React application entrypoint
│   └── index.css         # Custom Tailwind directives and root styles
├── index.html            # Web template
└── vite.config.ts        # Vite plugins and proxy setup
```

---

## 📄 Pages Configuration

### 🏠 Public Views
1. **Home (`/`)**: Rich landing experience containing interactive CTAs, a manufacturer brand selector carousel, featured top-rated vehicles,spec highlights grid, the Recharts analytics hub, and FAQs.
2. **Explore Marketplace (`/explore`)**: Features robust sidebar filters (by category, brand, battery range slider, and price slider), keyword search bar, and results sorting.
3. **Vehicle Details (`/vehicles/:id`)**: Comprehensive layout displaying interactive image gallery with thumbnail swapper, detailed technical metrics (acceleration, top speed, charging speed), user reviews history, and a write-a-review portal (accessible to logged-in users).
4. **About (`/about`)** & **Contact (`/contact`)**: Polished structural pages about VoltDrive goals and message collection forms.

### 🔑 Authentication Views
1. **Login (`/login`)**: Secure login page featuring quick-autofill options for pre-seeded user and admin profiles.
2. **Register (`/register`)**: Self-registration for new users.

### 🛡️ Protected Management Console (Route Guarded)
1. **Add Vehicle (`/add-vehicle`)**: Structured form wizard validating EV details, photo links, and performance specs.
2. **Manage Listings (`/manage-vehicles`)**: Admin and owner workspace displaying created listings in a responsive data table layout with instant delete buttons.

---

## 🚀 Getting Started

### 1. Installation
Ensure [Node.js](https://nodejs.org/) (v24+) and [pnpm](https://pnpm.io/) are installed.

```bash
pnpm install
```

### 2. Execution Commands

#### 🔴 Launch Local Development Server
Starts Vite dev server with automated proxy routing setup to target backend Port 5000:
```bash
pnpm run dev
```

#### 🟡 Run Codebase Linter
Enforces styling consistency and syntax checks:
```bash
pnpm run lint
```

#### 🟢 Compile and Build Production Assets
Creates optimized static distribution files and tests the build locally:
```bash
pnpm run build
pnpm run preview
```

---

## 📱 Responsive Configurations

VoltDrive is customized for fluid transitions across modern screens:
- **Mobile Menu Drawer**: Slide-out navigations using Lucide icons.
- **Overlay Side Sheet**: Explore filters fold into a custom mobile-drawer panel on tablet and phone viewports.
- **Grid Auto-Sizing**: Fluid grid adjustments (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`).
- **Data Table Prioritization**: Hides non-critical columns on mobile viewports to prevent layout overflow.
