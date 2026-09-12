'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/context/CartContext'
import { useWishlist } from '@/lib/context/WishlistContext'
import { categories } from '@/lib/data/categories'
import { ShoppingCart, Search, Menu, X, Heart } from 'lucide-react'
import { CartDrawer } from './CartDrawer'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null)
  const { getItemCount } = useCart()
  const { bookIds } = useWishlist()
  const itemCount = getItemCount()

  const navLinks = categories.map((cat) => ({
    href: `/books?category=${cat.id}`,
    label: cat.name,
    category: cat.id,
    subgroups: cat.subgroups,
  }))

  return (
    <>
      {/* Dark Wooden Announcement Bar */}
      <div className="bg-wood-dark text-white py-3 px-4 text-center text-sm hidden md:block">
        <p>🌍 Worldwide Shipping Available | Free Delivery on Orders Over $50 | 100% Authentic Sources</p>
      </div>

      {/* Main Header */}
      <header className="bg-white sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="text-2xl font-bold text-wood-dark">
                📚 AhlulIlm
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setOpenMegaMenu(link.category)}
                  onMouseLeave={() => setOpenMegaMenu(null)}
                >
                  <Link
                    href={link.href}
                    className="text-text-primary hover:text-wood-dark transition-colors text-sm font-medium py-2 inline-block"
                  >
                    {link.label}
                  </Link>

                  {/* Mega menu dropdown */}
                  {openMegaMenu === link.category && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-72 bg-white border border-border-warm rounded-lg shadow-book-hover p-4 z-40">
                      <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2 px-2">
                        Browse {link.label}
                      </p>
                      <div className="grid grid-cols-1 gap-0.5">
                        {link.subgroups.map((group) => (
                          <Link
                            key={group.subcategory}
                            href={`/books?category=${link.category}&subcategory=${group.subcategory}`}
                            className="px-2 py-2 rounded-md text-sm text-text-primary hover:bg-parchment hover:text-wood-dark transition-colors"
                          >
                            {group.name}
                          </Link>
                        ))}
                      </div>
                      <Link
                        href={link.href}
                        className="block mt-2 px-2 py-2 text-sm font-semibold text-wood-dark hover:underline"
                      >
                        View all {link.label} books →
                      </Link>
                    </div>
                  )}
                </div>
              ))}
              <Link
                href="/about"
                className="text-text-primary hover:text-wood-dark transition-colors text-sm font-medium"
              >
                About Us
              </Link>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xs mx-4">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search books..."
                  className="w-full px-4 py-2 border border-border-warm rounded-lg text-sm focus:outline-none focus:border-wood-dark"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-text-muted" />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Wishlist Button */}
              <Link
                href="/wishlist"
                className="relative p-2 hover:bg-parchment rounded-lg transition-colors hidden sm:inline-block"
              >
                <Heart className="w-6 h-6 text-wood-dark" />
                {bookIds.length > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-accent-gold text-text-primary text-xs font-bold rounded-full flex items-center justify-center">
                    {bookIds.length}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-parchment rounded-lg transition-colors"
              >
                <ShoppingCart className="w-6 h-6 text-wood-dark" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-accent-gold text-text-primary text-xs font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 hover:bg-parchment rounded-lg transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-wood-dark" />
                ) : (
                  <Menu className="w-6 h-6 text-wood-dark" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pt-4 border-t border-border-warm">
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 text-text-primary hover:bg-parchment rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/wishlist"
                  className="px-4 py-2 text-text-primary hover:bg-parchment rounded-lg transition-colors flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="w-4 h-4" /> Wishlist{bookIds.length > 0 ? ` (${bookIds.length})` : ''}
                </Link>
                <Link
                  href="/about"
                  className="px-4 py-2 text-text-primary hover:bg-parchment rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
