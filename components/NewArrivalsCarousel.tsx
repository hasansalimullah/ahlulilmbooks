'use client'

import { useState } from 'react'
import { books } from '@/lib/data/books'
import { BookCard } from '@/components/BookCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export function NewArrivalsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
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
          <BookCard key={book.id} book={book} />
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
