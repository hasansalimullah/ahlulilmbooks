'use client'

import { useState } from 'react'
import Link from 'next/link'
import { books } from '@/lib/data/books'
import { useCart } from '@/lib/context/CartContext'
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from 'lucide-react'

export function NewArrivalsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { addItem } = useCart()
  const newBooks = books.filter((book) => book.isNew).slice(0, 6)
  const itemsPerPage = 3

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + itemsPerPage) % newBooks.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - itemsPerPage + newBooks.length) % newBooks.length)
  }

  const visibleBooks = newBooks.slice(currentIndex, currentIndex + itemsPerPage)

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {visibleBooks.map((book) => (
          <Link key={book.id} href={`/books/${book.id}`}>
            <div className="group cursor-pointer">
              <div className="mb-4 relative overflow-hidden rounded-lg book-cover h-80">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="badge-gold">New</span>
                </div>
              </div>
              <h3 className="font-semibold text-text-primary group-hover:text-wood-dark transition-colors">
                {book.title}
              </h3>
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
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-wood-dark">${book.price}</span>
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    addItem(book.id, 1)
                  }}
                  className="p-2 bg-parchment hover:bg-wood-dark text-wood-dark hover:text-white rounded-lg transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-center gap-4">
        <button
          onClick={prevSlide}
          className="p-2 border border-border-warm rounded-lg hover:bg-parchment transition-colors"
        >
          <ChevronLeft className="w-6 h-6 text-wood-dark" />
        </button>
        <div className="flex items-center gap-2">
          {[...Array(Math.ceil(newBooks.length / itemsPerPage))].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i * itemsPerPage)}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.floor(currentIndex / itemsPerPage) === i
                  ? 'bg-wood-dark'
                  : 'bg-border-warm'
              }`}
            />
          ))}
        </div>
        <button
          onClick={nextSlide}
          className="p-2 border border-border-warm rounded-lg hover:bg-parchment transition-colors"
        >
          <ChevronRight className="w-6 h-6 text-wood-dark" />
        </button>
      </div>
    </div>
  )
}
