'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram } from 'lucide-react'

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <footer className="bg-wood-dark text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Newsletter Section */}
        <div className="mb-16 pb-16 border-b border-wood-light">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-wood-light mb-6">
                Subscribe to our newsletter for new releases, exclusive offers, and curated reading recommendations.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-accent-gold"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-accent-gold text-wood-dark font-semibold rounded-lg hover:bg-yellow-400 transition-colors"
                >
                  Subscribe
                </button>
              </div>
              {subscribed && (
                <p className="text-accent-gold text-sm">Thanks for subscribing!</p>
              )}
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold mb-4">📚 AhlulIlm</h2>
            <p className="text-wood-light text-sm mb-6">
              Your trusted source for authentic Islamic books and knowledge.
            </p>
            <div className="space-y-3 text-sm text-wood-light">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Colorado, USA</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@ahlulilmbooks.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-wood-light">
              <li>
                <Link href="/books" className="hover:text-white transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link href="/books?category=aqeedah" className="hover:text-white transition-colors">
                  Aqeedah
                </Link>
              </li>
              <li>
                <Link href="/books?category=fiqh" className="hover:text-white transition-colors">
                  Fiqh
                </Link>
              </li>
              <li>
                <Link href="/books?category=hadith" className="hover:text-white transition-colors">
                  Hadith
                </Link>
              </li>
              <li>
                <Link href="/books?category=seerah" className="hover:text-white transition-colors">
                  Seerah
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold mb-4">Customer Care</h3>
            <ul className="space-y-2 text-wood-light">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-white transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4 mb-8">
              <a href="#" className="p-3 bg-wood-light rounded-lg hover:bg-accent-gold hover:text-wood-dark transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-wood-light rounded-lg hover:bg-accent-gold hover:text-wood-dark transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-3 bg-wood-light rounded-lg hover:bg-accent-gold hover:text-wood-dark transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
            <div>
              <p className="text-xs text-wood-light mb-3 font-semibold">Accepted Payments</p>
              <div className="flex gap-2">
                <div className="bg-white px-3 py-1 rounded text-xs font-bold text-wood-dark">
                  Stripe
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-wood-light pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-wood-light text-sm">
            <p>&copy; 2024 AhlulIlmBooks. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
