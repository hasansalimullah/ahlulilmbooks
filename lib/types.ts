export interface Book {
  id: string
  title: string
  author: string
  price: number
  image: string
  imageAlt?: string
  category: 'aqeedah' | 'fiqh' | 'hadith' | 'seerah' | 'arabic'
  subcategory?: string
  description: string
  rating: number
  reviews: number
  binding: 'hardcover' | 'paperback' | 'leather'
  language: 'english' | 'arabic' | 'bilingual'
  isbn: string
  publisher: string
  pages: number
  isNew: boolean
  isBestseller: boolean
  tableOfContents?: string[]
  samplePages?: string[]
  // Detailed spec-sheet fields (tahqiq/edition details)
  editor?: string
  vocalization?: 'full' | 'partial' | 'none'
  volumes?: number
  dimensions?: string
  printEdition?: string
  paperQuality?: string
  publicationYear?: number
  inStock: boolean
}

export interface CartItem {
  bookId: string
  quantity: number
  price: number
}

export interface CartState {
  items: CartItem[]
  total: number
}

export interface Review {
  id: string
  author: string
  rating: number
  text: string
  date: string
  verified: boolean
}
