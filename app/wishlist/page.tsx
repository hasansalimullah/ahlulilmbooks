'use client'

import Link from 'next/link'
import { books } from '@/lib/data/books'
import { useWishlist } from '@/lib/context/WishlistContext'
import { BookCard } from '@/components/BookCard'
import { Heart } from 'lucide-react'

export default function WishlistPage() {
  const { bookIds } = useWishlist()
  const wishlistedBooks = books.filter((b) => bookIds.includes(b.id))

  return (
    <div className="min-h-screen bg-parchment">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-text-primary mb-2 flex items-center gap-3">
          <Heart className="w-7 h-7 text-wood-dark" />
          My Wishlist
        </h1>
        <p className="text-text-muted mb-8">
          {wishlistedBooks.length} {wishlistedBooks.length === 1 ? 'book' : 'books'} saved
        </p>

        {wishlistedBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistedBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border border-border-warm">
            <Heart className="w-12 h-12 text-border-warm mx-auto mb-4" />
            <p className="text-text-muted text-lg mb-4">Your wishlist is empty</p>
            <Link href="/books" className="btn-primary inline-block">
              Browse Books
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
