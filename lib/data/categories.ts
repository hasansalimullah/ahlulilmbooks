export interface CategorySubgroup {
  name: string
  subcategory: string
}

export interface CategoryInfo {
  id: 'aqeedah' | 'fiqh' | 'hadith' | 'quran-tafsir' | 'history' | 'muslim-family' | 'arabic'
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
      { name: 'Kitab At-Tawhid Explanations', subcategory: 'commentaries' },
      { name: 'Al-Aqidah Al-Wasitiyyah Explanations', subcategory: 'commentaries' },
      { name: 'Sects & Refutations', subcategory: 'refutations' },
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
    id: 'quran-tafsir',
    name: "Qur'an & Tafsir",
    subtitle: 'Qur\'anic Exegesis',
    description: 'Translations and commentary of the Qur\'an',
    longDescription:
      'Mushaf editions, word-for-word translations, and the great works of tafsir (Qur\'anic exegesis) from classical and contemporary scholars.',
    subgroups: [
      { name: 'Tafsir Collections', subcategory: 'tafsir-collections' },
      { name: 'Word-by-Word Translations', subcategory: 'word-by-word' },
      { name: 'Tajweed & Recitation', subcategory: 'tajweed' },
      { name: "Virtues of the Qur'an", subcategory: 'virtues' },
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
    id: 'history',
    name: 'History',
    subtitle: 'Islamic History',
    description: 'Seerah, companions, and early Islamic civilization',
    longDescription:
      'Biographical and historical works — the life of the Prophet Muhammad ﷺ, his companions, and the history of early Islam and the great Islamic civilizations that followed.',
    subgroups: [
      { name: 'Life of the Prophet ﷺ (Seerah)', subcategory: 'life-of-prophet' },
      { name: 'The Companions (Sahabah)', subcategory: 'companions' },
      { name: 'Early Islamic History', subcategory: 'early-history' },
      { name: 'Stories of the Prophets', subcategory: 'prophets' },
    ],
  },
  {
    id: 'muslim-family',
    name: 'Muslim Family',
    subtitle: 'Marriage & Parenting',
    description: 'Guidance for the Muslim household',
    longDescription:
      'Practical guidance rooted in the Qur\'an and Sunnah for marriage, raising children, and running a household according to Islamic etiquette.',
    subgroups: [
      { name: 'Marriage in Islam', subcategory: 'marriage' },
      { name: 'Parenting & Children', subcategory: 'parenting' },
      { name: 'Women in Islam', subcategory: 'women' },
      { name: 'Household Etiquette', subcategory: 'etiquette' },
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
