import type { Metadata } from 'next'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { CartProvider } from '@/lib/context/CartContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'AhlulIlmBooks - Islamic Online Bookstore',
  description: 'Comprehensive digital repository for Islamic books, Islamic studies, Quran, Hadith, Fiqh, and more.',
  keywords: 'Islamic books, Quran, Hadith, Islamic studies, Islamic bookstore',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-parchment text-text-primary">
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
