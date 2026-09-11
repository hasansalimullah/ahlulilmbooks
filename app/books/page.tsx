'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { books } from '@/lib/data/books'
import { useCart } from '@/lib/context/CartContext'
import { Search, Filter, Star, ShoppingCart } from 'lucide-react'

export default function BooksPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [selectedBinding, setSelectedBinding] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('newest')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const { addItem } = useCart()

  const filteredBooks = useMemo(() => {
    let result = books

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter((book) => book.category === selectedCategory)
    }

    // Language filter
    if (selectedLanguage) {
      result = result.filter((book) => book.language === selectedLanguage)
    }

    // Price filter
    result = result.filter(
      (book) => book.price >= priceRange[0] && book.price <= priceRange[1]
    )

    // Binding filter
    if (selectedBinding) {
      result = result.filter((book) => book.binding === selectedBinding)
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
      default:
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    }

    return result
  }, [searchTerm, selectedCategory, selectedLanguage, priceRange, selectedBinding, sortBy])

  const categories = ['aqeedah', 'fiqh', 'hadith', 'seerah', 'arabic']
  const languages = ['english', 'arabic', 'bilingual']
  const bindings = ['hardcover', 'paperback', 'leather']

  const categoryLabels: Record<string, string> = {
    aqeedah: 'Aqeedah (Creed)',
    fiqh: 'Fiqh (Jurisprudence)',
    hadith: 'Hadith (Traditions)',
    seerah: 'Seerah (Biography)',
    arabic: 'Arabic Language',
  }

  return (
    <div className="min-h-screen bg-parchment">
      {/* Search Bar */}
      <section className="bg-white border-b border-border-warm py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-3 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-border-warm rounded-lg focus:outline-none focus:border-wood-dark text-text-primary"
            />
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div
            className={`lg:col-span-1 ${
              isFilterOpen ? 'block' : 'hidden lg:block'
            } bg-white rounded-lg p-6 h-fit border border-border-warm`}
          >
            <div className="flex items-center justify-between mb-6 lg:block">
              <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h2>
              <button
                onClick={() => setIsFilterOpen(false)}
                className="lg:hidden text-text-muted"
              >
                ✕
              </button>
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-text-primary mb-3">Category</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={selectedCategory === ''}
                    onChange={() => setSelectedCategory('')}
                    className="w-4 h-4"
                  />
                  <span className="text-text-muted text-sm">All Categories</span>
                </label>
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="w-4 h-4"
                    />
                    <span className="text-text-muted text-sm">{categoryLabels[cat]}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Language Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-text-primary mb-3">Language</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={selectedLanguage === ''}
                    onChange={() => setSelectedLanguage('')}
                    className="w-4 h-4"
                  />
                  <span className="text-text-muted text-sm">All Languages</span>
                </label>
                {languages.map((lang) => (
                  <label key={lang} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={selectedLanguage === lang}
                      onChange={() => setSelectedLanguage(lang)}
                      className="w-4 h-4"
                    />
                    <span className="text-text-muted text-sm capitalize">{lang}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-text-primary mb-3">Price Range</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-text-muted">Min: ${priceRange[0]}</label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[0]}
                    onChange={(e) =>
                      setPriceRange([parseInt(e.target.value), priceRange[1]])
                    }
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm text-text-muted">Max: ${priceRange[1]}</label>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={priceRange[1]}
                    onChange={(e) =>
                      setPriceRange([priceRange[0], parseInt(e.target.value)])
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Binding Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-text-primary mb-3">Binding Type</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={selectedBinding === ''}
                    onChange={() => setSelectedBinding('')}
                    className="w-4 h-4"
                  />
                  <span className="text-text-muted text-sm">All Types</span>
                </label>
                {bindings.map((binding) => (
                  <label key={binding} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={selectedBinding === binding}
                      onChange={() => setSelectedBinding(binding)}
                      className="w-4 h-4"
                    />
                    <span className="text-text-muted text-sm capitalize">{binding}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSelectedCategory('')
                setSelectedLanguage('')
                setPriceRange([0, 200])
                setSelectedBinding('')
                setSearchTerm('')
              }}
              className="btn-secondary w-full"
            >
              Clear All Filters
            </button>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg border border-border-warm">
              <p className="text-text-muted text-sm">
                Found <span className="font-bold text-text-primary">{filteredBooks.length}</span> books
              </p>
              <div className="flex items-center gap-2">
                <label className="text-text-muted text-sm">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-border-warm rounded-lg focus:outline-none focus:border-wood-dark text-sm"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="lg:hidden btn-secondary text-sm"
              >
                <Filter className="w-4 h-4 inline mr-2" />
                Filters
              </button>
            </div>

            {/* Books Grid */}
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredBooks.map((book) => (
                  <Link key={book.id} href={`/books/${book.id}`}>
                    <div className="group cursor-pointer">
                      <div className="mb-4 relative overflow-hidden rounded-lg book-cover h-80">
                        <img
                          src={book.image}
                          alt={book.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                      </div>
                      <h3 className="font-semibold text-text-primary group-hover:text-wood-dark transition-colors line-clamp-2">
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
                      <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-border-warm">
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
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-border-warm">
                <p className="text-text-muted text-lg mb-4">No books found matching your filters</p>
                <button
                  onClick={() => {
                    setSelectedCategory('')
                    setSelectedLanguage('')
                    setPriceRange([0, 200])
                    setSelectedBinding('')
                    setSearchTerm('')
                  }}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
