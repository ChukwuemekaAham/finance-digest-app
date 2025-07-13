## Feature

- 📱 Mobile-friendly experience

### Technical Features

- 🚀 Server Side Code and Client Component
- 🎨 Modern UI with Tailwind CSS and shadcn/ui
- 📱 Responsive design
- 🔄 Optimized content delivery (Data Caching and Revalidation)
- ⚠️ Graceful error handling
- 🐞 Unit testing with Jest
- 🔒 API Key security on server

### UI/UX Features

- 🎯 Modern, clean interface
- 🎨 Consistent design system using shadcn/ui
- ♿ Accessible components
- 🎭 Smooth transition and animation
- 📱 Responsive across all devices
- 🔄 Loading states with skeleton loaders
- 💫 Micro-interactions for better engagement

## Getting Started

### Prerequisites

- Node.js 20+
- npm/yarn
- API Key

### Environment Variables

Create a `.env.local` file with:

```bash

# Read Token
FINNHUB_API_KEY=your-finhub-api-key

# Next.js
NEXT_PUBLIC_BASE_URL=http://localhost:3000

```

### Installation

```bash

# Clone the repository
git clone https://github.com/ChukwuemekaAham/finance-digest-app.git

# Change directory
cd web

# Install dependencies
npm install

# Start the development server
npm run dev

# npx prettier --write .

# Testing
npm test

```

## Development

### Key Files and Directories

```bash
/src/app               # Next.js app directory
  /(cover)             # Website landing page route
  /(main)              # News routes
  /api                 # API routes
/src/components        # React components
/src/store             # Zustand configuration
/src/types             # Content types
/src/lib               # Utility functions
...

```

### Core Technologies

- Next.js 15
- TypeScript
- Tailwind CSS
- Shadcn UI
- Zustand
- Jest

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

---

Built with ❤️ using Next.js
