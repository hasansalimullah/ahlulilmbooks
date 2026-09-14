export interface CategorySubgroup {
  name: string
  subcategory: string
}

export interface CategoryInfo {
  id: 'aqeedah' | 'fiqh' | 'quran' | 'tafsir' | 'hadith' | 'history' | 'muslim-family' | 'arabic'
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
      'Books covering the foundational beliefs of Islam — Tawheed, the names and attributes of Allah, the creed of the Salaf, and the major matns and their explanations.',
    subgroups: [
      { name: 'Tawheed', subcategory: 'tawheed' },
      { name: 'Aqeedah Matn', subcategory: 'aqeedah-matn' },
      { name: 'Asma wa Sifat', subcategory: 'asma-wa-sifat' },
      { name: 'Iman', subcategory: 'iman' },
      { name: 'Sunnah & Salaf', subcategory: 'sunnah-salaf' },
      { name: 'Sects & Innovations', subcategory: 'sects-innovations' },
    ],
  },
  {
    id: 'fiqh',
    name: 'Fiqh',
    subtitle: 'Islamic Jurisprudence',
    description: 'Laws and practices across the four madhabs',
    longDescription:
      'Jurisprudence texts across the four schools of thought, comparative fiqh, and works organized by topic — worship, family, transactions, and contemporary issues.',
    subgroups: [
      { name: 'Hanafi', subcategory: 'hanafi' },
      { name: 'Maliki', subcategory: 'maliki' },
      { name: "Shafi'i", subcategory: 'shafii' },
      { name: 'Hanbali', subcategory: 'hanbali' },
      { name: 'Comparative Fiqh', subcategory: 'comparative-fiqh' },
      { name: 'Purification & Prayer', subcategory: 'purification-prayer' },
      { name: 'Fasting', subcategory: 'fasting' },
      { name: 'Hajj & Umrah', subcategory: 'hajj-umrah' },
      { name: 'Family', subcategory: 'family' },
      { name: 'Business & Finance', subcategory: 'business-finance' },
      { name: 'Contemporary Fiqh', subcategory: 'contemporary-fiqh' },
    ],
  },
  {
    id: 'quran',
    name: "Qur'an",
    subtitle: 'Mushafs & Qur\'anic Studies',
    description: 'Mushaf editions, translations, and Qur\'anic sciences',
    longDescription:
      'Mushaf editions, translations, tajwid and recitation manuals, memorization resources, and the classical sciences of the Qur\'an.',
    subgroups: [
      { name: 'Mushafs', subcategory: 'mushafs' },
      { name: 'Translation', subcategory: 'translation' },
      { name: 'Tajwid', subcategory: 'tajwid' },
      { name: 'Memorization', subcategory: 'memorization' },
      { name: "Qur'an Sciences", subcategory: 'quran-sciences' },
    ],
  },
  {
    id: 'tafsir',
    name: 'Tafsir',
    subtitle: "Qur'anic Exegesis",
    description: 'The great classical and contemporary works of tafsir',
    longDescription:
      'The major works of Qur\'anic exegesis, from Ibn Kathir and as-Sa\'di to the classical multi-volume commentaries, plus selected-surah studies and the principles of tafsir.',
    subgroups: [
      { name: 'Ibn Kathir', subcategory: 'ibn-kathir' },
      { name: "As-Sa'di", subcategory: 'as-sadi' },
      { name: 'Classical Tafsir', subcategory: 'classical-tafsir' },
      { name: 'Complete Tafsir', subcategory: 'complete-tafsir' },
      { name: 'Selected Surahs', subcategory: 'selected-surahs' },
      { name: 'Tafsir Sciences', subcategory: 'tafsir-sciences' },
    ],
  },
  {
    id: 'hadith',
    name: 'Hadith',
    subtitle: 'Prophetic Traditions',
    description: 'Sayings and actions of the Prophet',
    longDescription:
      'The recorded sayings, actions, and approvals of the Prophet Muhammad ﷺ — the major collections, thematic compilations, and the sciences of Hadith.',
    subgroups: [
      { name: 'Bukhari', subcategory: 'bukhari' },
      { name: 'Muslim', subcategory: 'muslim' },
      { name: 'Six Books', subcategory: 'six-books' },
      { name: 'Riyad as-Salihin', subcategory: 'riyad-as-salihin' },
      { name: '40 Hadith', subcategory: 'forty-hadith' },
      { name: 'Bulugh al-Maram', subcategory: 'bulugh-al-maram' },
      { name: 'Hadith Commentaries', subcategory: 'hadith-commentaries' },
      { name: 'Hadith Sciences', subcategory: 'hadith-sciences' },
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
