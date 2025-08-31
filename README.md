# TECHNOPEDIA 14 - The Frontline

A modern, immersive gaming event website built with React, TypeScript, and Tailwind CSS. Features complete registration system with payment integration and military-inspired design.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🎮 Features

- **Registration System**: Complete form validation with Supabase database
- **Payment Integration**: Razorpay payment gateway for game registrations
- **Games Hub**: Four exciting gaming competitions with individual registration
- **Hero Section**: Immersive battlefield-themed landing page
- **Timeline**: Event schedule and milestones
- **Teams & Sponsors**: Meet organizers and partners
- **FAQ Section**: Common questions answered

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Shadcn/ui components  
- **Database**: Supabase (PostgreSQL)
- **Payments**: Razorpay Gateway
- **Forms**: React Hook Form + Zod validation

## 📋 Setup Instructions

1. **Environment Setup**:
   - Copy `.env.example` to `.env.local`
   - Add your Supabase URL and API key
   - Add Razorpay API keys

2. **Database Setup**:
   - Execute the provided SQL schema in Supabase
   - Tables: registrations, game_registrations, payments

3. **Development**:

   ```bash
   npm install
   npm run dev
   ```

## 🎯 Registration Features

- Main event registration with participant details
- Individual game registrations with payment
- Duplicate prevention and validation
- Real-time form feedback and error handling

## 📱 Responsive Design

Fully responsive design optimized for all devices with Trinity Veil classified theme.

## 📝 License

MIT License
