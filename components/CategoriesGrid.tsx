import Link from 'next/link'
import { BookOpen, ScrollText, Scroll, Users, Languages } from 'lucide-react'

export function CategoriesGrid() {
  const categories = [
    {
      id: 'aqeedah',
      name: 'Aqeedah',
      subtitle: 'Islamic Creed',
      description: 'Foundational beliefs and theology',
      icon: BookOpen,
      color: 'from-wood-dark/10 to-wood-light/10',
    },
    {
      id: 'fiqh',
      name: 'Fiqh',
      subtitle: 'Islamic Jurisprudence',
      description: 'Laws and practices of Islam',
      icon: ScrollText,
      color: 'from-amber-100 to-orange-100',
    },
    {
      id: 'hadith',
      name: 'Hadith',
      subtitle: 'Prophetic Traditions',
      description: 'Sayings and actions of the Prophet',
      icon: Scroll,
      color: 'from-amber-50 to-yellow-50',
    },
    {
      id: 'seerah',
      name: 'Seerah',
      subtitle: 'Biography',
      description: 'Life of Prophet Muhammad',
      icon: Users,
      color: 'from-orange-50 to-red-50',
    },
    {
      id: 'arabic',
      name: 'Arabic',
      subtitle: 'Language Studies',
      description: 'Classical and modern Arabic',
      icon: Languages,
      color: 'from-amber-50 to-orange-50',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <Link key={category.id} href={`/books?category=${category.id}`}>
            <div className={`p-6 rounded-lg cursor-pointer transition-all hover:shadow-book group bg-gradient-to-br ${category.color} border border-border-warm`}>
              <div className="mb-4">
                <Icon className="w-10 h-10 text-wood-dark group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-1">{category.name}</h3>
              <p className="text-wood-dark text-sm font-medium mb-2">{category.subtitle}</p>
              <p className="text-text-muted text-sm">{category.description}</p>
              <div className="mt-4 text-wood-dark font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Explore →
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
