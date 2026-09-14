'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/context/CartContext'
import { useWishlist } from '@/lib/context/WishlistContext'
import { categories } from '@/lib/data/categories'
import { getRecentBooksByCategory, getBooksByAuthor } from '@/lib/data/books'
import { ShoppingCart, Search, Menu, X, Heart } from 'lucide-react'
import { CartDrawer } from './CartDrawer'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [openMegaMenu, setOpenMegaMenu] = useState<string | null>(null)
  const [hoveredAuthor, setHoveredAuthor] = useState<string | null>(null)
  const { getItemCount } = useCart()
  const { bookIds } = useWishlist()
  const itemCount = getItemCount()

  const navLinks = categories.map((cat) => ({
    href: `/categories/${cat.id}`,
    label: cat.name,
    category: cat.id,
    subgroups: cat.subgroups,
  }))

  const announcements = [
    'As-Salaamu Alaikum — Welcome to AhlulIlmBooks',
    '5% OFF your first order with code SALAF5',
    '🌍 Worldwide Shipping | Free Delivery on Orders Over $50',
    '100% Authentic Sources, direct from the publisher',
  ]

  return (
    <>
      {/* Marquee Announcement Bar */}
      <div className="bg-announce-dark text-white h-9 flex items-center overflow-hidden">
        <div className="marquee-track flex items-center gap-16 whitespace-nowrap text-xs tracking-wide">
          {[...announcements, ...announcements].map((msg, i) => (
            <span key={i}>{msg}</span>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-wood-dark sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md overflow-hidden p-1.5">
                <img src="/logo.png" alt="AhlulIlmBooks" className="w-full h-full object-contain" />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setOpenMegaMenu(link.category)}
                  onMouseLeave={() => setOpenMegaMenu(null)}
                >
                  <Link
                    href={link.href}
                    className="text-white/90 hover:text-white hover:opacity-80 transition-colors text-xs font-medium uppercase tracking-wide py-2 inline-block"
                  >
                    {link.label}
                  </Link>

                  {/* Mega menu dropdown */}
                  {openMegaMenu === link.category && (() => {
                    const recentBooks = getRecentBooksByCategory(link.category, 4)
                    return (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[560px] bg-white border border-border-warm rounded-lg shadow-book-hover p-4 z-40 grid grid-cols-2 gap-4">
                        {/* Subcategories column */}
                        <div>
                          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2 px-2">
                            Browse {link.label}
                          </p>
                          <div className="grid grid-cols-1 gap-0.5">
                            {link.subgroups.map((group) => (
                              <Link
                                key={group.subcategory}
                                href={`/books?category=${link.category}&subcategory=${group.subcategory}`}
                                className="px-2 py-2 rounded-md text-sm text-text-primary hover:bg-section-bg hover:text-wood-dark transition-colors"
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

                        {/* Recently Added column */}
                        <div className="border-l border-border-warm pl-4">
                          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2 px-2">
                            Recently Added
                          </p>
                          <div className="flex flex-col gap-2">
                            {recentBooks.map((book) => (
                              <div key={book.id} className="relative">
                                <div
                                  className="flex items-center gap-3 px-2 py-1.5 rounded-md hover:bg-section-bg transition-colors"
                                  onMouseEnter={() => setHoveredAuthor(book.author)}
                                >
                                  <Link href={`/books/${book.id}`} className="flex items-center gap-3 flex-1 min-w-0">
                                    <img
                                      src={book.image}
                                      alt={book.title}
                                      className="w-9 h-12 object-cover rounded shadow-sm shrink-0"
                                    />
                                    <div className="min-w-0">
                                      <p className="text-sm text-text-primary font-medium line-clamp-1">
                                        {book.title}
                                      </p>
                                      <p className="text-xs text-wood-dark">{book.author}</p>
                                    </div>
                                  </Link>
                                </div>

                                {/* Author flyout: this author's other books with images */}
                                {hoveredAuthor === book.author && (() => {
                                  const authorBooks = getBooksByAuthor(book.author)
                                  return (
                                    <div
                                      className="absolute top-0 left-full ml-2 w-64 bg-white border border-border-warm rounded-lg shadow-book-hover p-3 z-50"
                                      onMouseEnter={() => setHoveredAuthor(book.author)}
                                      onMouseLeave={() => setHoveredAuthor(null)}
                                    >
                                      <p className="text-xs font-semibold text-text-muted uppercase tracking-wide mb-2">
                                        {book.author}
                                      </p>
                                      <div className="flex flex-col gap-2 max-h-72 overflow-y-auto">
                                        {authorBooks.map((ab) => (
                                          <Link
                                            key={ab.id}
                                            href={`/books/${ab.id}`}
                                            className="flex items-center gap-3 px-1 py-1 rounded-md hover:bg-section-bg transition-colors"
                                          >
                                            <img
                                              src={ab.image}
                                              alt={ab.title}
                                              className="w-8 h-11 object-cover rounded shrink-0"
                                            />
                                            <p className="text-xs text-text-primary line-clamp-2">{ab.title}</p>
                                          </Link>
                                        ))}
                                      </div>
                                    </div>
                                  )
                                })()}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              ))}
              <Link
                href="/books?vocalization=full"
                className="text-white/90 hover:text-white hover:opacity-80 transition-colors text-xs font-medium uppercase tracking-wide"
              >
                100% Harakat
              </Link>
              <Link
                href="/about"
                className="text-white/90 hover:text-white hover:opacity-80 transition-colors text-xs font-medium uppercase tracking-wide"
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
                  className="w-full px-4 py-2 border border-white/20 bg-white/10 text-white placeholder-white/60 rounded-lg text-sm focus:outline-none focus:border-white/50 focus:bg-white"
                />
                <Search className="absolute right-3 top-2.5 w-4 h-4 text-white/70" />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Wishlist Button */}
              <Link
                href="/wishlist"
                className="relative p-2 hover:bg-white/10 rounded-lg transition-colors hidden sm:inline-block"
              >
                <Heart className="w-5 h-5 text-white" />
                {bookIds.length > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-accent-gold text-wood-dark text-xs font-bold rounded-full flex items-center justify-center">
                    {bookIds.length}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-white" />
                {itemCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-accent-gold text-wood-dark text-xs font-bold rounded-full flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <nav className="lg:hidden mt-4 pt-4 border-t border-white/20">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-2 text-white/90 hover:bg-white/10 rounded-lg transition-colors text-sm uppercase tracking-wide"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/books?vocalization=full"
                  className="px-4 py-2 text-white/90 hover:bg-white/10 rounded-lg transition-colors text-sm uppercase tracking-wide"
                  onClick={() => setIsMenuOpen(false)}
                >
                  100% Harakat
                </Link>
                <Link
                  href="/wishlist"
                  className="px-4 py-2 text-white/90 hover:bg-white/10 rounded-lg transition-colors flex items-center gap-2 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Heart className="w-4 h-4" /> Wishlist{bookIds.length > 0 ? ` (${bookIds.length})` : ''}
                </Link>
                <Link
                  href="/about"
                  className="px-4 py-2 text-white/90 hover:bg-white/10 rounded-lg transition-colors text-sm uppercase tracking-wide"
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
