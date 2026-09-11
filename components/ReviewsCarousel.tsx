'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star, CheckCircle } from 'lucide-react'

export function ReviewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const reviews = [
    {
      id: '1',
      author: 'Ahmed Hassan',
      rating: 5,
      text: 'Exceptional quality! The books arrived in perfect condition and the selection is incredible. This is my go-to source for authentic Islamic literature.',
      verified: true,
    },
    {
      id: '2',
      author: 'Fatima Al-Rashid',
      rating: 5,
      text: 'Fast shipping worldwide and excellent customer service. I\'ve purchased multiple times and every transaction has been smooth.',
      verified: true,
    },
    {
      id: '3',
      author: 'Muhammad Khan',
      rating: 5,
      text: 'The attention to detail in book selection and packaging is remarkable. These are genuine, high-quality Islamic books you won\'t find elsewhere.',
      verified: true,
    },
    {
      id: '4',
      author: 'Zainab Mohamed',
      rating: 5,
      text: 'Finally, a bookstore that truly understands the value of authentic Islamic education. Highly recommended to all students of knowledge!',
      verified: true,
    },
    {
      id: '5',
      author: 'Ismail Abdullah',
      rating: 5,
      text: 'Professional, reliable, and trustworthy. The team really cares about connecting people with quality Islamic literature.',
      verified: true,
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  }

  const getVisibleReviews = () => {
    return [
      reviews[currentIndex],
      reviews[(currentIndex + 1) % reviews.length],
    ]
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {getVisibleReviews().map((review) => (
          <div key={review.id} className="bg-white border border-border-warm rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-text-primary">{review.author}</h3>
                {review.verified && (
                  <div className="flex items-center gap-1 mt-1 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-xs">Verified Buyer</span>
                  </div>
                )}
              </div>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? 'fill-accent-gold text-accent-gold'
                        : 'text-border-warm'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-text-muted italic">"{review.text}"</p>
          </div>
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
          {[...Array(reviews.length)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentIndex === i ? 'bg-wood-dark' : 'bg-border-warm'
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
