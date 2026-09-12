export interface CategorySubgroup {
  name: string
  subcategory: string
}

export interface CategoryInfo {
  id: 'aqeedah' | 'fiqh' | 'hadith' | 'seerah' | 'arabic'
  name: string
  subtitle: string
  description: string
  longDescription: string
  subgroups: CategorySubgroup[]
}

export const categories: CategoryInfo[] = [
  {
    id: 'aqeedah',
    name: 'Aqeedah',
    subtitle: 'Islamic Creed',
    description: 'Foundational beliefs and theology',
    longDescription:
      'Books covering the foundational beliefs of Islam — the nature of Tawheed, the names and attributes of Allah, and the creed of the pious predecessors (Salaf as-Salih), from classical texts to contemporary explanations.',
    subgroups: [
      { name: 'Tawheed & the Names of Allah', subcategory: 'tawheed' },
      { name: 'Foundational Creed Texts', subcategory: 'foundational-texts' },
      { name: 'Explanations & Commentaries', subcategory: 'commentaries' },
      { name: 'Sects & Refutations', subcategory: 'refutations' },
      { name: "Tafsir & Qur'anic Studies", subcategory: 'tafsir' },
    ],
  },
  {
    id: 'fiqh',
    name: 'Fiqh',
    subtitle: 'Islamic Jurisprudence',
    description: 'Laws and practices of Islam',
    longDescription:
      'Jurisprudence texts spanning worship, transactions, and daily practice, including classical and contemporary works across the major schools of thought.',
    subgroups: [
      { name: 'Fiqh of Worship (Ibadat)', subcategory: 'worship' },
      { name: 'Fiqh of Transactions (Muamalat)', subcategory: 'transactions' },
      { name: 'Islamic Finance & Banking', subcategory: 'finance' },
      { name: 'Usul al-Fiqh (Methodology)', subcategory: 'usul' },
      { name: 'Comparative Madhab Studies', subcategory: 'comparative' },
    ],
  },
  {
    id: 'hadith',
    name: 'Hadith',
    subtitle: 'Prophetic Traditions',
    description: 'Sayings and actions of the Prophet',
    longDescription:
      'The recorded sayings, actions, and approvals of the Prophet Muhammad ﷺ, including the major collections and their commentaries.',
    subgroups: [
      { name: 'The Six Major Collections', subcategory: 'six-collections' },
      { name: 'Hadith Sciences (Mustalah)', subcategory: 'sciences' },
      { name: '40 Hadith Compilations', subcategory: 'forty-hadith' },
      { name: 'Commentaries (Shuruh)', subcategory: 'shuruh' },
    ],
  },
  {
    id: 'seerah',
    name: 'Seerah',
    subtitle: 'Biography',
    description: 'Life of Prophet Muhammad',
    longDescription:
      'Biographical works detailing the life of the Prophet Muhammad ﷺ — his character, his companions, and the history of early Islam.',
    subgroups: [
      { name: 'Life of the Prophet ﷺ', subcategory: 'life-of-prophet' },
      { name: 'The Companions (Sahabah)', subcategory: 'companions' },
      { name: 'Early Islamic History', subcategory: 'early-history' },
      { name: 'Stories of the Prophets', subcategory: 'prophets' },
    ],
  },
  {
    id: 'arabic',
    name: 'Arabic',
    subtitle: 'Language Studies',
    description: 'Classical and modern Arabic',
    longDescription:
      'Resources for learning classical and modern Arabic, from beginner grammar primers to advanced texts for students of Islamic scholarship.',
    subgroups: [
      { name: 'Grammar (Nahw & Sarf)', subcategory: 'grammar' },
      { name: 'Beginner Courses', subcategory: 'beginner' },
      { name: 'Vocabulary & Reading', subcategory: 'vocabulary' },
      { name: 'Classical Texts', subcategory: 'classical' },
    ],
  },
]

export function getCategory(id: string) {
  return categories.find((c) => c.id === id)
}
