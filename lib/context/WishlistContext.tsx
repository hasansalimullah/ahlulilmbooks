'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface WishlistStore {
  bookIds: string[]
  toggle: (bookId: string) => void
  isWishlisted: (bookId: string) => boolean
  clear: () => void
}

const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      bookIds: [],

      toggle: (bookId: string) => {
        set((state) => {
          const exists = state.bookIds.includes(bookId)
          return {
            bookIds: exists
              ? state.bookIds.filter((id) => id !== bookId)
              : [...state.bookIds, bookId],
          }
        })
      },

      isWishlisted: (bookId: string) => {
        return get().bookIds.includes(bookId)
      },

      clear: () => {
        set({ bookIds: [] })
      },
    }),
    {
      name: 'ahlulilmbooks-wishlist',
    }
  )
)

export function useWishlist() {
  return useWishlistStore()
}
