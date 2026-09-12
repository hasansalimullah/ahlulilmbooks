export interface CategoryInfo {
  id: 'aqeedah' | 'fiqh' | 'hadith' | 'seerah' | 'arabic'
  name: string
  subtitle: string
  description: string
  longDescription: string
}

export const categories: CategoryInfo[] = [
  {
    id: 'aqeedah',
    name: 'Aqeedah',
    subtitle: 'Islamic Creed',
    description: 'Foundational beliefs and theology',
    longDescription:
      'Books covering the foundational beliefs of Islam — the nature of Tawheed, the names and attributes of Allah, and the creed of the pious predecessors (Salaf as-Salih), from classical texts to contemporary explanations.',
  },
  {
    id: 'fiqh',
    name: 'Fiqh',
    subtitle: 'Islamic Jurisprudence',
    description: 'Laws and practices of Islam',
    longDescription:
      'Jurisprudence texts spanning worship, transactions, and daily practice, including classical and contemporary works across the major schools of thought.',
  },
  {
    id: 'hadith',
    name: 'Hadith',
    subtitle: 'Prophetic Traditions',
    description: 'Sayings and actions of the Prophet',
    longDescription:
      'The recorded sayings, actions, and approvals of the Prophet Muhammad ﷺ, including the major collections and their commentaries.',
  },
  {
    id: 'seerah',
    name: 'Seerah',
    subtitle: 'Biography',
    description: 'Life of Prophet Muhammad',
    longDescription:
      'Biographical works detailing the life of the Prophet Muhammad ﷺ — his character, his companions, and the history of early Islam.',
  },
  {
    id: 'arabic',
    name: 'Arabic',
    subtitle: 'Language Studies',
    description: 'Classical and modern Arabic',
    longDescription:
      'Resources for learning classical and modern Arabic, from beginner grammar primers to advanced texts for students of Islamic scholarship.',
  },
]

export function getCategory(id: string) {
  return categories.find((c) => c.id === id)
}
