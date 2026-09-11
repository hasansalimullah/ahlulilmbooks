import Link from 'next/link'

export function HeroBanner() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-wood-dark/5 to-wood-light/5 border-y border-border-warm">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Text Content */}
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
              Discover Islamic Wisdom
            </h1>
            <p className="text-xl text-text-muted mb-8 leading-relaxed">
              Explore our comprehensive collection of authentic Islamic books, from classical scholars to contemporary interpretations. Every volume is carefully curated to support your journey in Islamic knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/books">
                <button className="btn-primary text-lg px-8 py-3">
                  Browse All Books
                </button>
              </Link>
              <button className="btn-secondary text-lg px-8 py-3">
                Take Our Quiz
              </button>
            </div>
          </div>

          {/* Right: Featured Book Image */}
          <div className="flex justify-center">
            <div className="relative w-80 h-96">
              <div className="absolute inset-0 bg-gradient-to-br from-wood-dark/10 to-wood-light/10 rounded-lg transform rotate-3" />
              <img
                src="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop"
                alt="Featured Book"
                className="relative w-full h-full object-cover rounded-lg book-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg p-4 shadow-lg max-w-xs">
                <p className="text-sm font-semibold text-wood-dark">The Sealed Nectar</p>
                <p className="text-xs text-text-muted">★★★★★ 521 Reviews</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
