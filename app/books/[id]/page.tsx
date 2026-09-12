'use client'

import { useState } from 'react'
import Link from 'next/link'
import { books } from '@/lib/data/books'
import { useCart } from '@/lib/context/CartContext'
import { useWishlist } from '@/lib/context/WishlistContext'
import { Star, ShoppingCart, Heart, Share2, ChevronRight, BookOpen } from 'lucide-react'
import { notFound } from 'next/navigation'

interface BookDetailPageProps {
  params: {
    id: string
  }
}

export default function BookDetailPage({ params }: BookDetailPageProps) {
  const book = books.find((b) => b.id === params.id)
  const { addItem } = useCart()
  const { toggle, isWishlisted: checkWishlisted } = useWishlist()
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const isWishlisted = book ? checkWishlisted(book.id) : false

  if (!book) {
    notFound()
  }

  const relatedBooks = books
    .filter((b) => b.category === book.category && b.id !== book.id)
    .slice(0, 3)

  const handleAddToCart = () => {
    addItem(book.id, quantity)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="min-h-screen bg-parchment">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-border-warm py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm">
          <Link href="/" className="text-wood-dark hover:underline">
            Home
          </Link>
          <ChevronRight className="w-4 h-4 text-text-muted" />
          <Link href="/books" className="text-wood-dark hover:underline">
            Books
          </Link>
          <ChevronRight className="w-4 h-4 text-text-muted" />
          <span className="text-text-muted truncate">{book.title}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Left: Book Image */}
          <div>
            <div className="sticky top-20">
              <div className="relative book-cover h-96 md:h-full">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                {book.isNew && (
                  <div className="absolute top-4 right-4">
                    <span className="badge-gold">New Release</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Book Details */}
          <div>
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-block badge-gold capitalize">{book.category}</span>
            </div>

            {/* Title & Author */}
            <h1 className="text-4xl font-bold text-text-primary mb-2">{book.title}</h1>
            <p className="text-xl text-text-muted mb-6">by {book.author}</p>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border-warm">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.round(book.rating)
                        ? 'fill-accent-gold text-accent-gold'
                        : 'text-border-warm'
                    }`}
                  />
                ))}
              </div>
              <div>
                <span className="font-bold text-text-primary">{book.rating.toFixed(1)}</span>
                <span className="text-text-muted ml-2">({book.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-8">
              <p className="text-text-muted text-sm mb-2">Price</p>
              {book.originalPrice && book.originalPrice > book.price ? (
                <div className="flex items-baseline gap-4">
                  <p className="text-5xl font-bold text-accent-sale">${book.price}</p>
                  <p className="text-2xl text-text-muted line-through">${book.originalPrice}</p>
                  <span className="badge-sale">Sale</span>
                </div>
              ) : (
                <p className="text-5xl font-bold text-wood-dark">${book.price}</p>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="font-semibold text-text-primary mb-2">About This Book</h3>
              <p className="text-text-muted leading-relaxed">{book.description}</p>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  book.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-700'
                }`}
              >
                {book.inStock ? '● In Stock' : '● Out of Stock'}
              </span>
            </div>

            {/* Full Specification Sheet */}
            <div className="mb-8 bg-white rounded-lg border border-border-warm overflow-hidden">
              <h3 className="font-semibold text-text-primary px-4 pt-4 pb-2">Edition Details</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 p-4 pt-2">
                {book.editor && (
                  <div>
                    <p className="text-text-muted text-sm mb-1">Tahqiq / Editor</p>
                    <p className="font-semibold text-text-primary text-sm">{book.editor}</p>
                  </div>
                )}
                <div>
                  <p className="text-text-muted text-sm mb-1">Publishing House</p>
                  <p className="font-semibold text-text-primary text-sm">{book.publisher}</p>
                </div>
                {book.vocalization && (
                  <div>
                    <p className="text-text-muted text-sm mb-1">Vocalization</p>
                    <p className="font-semibold text-text-primary text-sm capitalize">
                      {book.vocalization === 'full'
                        ? 'Fully vocalized (harakat)'
                        : book.vocalization === 'partial'
                        ? 'Partially vocalized'
                        : 'Unvocalized'}
                    </p>
                  </div>
                )}
                <div>
                  <p className="text-text-muted text-sm mb-1">Language</p>
                  <p className="font-semibold text-text-primary text-sm capitalize">{book.language}</p>
                </div>
                <div>
                  <p className="text-text-muted text-sm mb-1">Binding</p>
                  <p className="font-semibold text-text-primary text-sm capitalize">{book.binding}</p>
                </div>
                <div>
                  <p className="text-text-muted text-sm mb-1">Pages{book.volumes && book.volumes > 1 ? ' / Volumes' : ''}</p>
                  <p className="font-semibold text-text-primary text-sm">
                    {book.pages}{book.volumes && book.volumes > 1 ? ` pages · ${book.volumes} volumes` : ' pages'}
                  </p>
                </div>
                {book.dimensions && (
                  <div>
                    <p className="text-text-muted text-sm mb-1">Dimensions</p>
                    <p className="font-semibold text-text-primary text-sm">{book.dimensions}</p>
                  </div>
                )}
                {book.printEdition && (
                  <div>
                    <p className="text-text-muted text-sm mb-1">Print Edition</p>
                    <p className="font-semibold text-text-primary text-sm">{book.printEdition}</p>
                  </div>
                )}
                {book.publicationYear && (
                  <div>
                    <p className="text-text-muted text-sm mb-1">Publication Year</p>
                    <p className="font-semibold text-text-primary text-sm">{book.publicationYear}</p>
                  </div>
                )}
                {book.paperQuality && (
                  <div className="col-span-2">
                    <p className="text-text-muted text-sm mb-1">Paper Quality</p>
                    <p className="font-semibold text-text-primary text-sm">{book.paperQuality}</p>
                  </div>
                )}
                <div>
                  <p className="text-text-muted text-sm mb-1">ISBN</p>
                  <p className="font-semibold text-text-primary text-sm">{book.isbn}</p>
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="mb-8">
              <label className="text-text-muted text-sm mb-2 block">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border-warm rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 text-wood-dark hover:bg-parchment transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 text-wood-dark hover:bg-parchment transition-colors"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!book.inStock}
                  className="flex-1 btn-primary text-lg py-3 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {!book.inStock ? 'Out of Stock' : isAdded ? 'Added to Cart!' : 'Add to Cart'}
                </button>
              </div>
            </div>

            {/* Wishlist & Share */}
            <div className="flex gap-4 mb-8">
              <button
                onClick={() => toggle(book.id)}
                className={`flex-1 py-3 rounded-lg border-2 transition-colors flex items-center justify-center gap-2 ${
                  isWishlisted
                    ? 'border-red-500 bg-red-50 text-red-600'
                    : 'border-border-warm hover:border-wood-dark'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>
              <button className="flex-1 btn-secondary py-3 flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            {/* Shipping Info */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">
                ✓ Free shipping on orders over $50 | ✓ 100% Authentic | ✓ 30-day returns
              </p>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        {book.tableOfContents && (
          <div className="mb-16 bg-white rounded-lg border border-border-warm p-8">
            <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-wood-dark" />
              Table of Contents
            </h2>
            <ul className="space-y-2">
              {book.tableOfContents.map((chapter, index) => (
                <li key={index} className="text-text-muted flex items-center gap-3">
                  <span className="w-6 h-6 flex items-center justify-center rounded-full bg-parchment text-xs font-semibold text-wood-dark">
                    {index + 1}
                  </span>
                  {chapter}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Related Books */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-text-primary mb-8">Related Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBooks.map((relBook) => (
              <Link key={relBook.id} href={`/books/${relBook.id}`}>
                <div className="group cursor-pointer">
                  <div className="mb-4 relative overflow-hidden rounded-lg book-cover h-80">
                    <img
                      src={relBook.image}
                      alt={relBook.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-semibold text-text-primary group-hover:text-wood-dark transition-colors line-clamp-2">
                    {relBook.title}
                  </h3>
                  <p className="text-text-muted text-sm mb-2">{relBook.author}</p>
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < Math.round(relBook.rating)
                            ? 'fill-accent-gold text-accent-gold'
                            : 'text-border-warm'
                        }`}
                      />
                    ))}
                    <span className="text-text-muted text-xs ml-1">({relBook.reviews})</span>
                  </div>
                  <p className="text-2xl font-bold text-wood-dark">${relBook.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
