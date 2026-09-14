import Link from 'next/link'
import { notFound } from 'next/navigation'
import { books } from '@/lib/data/books'
import { categories, getCategory } from '@/lib/data/categories'
import { CategoryFilterPage } from '@/components/CategoryFilterPage'

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.id }))
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const category = getCategory(params.category)
  if (!category) return {}
  return {
    title: `${category.name} Books | AhlulIlmBooks`,
    description: category.longDescription,
  }
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = getCategory(params.category)
  if (!category) notFound()

  const categoryBooks = books.filter((book) => book.category === category.id)

  return (
    <div className="min-h-screen bg-section-bg">
      {/* Category hero */}
      <section className="bg-gradient-to-br from-wood-dark to-wood-light text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <nav className="text-sm mb-4 text-white/80">
            <Link href="/" className="hover:text-white">Home</Link>
            <span className="mx-2">/</span>
            <span>{category.name}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{category.name}</h1>
          <p className="text-xl text-white/90 mb-4">{category.subtitle}</p>
          <p className="max-w-2xl text-white/80">{category.longDescription}</p>
        </div>
      </section>

      {/* Other categories quick nav */}
      <section className="max-w-7xl mx-auto px-4 py-6 flex flex-wrap gap-3">
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/categories/${c.id}`}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              c.id === category.id
                ? 'bg-wood-dark text-white border-wood-dark'
                : 'bg-white text-text-primary border-border-warm hover:border-wood-dark'
            }`}
          >
            {c.name}
          </Link>
        ))}
      </section>

      {/* Faceted filters + books grid, scoped to this category only */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <CategoryFilterPage category={category} categoryBooks={categoryBooks} />
      </section>
    </div>
  )
}
