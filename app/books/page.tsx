'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { books } from '@/lib/data/books'
import { categories } from '@/lib/data/categories'
import { BookCard } from '@/components/BookCard'
import { Search, Filter } from 'lucide-react'

function BooksPageContent() {
  const searchParams = useSearchParams()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('')
  const [selectedLanguage, setSelectedLanguage] = useState<string>('')
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [selectedBinding, setSelectedBinding] = useState<string>('')
  const [selectedPublisher, setSelectedPublisher] = useState<string>('')
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [stockFilter, setStockFilter] = useState<string>('')
  const [fullHarakatOnly, setFullHarakatOnly] = useState(false)
  const [sortBy, setSortBy] = useState<string>('newest')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  // Pick up ?category=, ?subcategory=, and ?vocalization= from mega menu / nav links
  useEffect(() => {
    const categoryParam = searchParams.get('category')
    const subcategoryParam = searchParams.get('subcategory')
    const vocalizationParam = searchParams.get('vocalization')
    if (categoryParam) setSelectedCategory(categoryParam)
    if (subcategoryParam) setSelectedSubcategory(subcategoryParam)
    if (vocalizationParam === 'full') setFullHarakatOnly(true)
  }, [searchParams])

  const filteredBooks = useMemo(() => {
    let result = books

    // Search filter (title, author, or publisher — matches "instant keyword search")
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (book) =>
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term) ||
          book.publisher.toLowerCase().includes(term)
      )
    }

    if (selectedCategory) {
      result = result.filter((book) => book.category === selectedCategory)
    }

    if (selectedSubcategory) {
      result = result.filter((book) => book.subcategory === selectedSubcategory)
    }

    if (selectedLanguage) {
      result = result.filter((book) => book.language === selectedLanguage)
    }

    result = result.filter(
      (book) => book.price >= priceRange[0] && book.price <= priceRange[1]
    )

    if (selectedBinding) {
      result = result.filter((book) => book.binding === selectedBinding)
    }

    if (selectedPublisher) {
      result = result.filter((book) => book.publisher === selectedPublisher)
    }

    if (selectedYear) {
      result = result.filter((book) => String(book.publicationYear) === selectedYear)
    }

    if (stockFilter === 'in-stock') {
      result = result.filter((book) => book.inStock)
    } else if (stockFilter === 'out-of-stock') {
      result = result.filter((book) => !book.inStock)
    }

    if (fullHarakatOnly) {
      result = result.filter((book) => book.vocalization === 'full')
    }

    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating)
        break
      case 'year-new':
        result = [...result].sort((a, b) => (b.publicationYear || 0) - (a.publicationYear || 0))
        break
      case 'newest':
      default:
        result = [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    }

    return result
  }, [
    searchTerm,
    selectedCategory,
    selectedSubcategory,
    selectedLanguage,
    priceRange,
    selectedBinding,
    selectedPublisher,
    selectedYear,
    stockFilter,
    fullHarakatOnly,
    sortBy,
  ])

  const categoryIds = categories.map((c) => c.id)
  const languages = ['english', 'arabic', 'bilingual']
  const bindings = ['hardcover', 'paperback', 'leather']
  const publishers = Array.from(new Set(books.map((b) => b.publisher))).sort()
  const years = Array.from(
    new Set(books.map((b) => b.publicationYear).filter((y): y is number => !!y))
  ).sort((a, b) => b - a)

  const categoryLabels: Record<string, string> = Object.fromEntries(
    categories.map((c) => [c.id, `${c.name} (${c.subtitle})`])
  )

  const activeSubgroups = categories.find((c) => c.id === selectedCategory)?.subgroups || []

  const clearAll = () => {
    setSelectedCategory('')
    setSelectedSubcategory('')
    setSelectedLanguage('')
    setPriceRange([0, 200])
    setSelectedBinding('')
    setSelectedPublisher('')
    setSelectedYear('')
    setStockFilter('')
    setFullHarakatOnly(false)
    setSearchTerm('')
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
              placeholder="Search by title, author, or publisher..."
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
                    onChange={() => {
                      setSelectedCategory('')
                      setSelectedSubcategory('')
                    }}
                    className="w-4 h-4"
                  />
                  <span className="text-text-muted text-sm">All Categories</span>
                </label>
                {categoryIds.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={selectedCategory === cat}
                      onChange={() => {
                        setSelectedCategory(cat)
                        setSelectedSubcategory('')
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-text-muted text-sm">{categoryLabels[cat]}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Subcategory Filter — only shown once a category is picked */}
            {activeSubgroups.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-text-primary mb-3">Subcategory</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={selectedSubcategory === ''}
                      onChange={() => setSelectedSubcategory('')}
                      className="w-4 h-4"
                    />
                    <span className="text-text-muted text-sm">All Subcategories</span>
                  </label>
                  {activeSubgroups.map((group) => (
                    <label key={group.subcategory} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={selectedSubcategory === group.subcategory}
                        onChange={() => setSelectedSubcategory(group.subcategory)}
                        className="w-4 h-4"
                      />
                      <span className="text-text-muted text-sm">{group.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

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

            {/* Stock Status Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-text-primary mb-3">Stock Status</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={stockFilter === ''}
                    onChange={() => setStockFilter('')}
                    className="w-4 h-4"
                  />
                  <span className="text-text-muted text-sm">All</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={stockFilter === 'in-stock'}
                    onChange={() => setStockFilter('in-stock')}
                    className="w-4 h-4"
                  />
                  <span className="text-text-muted text-sm">In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={stockFilter === 'out-of-stock'}
                    onChange={() => setStockFilter('out-of-stock')}
                    className="w-4 h-4"
                  />
                  <span className="text-text-muted text-sm">Out of Stock</span>
                </label>
              </div>
            </div>

            {/* 100% Harakat Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-text-primary mb-3">Vocalization</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={fullHarakatOnly}
                  onChange={(e) => setFullHarakatOnly(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-text-muted text-sm">100% Harakat only</span>
              </label>
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

            {/* Publisher Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-text-primary mb-3">Publisher</h3>
              <select
                value={selectedPublisher}
                onChange={(e) => setSelectedPublisher(e.target.value)}
                className="w-full px-3 py-2 border border-border-warm rounded-lg focus:outline-none focus:border-wood-dark text-sm"
              >
                <option value="">All Publishers</option>
                {publishers.map((pub) => (
                  <option key={pub} value={pub}>
                    {pub}
                  </option>
                ))}
              </select>
            </div>

            {/* Publication Year Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-text-primary mb-3">Publication Year</h3>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 py-2 border border-border-warm rounded-lg focus:outline-none focus:border-wood-dark text-sm"
              >
                <option value="">All Years</option>
                {years.map((year) => (
                  <option key={year} value={String(year)}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Clear Filters */}
            <button onClick={clearAll} className="btn-secondary w-full">
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
                  <option value="year-new">Publication Year</option>
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
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-border-warm">
                <p className="text-text-muted text-lg mb-4">No books found matching your filters</p>
                <button onClick={clearAll} className="btn-primary">
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

export default function BooksPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-parchment" />}>
      <BooksPageContent />
    </Suspense>
  )
}
