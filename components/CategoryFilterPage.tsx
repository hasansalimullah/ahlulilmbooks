'use client'

import { useMemo, useState } from 'react'
import { Book } from '@/lib/types'
import { CategoryInfo } from '@/lib/data/categories'
import { BookCard } from '@/components/BookCard'
import { Filter } from 'lucide-react'

interface FacetOption {
  value: string
  label: string
  count: number
}

function buildFacet(books: Book[], getValue: (b: Book) => string | undefined, labelFor?: (v: string) => string): FacetOption[] {
  const counts = new Map<string, number>()
  books.forEach((b) => {
    const v = getValue(b)
    if (!v) return
    counts.set(v, (counts.get(v) || 0) + 1)
  })
  return Array.from(counts.entries())
    .map(([value, count]) => ({ value, count, label: labelFor ? labelFor(value) : value }))
    .sort((a, b) => b.count - a.count)
}

const vocalizationLabels: Record<string, string> = {
  full: 'In Majority or Totality',
  partial: 'In Part',
  none: 'None or a little bit',
}

export function CategoryFilterPage({
  category,
  categoryBooks,
}: {
  category: CategoryInfo
  categoryBooks: Book[]
}) {
  const [subcategory, setSubcategory] = useState<string>('')
  const [vocalization, setVocalization] = useState<string>('')
  const [author, setAuthor] = useState<string>('')
  const [publisher, setPublisher] = useState<string>('')
  const [binding, setBinding] = useState<string>('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const subcategoryFacet = useMemo(
    () =>
      buildFacet(
        categoryBooks,
        (b) => b.subcategory,
        (v) => category.subgroups.find((g) => g.subcategory === v)?.name || v
      ),
    [categoryBooks, category.subgroups]
  )
  const vocalizationFacet = useMemo(
    () => buildFacet(categoryBooks, (b) => b.vocalization, (v) => vocalizationLabels[v] || v),
    [categoryBooks]
  )
  const authorFacet = useMemo(() => buildFacet(categoryBooks, (b) => b.author), [categoryBooks])
  const publisherFacet = useMemo(() => buildFacet(categoryBooks, (b) => b.publisher), [categoryBooks])
  const bindingFacet = useMemo(
    () => buildFacet(categoryBooks, (b) => b.binding, (v) => v.charAt(0).toUpperCase() + v.slice(1)),
    [categoryBooks]
  )

  const filteredBooks = useMemo(() => {
    return categoryBooks.filter((b) => {
      if (subcategory && b.subcategory !== subcategory) return false
      if (vocalization && b.vocalization !== vocalization) return false
      if (author && b.author !== author) return false
      if (publisher && b.publisher !== publisher) return false
      if (binding && b.binding !== binding) return false
      return true
    })
  }, [categoryBooks, subcategory, vocalization, author, publisher, binding])

  const clearAll = () => {
    setSubcategory('')
    setVocalization('')
    setAuthor('')
    setPublisher('')
    setBinding('')
  }

  const hasActiveFilters = !!(subcategory || vocalization || author || publisher || binding)

  const renderFacet = (
    title: string,
    options: FacetOption[],
    selected: string,
    onSelect: (v: string) => void
  ) => {
    if (options.length === 0) return null
    return (
      <div className="mb-6">
        <h3 className="font-semibold text-text-primary mb-3">{title}</h3>
        <div className="space-y-1.5">
          <label className="flex items-center justify-between gap-2 cursor-pointer group">
            <span className="flex items-center gap-2">
              <input
                type="radio"
                checked={selected === ''}
                onChange={() => onSelect('')}
                className="w-4 h-4"
              />
              <span className="text-text-muted text-sm group-hover:text-text-primary">All</span>
            </span>
          </label>
          {options.map((opt) => (
            <label key={opt.value} className="flex items-center justify-between gap-2 cursor-pointer group">
              <span className="flex items-center gap-2 min-w-0">
                <input
                  type="radio"
                  checked={selected === opt.value}
                  onChange={() => onSelect(opt.value)}
                  className="w-4 h-4 shrink-0"
                />
                <span className="text-text-muted text-sm group-hover:text-text-primary truncate">{opt.label}</span>
              </span>
              <span className="text-xs text-text-muted shrink-0">{opt.count}</span>
            </label>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Facet Sidebar */}
      <div
        className={`lg:col-span-1 ${
          isFilterOpen ? 'block' : 'hidden lg:block'
        } bg-white rounded-lg p-6 h-fit border border-border-warm`}
      >
        <div className="flex items-center justify-between mb-4 lg:block">
          <h2 className="text-xl font-bold text-text-primary flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Refine {category.name}
          </h2>
          <button onClick={() => setIsFilterOpen(false)} className="lg:hidden text-text-muted">
            ✕
          </button>
        </div>
        {hasActiveFilters && (
          <button onClick={clearAll} className="text-xs text-wood-dark hover:underline mb-4">
            Clear all filters
          </button>
        )}

        {renderFacet('Category', subcategoryFacet, subcategory, setSubcategory)}
        {renderFacet('Harakat', vocalizationFacet, vocalization, setVocalization)}
        {renderFacet('Author', authorFacet, author, setAuthor)}
        {renderFacet('Edition', publisherFacet, publisher, setPublisher)}
        {renderFacet('Cover', bindingFacet, binding, setBinding)}
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        <div className="flex items-center justify-between mb-6 bg-white p-4 rounded-lg border border-border-warm">
          <p className="text-text-muted text-sm">
            <span className="font-bold text-text-primary">{filteredBooks.length}</span> books
            {hasActiveFilters ? ' matching your filters' : ` in ${category.name}`}
          </p>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="lg:hidden btn-secondary text-sm"
          >
            <Filter className="w-4 h-4 inline mr-2" />
            Filters
          </button>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border border-border-warm">
            <p className="text-text-muted text-lg mb-4">No books match these filters</p>
            <button onClick={clearAll} className="btn-primary">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
