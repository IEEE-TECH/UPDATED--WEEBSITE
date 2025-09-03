# TECHNOPEDIA 14 - The Frontline

A modern, responsive frontend website for TECHNOPEDIA 14: Trinity Veil - The Final Confluence event, built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Trinity Veil Theme**: Military-inspired UI with classified document aesthetics
- **Google Forms Integration**: Seamless registration through secure Google Forms
- **Modern Stack**: Built with React 18, TypeScript, and Vite for optimal performance
- **Component Library**: Custom UI components using Shadcn/ui

## 🎯 Event Structure

### Operation Trinity Veil: The Final Confluence

Four classified events building toward a moral revelation:

1. **The Signal Room** (INQUISITIVE) - Cryptography and code-breaking
2. **The Iron Route** (SQUABBLE) - Diplomatic negotiations and strategy
3. **The Black Forge** (TBD) - Engineering and containment design
4. **The Convergence Briefing** - Final moral choice and consequences

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn/ui components
- **Forms**: Google Forms integration
- **Icons**: Lucide React
- **Deployment**: GitHub Pages / Netlify / Vercel ready

## 📋 Setup Instructions

1. **Clone Repository**:

   ```bash
   git clone https://github.com/IEEE-TECH/UPDATED--WEEBSITE.git
   cd UPDATED--WEEBSITE
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Environment Setup** (Optional):
   - Copy `.env.example` to `.env.local`
   - Configure Google Form URLs if needed

4. **Development**:

   ```bash
   npm run dev
   ```

5. **Build for Production**:

   ```bash
   npm run build
   ```

## 🎯 Registration Setup

### Google Forms Configuration

1. Create Google Forms for each registration type:
   - Main event registration (name, email, phone, PRN, branch, year)
   - Individual game registrations

2. Update form URLs in `src/lib/constants.ts`:

   ```typescript
   export const GOOGLE_FORMS = {
     mainRegistration: 'https://forms.google.com/your-main-form',
     gameRegistrations: {
       game1: 'https://forms.google.com/your-game1-form',
       game2: 'https://forms.google.com/your-game2-form',
       game3: 'https://forms.google.com/your-game3-form',
       game4: 'https://forms.google.com/your-game4-form'
     }
   }
   ```

## 📱 Responsive Design

Fully responsive design optimized for all devices with Trinity Veil classified theme:

- **Desktop**: Full-featured experience with detailed animations
- **Tablet**: Optimized layout for medium screens
- **Mobile**: Touch-friendly interface with simplified navigation

## 🎨 Design System

### Color Palette

- **Classified Gold**: `#D4AF37` - Primary accent color
- **Shadow Dark**: `#1A1A1A` - Primary background
- **Intel Green**: `#00FF41` - Success states
- **Alert Red**: `#FF3B30` - Warnings and errors
- **Warning Amber**: `#FF9500` - Attention states

### Typography

- **Classified Font**: Military-style headers
- **Intel Font**: Technical content
- **Mono Classified**: Code and classified text

## 🔧 Development

### Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── forms/          # Registration forms
│   └── ui/             # Shadcn/ui components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and constants
├── pages/              # Route components
├── assets/             # Images and static files
└── types/              # TypeScript definitions
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🚀 Deployment

### Quick Deploy Options

1. **Netlify**:
   - Connect GitHub repository
   - Build command: `npm run build`
   - Publish directory: `dist`

2. **Vercel**:
   - Import GitHub repository
   - Auto-detects Vite configuration

3. **GitHub Pages**:
   - Enable Pages in repository settings
   - Deploy from `gh-pages` branch

## 📞 Support

For technical support or questions:

- Email: <support@technopedia14.com>
- Create an issue in this repository

## 📝 License

MIT License - Feel free to use this project as a template for your events.
