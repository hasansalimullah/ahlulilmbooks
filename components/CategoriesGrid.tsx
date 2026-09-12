import Link from 'next/link'
import { BookOpen, ScrollText, Scroll, Users, Languages, BookMarked, Landmark } from 'lucide-react'
import { categories } from '@/lib/data/categories'

const icons = {
  aqeedah: BookOpen,
  fiqh: ScrollText,
  'quran-tafsir': BookMarked,
  hadith: Scroll,
  history: Landmark,
  'muslim-family': Users,
  arabic: Languages,
}

const colors = {
  aqeedah: 'from-wood-dark/10 to-wood-light/10',
  fiqh: 'from-amber-100 to-orange-100',
  'quran-tafsir': 'from-orange-100 to-amber-50',
  hadith: 'from-amber-50 to-yellow-50',
  history: 'from-orange-50 to-red-50',
  'muslim-family': 'from-yellow-50 to-amber-100',
  arabic: 'from-amber-50 to-orange-50',
}

export function CategoriesGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
      {categories.map((category) => {
        const Icon = icons[category.id]
        return (
          <Link key={category.id} href={`/categories/${category.id}`}>
            <div className={`p-6 rounded-lg cursor-pointer transition-all hover:shadow-book group bg-gradient-to-br ${colors[category.id]} border border-border-warm`}>
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
