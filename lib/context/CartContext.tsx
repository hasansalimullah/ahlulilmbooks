'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@/lib/types'
import { books } from '@/lib/data/books'

interface CartStore {
  items: CartItem[]
  addItem: (bookId: string, quantity: number) => void
  removeItem: (bookId: string) => void
  updateQuantity: (bookId: string, quantity: number) => void
  clearCart: () => void
  getTotal: () => number
  getItemCount: () => number
}

const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (bookId: string, quantity: number) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.bookId === bookId)
          const book = books.find((b) => b.id === bookId)
          
          if (!book) return state
          
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.bookId === bookId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }
          
          return {
            items: [...state.items, { bookId, quantity, price: book.price }],
          }
        })
      },
      
      removeItem: (bookId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.bookId !== bookId),
        }))
      },
      
      updateQuantity: (bookId: string, quantity: number) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.bookId === bookId ? { ...item, quantity } : item
          ),
        }))
      },
      
      clearCart: () => {
        set({ items: [] })
      },
      
      getTotal: () => {
        const state = get()
        return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'ahlulilmbooks-cart',
    }
  )
)

const CartContext = createContext<CartStore | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  return (
    <CartContext.Provider value={useCartStore}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const store = useCartStore()
  if (!store) {
    throw new Error('useCart must be used within CartProvider')
  }
  return store
}
