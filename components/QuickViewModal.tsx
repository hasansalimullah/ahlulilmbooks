'use client'

import Link from 'next/link'
import { X, Star, ShoppingCart, Heart, BookOpen } from 'lucide-react'
import { Book } from '@/lib/types'
import { useCart } from '@/lib/context/CartContext'
import { useWishlist } from '@/lib/context/WishlistContext'

export function QuickViewModal({
  book,
  onClose,
}: {
  book: Book
  onClose: () => void
}) {
  const { addItem } = useCart()
  const { toggle, isWishlisted } = useWishlist()
  const wishlisted = isWishlisted(book.id)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full border border-border-warm"
        >
          <X className="w-5 h-5 text-text-primary" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          <div className="book-cover h-72 md:h-full rounded-lg overflow-hidden">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <span className="inline-block badge-gold capitalize mb-3">{book.category}</span>
            <h2 className="text-2xl font-bold text-text-primary mb-1">{book.title}</h2>
            <p className="text-text-muted mb-3">by {book.author}</p>

            <div className="flex items-center gap-2 mb-4">
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
              <span className="text-text-muted text-sm">
                {book.rating} ({book.reviews})
              </span>
            </div>

            <p className="text-3xl font-bold text-wood-dark mb-4">${book.price}</p>

            <p className="text-text-muted text-sm mb-4 line-clamp-4">{book.description}</p>

            <div className="grid grid-cols-2 gap-y-2 text-sm mb-6">
              <div className="flex items-center gap-1.5 text-text-muted">
                <BookOpen className="w-4 h-4" />
                <span>{book.publisher}</span>
              </div>
              <div className="text-text-muted">{book.pages} pages</div>
              <div className="text-text-muted capitalize">{book.binding}</div>
              <div className={book.inStock ? 'text-green-700' : 'text-red-600'}>
                {book.inStock ? 'In Stock' : 'Out of Stock'}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => addItem(book.id, 1)}
                disabled={!book.inStock}
                className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                onClick={() => toggle(book.id)}
                className={`p-3 rounded-lg border-2 transition-colors ${
                  wishlisted
                    ? 'border-red-500 bg-red-50 text-red-600'
                    : 'border-border-warm hover:border-wood-dark text-text-primary'
                }`}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-red-500' : ''}`} />
              </button>
            </div>

            <Link
              href={`/books/${book.id}`}
              className="block text-center mt-4 text-sm text-wood-dark hover:underline"
              onClick={onClose}
            >
              View full details →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
