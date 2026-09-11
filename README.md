# AhlulIlmBooks - Islamic Online Bookstore

A modern, beautiful e-commerce platform for Islamic books built with Next.js, TypeScript, Tailwind CSS, and Stripe.

## 🌟 Features

- **Beautiful Library-Inspired Design**: Warm parchment tones, wood accents, and scholarly aesthetic
- **Complete E-Commerce Functionality**:
  - Product browsing with advanced search and filtering
  - Shopping cart with persistent storage
  - Secure Stripe checkout
  - Detailed book pages with reviews and recommendations
- **Mobile Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Fast & SEO Optimized**: Built on Next.js for optimal performance
- **Worldwide Shipping**: Support for international customers
- **Product Filtering**: Filter by category, language, price, binding type, and more

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) - Lightweight state management
- **Icons**: [Lucide React](https://lucide.dev/) - Beautiful icon library
- **Payments**: [Stripe](https://stripe.com/) - Payment processing
- **Hosting**: [Vercel](https://vercel.com/) - Optimal Next.js deployment platform

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ahlulilmbooks.git
cd ahlulilmbooks
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Copy the example environment file and update it with your credentials:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Stripe API keys:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key
STRIPE_SECRET_KEY=sk_test_your_key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**To get Stripe keys:**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create an account or log in
3. Navigate to **Developers > API Keys**
4. Copy your **Publishable Key** and **Secret Key**
5. Paste them into `.env.local`

### 4. Run Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The page will automatically reload as you edit files.

## 📁 Project Structure

```
ahlulilmbooks/
├── app/                          # Next.js app directory
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   ├── globals.css              # Global styles
│   ├── books/
│   │   ├── page.tsx             # Books listing page
│   │   └── [id]/page.tsx        # Individual book detail page
│   ├── checkout/
│   │   └── page.tsx             # Checkout page with Stripe
│   ├── about/
│   │   └── page.tsx             # About page
│   └── not-found.tsx            # 404 page
├── components/                   # React components
│   ├── Header.tsx               # Navigation header
│   ├── Footer.tsx               # Footer
│   ├── CartDrawer.tsx           # Shopping cart drawer
│   ├── HeroBanner.tsx           # Homepage hero
│   ├── TrustCounter.tsx         # Stats counter
│   ├── StartHerePath.tsx        # Recommendation quiz
│   ├── NewArrivalsCarousel.tsx  # New books carousel
│   ├── CategoriesGrid.tsx       # Category cards
│   └── ReviewsCarousel.tsx      # Customer reviews
├── lib/
│   ├── types.ts                 # TypeScript type definitions
│   ├── context/
│   │   └── CartContext.tsx      # Cart state management
│   └── data/
│       └── books.ts             # Sample book data
├── public/                       # Static files
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore file
├── next.config.js              # Next.js configuration
├── package.json                # Dependencies
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## 🏗️ Building for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## 🌐 Deploying to Vercel

### Option 1: Using Vercel CLI

```bash
npm install -g vercel
vercel
```

### Option 2: Using GitHub Integration

1. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/ahlulilmbooks.git
git push -u origin main
```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click **New Project**
4. Select your GitHub repository
5. Configure environment variables (add your Stripe keys)
6. Click **Deploy**

### Environment Variables on Vercel

In your Vercel project settings:
1. Go to **Settings > Environment Variables**
2. Add the following variables:
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_SECRET_KEY`
   - `NEXT_PUBLIC_SITE_URL` (your Vercel domain)

Your site will automatically redeploy when you push changes to your repository.

## 🛒 Adding More Books

Edit `lib/data/books.ts` to add more books to the catalog:

```typescript
{
  id: '11',
  title: 'Your Book Title',
  author: 'Author Name',
  price: 29.99,
  image: 'https://image-url.com/book.jpg',
  category: 'aqeedah',
  description: 'Book description',
  rating: 4.8,
  reviews: 120,
  binding: 'hardcover',
  language: 'english',
  isbn: '978-0-xxx-xxxxx-x',
  publisher: 'Publisher Name',
  pages: 300,
  isNew: false,
  isBestseller: false,
  tableOfContents: ['Chapter 1', 'Chapter 2'],
}
```

## 🎨 Customizing the Design

All design tokens are in `tailwind.config.ts`:

```typescript
colors: {
  parchment: '#FDFBF7',      // Main background
  'wood-light': '#A67C52',   // Light wood accent
  'wood-dark': '#8B5A2B',    // Dark wood/primary color
  'text-primary': '#2C221E', // Main text
  'accent-gold': '#D4AF37',  // Gold accents
}
```

Change these colors to customize the entire theme.

## 🔐 Security Notes

- **Never commit `.env.local`** - It contains sensitive API keys
- Use environment variables for all secrets
- Stripe keys are already public-facing (publishable key), but keep your secret key private
- Always use HTTPS in production

## 💳 Stripe Integration

The checkout page uses Stripe's Payment Element for secure card processing. To test:

**Test Card Numbers:**
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

Use any future date and any 3-digit CVC.

## 📞 Customer Support Pages

Create these pages for additional functionality:

- `/contact` - Contact form
- `/faq` - Frequently asked questions
- `/shipping` - Shipping information
- `/returns` - Returns and refunds policy
- `/privacy` - Privacy policy
- `/terms` - Terms of service

## 🚦 Performance Tips

1. **Optimize Images**: Replace Unsplash URLs with your own optimized images
2. **Content Delivery**: Use Vercel's built-in CDN for fast global delivery
3. **Database**: Consider adding a database (MongoDB, PostgreSQL) for real inventory management
4. **Caching**: Vercel automatically caches static assets

## 📊 Analytics

To add analytics, install your preferred provider:

```bash
npm install @vercel/analytics
```

Then add to `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({...}) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to fork the repository and submit pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by the clean design of Dar Al Athari
- Built with love for the Islamic education community
- Thanks to the open-source community for amazing libraries

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 💬 Support

For questions or issues, please open an issue on GitHub or contact us at info@ahlulilmbooks.com

---

Made with ❤️ for seekers of Islamic knowledge.
