'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Star, ShoppingCart, BookOpen, Heart, Eye } from 'lucide-react'
import { Book } from '@/lib/types'
import { useCart } from '@/lib/context/CartContext'
import { useWishlist } from '@/lib/context/WishlistContext'
import { QuickViewModal } from './QuickViewModal'

export function BookCard({ book }: { book: Book }) {
  const { addItem } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const wishlisted = isWishlisted(book.id)

  return (
    <>
      <Link href={`/books/${book.id}`}>
        <div className="group cursor-pointer">
          <div className="mb-4 relative overflow-hidden rounded-lg book-cover h-80">
            {/* Primary cover */}
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
            />
            {/* Secondary cover shown on hover, if available */}
            <img
              src={book.imageAlt || book.image}
              alt={book.title}
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            {book.isNew && (
              <div className="absolute top-4 right-4">
                <span className="badge-gold">New</span>
              </div>
            )}
            {book.isBestseller && (
              <div className="absolute top-4 left-4">
                <span className="inline-block px-3 py-1 bg-red-500 text-white rounded-full text-xs font-bold">
                  Bestseller
                </span>
              </div>
            )}
            {!book.inStock && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-center text-xs py-1.5 font-medium">
                Out of Stock
              </div>
            )}

            {/* Quick-action icons overlay */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 mt-10">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  toggle(book.id)
                }}
                aria-label="Add to wishlist"
                className={`p-2 rounded-full shadow-md transition-colors ${
                  wishlisted
                    ? 'bg-red-500 text-white'
                    : 'bg-white/90 text-text-primary hover:bg-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-white' : ''}`} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsQuickViewOpen(true)
                }}
                aria-label="Quick view"
                className="p-2 rounded-full bg-white/90 text-text-primary hover:bg-white shadow-md transition-colors"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Title wrapped in its own hover group so the preview only reacts to the title itself */}
          <div className="relative inline-block group/title">
            <h3 className="font-semibold text-text-primary group-hover:text-wood-dark transition-colors line-clamp-2 cursor-help">
              {book.title}
            </h3>

            {/* Rich hover preview card */}
            <div className="invisible opacity-0 group-hover/title:visible group-hover/title:opacity-100 transition-opacity duration-150 absolute z-30 left-0 top-full mt-2 w-80 max-w-[85vw] bg-white border border-border-warm rounded-lg shadow-book-hover p-4 pointer-events-none">
              <div className="flex gap-3">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-20 h-28 object-cover rounded-md shrink-0 border border-border-warm"
                />
                <div className="min-w-0">
                  <p className="font-semibold text-sm text-text-primary leading-snug line-clamp-2">
                    {book.title}
                  </p>
                  <p className="text-xs text-wood-dark font-medium mt-0.5">{book.author}</p>
                  <div className="flex items-center gap-1 mt-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.round(book.rating)
                            ? 'fill-accent-gold text-accent-gold'
                            : 'text-border-warm'
                        }`}
                      />
                    ))}
                    <span className="text-text-muted text-[11px]">
                      {book.rating} ({book.reviews})
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-text-muted mt-1">
                    <BookOpen className="w-3 h-3" />
                    <span>
                      {book.publisher} · {book.pages}pp · {book.binding}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-text-muted mt-3 line-clamp-3">{book.description}</p>
              <div className="mt-2 text-sm font-bold text-wood-dark">${book.price}</div>
            </div>
          </div>

          <p className="text-text-muted text-sm mb-2">{book.author}</p>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(book.rating)
                      ? 'fill-accent-gold text-accent-gold'
                      : 'text-border-warm'
                  }`}
                />
              ))}
            </div>
            <span className="text-text-muted text-xs">({book.reviews})</span>
          </div>
          <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-border-warm">
            <span className="text-2xl font-bold text-wood-dark">${book.price}</span>
            <button
              onClick={(e) => {
                e.preventDefault()
                addItem(book.id, 1)
              }}
              disabled={!book.inStock}
              className="p-2 bg-parchment hover:bg-wood-dark text-wood-dark hover:text-white rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-parchment disabled:hover:text-wood-dark"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Link>

      {isQuickViewOpen && (
        <QuickViewModal book={book} onClose={() => setIsQuickViewOpen(false)} />
      )}
    </>
  )
}
