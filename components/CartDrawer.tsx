'use client'

import React from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/context/CartContext'
import { books } from '@/lib/data/books'
import { X, Minus, Plus, Trash2 } from 'lucide-react'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getTotal } = useCart()

  if (!isOpen) return null

  const cartItems = items.map((item) => ({
    ...item,
    book: books.find((b) => b.id === item.bookId),
  }))

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-warm">
          <h2 className="text-2xl font-bold text-wood-dark">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-parchment rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-text-primary" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-text-muted mb-4">Your cart is empty</p>
              <button
                onClick={onClose}
                className="btn-primary"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => {
                if (!item.book) return null
                return (
                  <div key={item.bookId} className="border border-border-warm rounded-lg p-4">
                    <div className="flex gap-4">
                      {/* Book Image */}
                      <img
                        src={item.book.image}
                        alt={item.book.title}
                        className="w-16 h-24 object-cover rounded"
                      />

                      {/* Book Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary text-sm mb-1">
                          {item.book.title}
                        </h3>
                        <p className="text-text-muted text-xs mb-2">{item.book.author}</p>
                        <p className="text-wood-dark font-bold text-sm mb-3">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mb-3">
                          <button
                            onClick={() => updateQuantity(item.bookId, Math.max(1, item.quantity - 1))}
                            className="p-1 hover:bg-parchment rounded transition-colors"
                          >
                            <Minus className="w-4 h-4 text-wood-dark" />
                          </button>
                          <span className="w-8 text-center text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                            className="p-1 hover:bg-parchment rounded transition-colors"
                          >
                            <Plus className="w-4 h-4 text-wood-dark" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.bookId)}
                          className="text-red-600 hover:text-red-700 text-sm flex items-center gap-1"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border-warm p-6 bg-white">
            <div className="mb-6">
              <div className="flex justify-between mb-4">
                <span className="text-text-muted">Subtotal</span>
                <span className="font-semibold text-text-primary">
                  ${getTotal().toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-text-muted">Shipping</span>
                <span className="font-semibold text-green-600">Free</span>
              </div>
              <div className="border-t border-border-warm pt-4">
                <div className="flex justify-between">
                  <span className="font-bold text-text-primary">Total</span>
                  <span className="font-bold text-wood-dark text-lg">
                    ${getTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <Link href="/checkout" onClick={onClose}>
              <button className="btn-primary w-full mb-3">
                Proceed to Checkout
              </button>
            </Link>
            <button
              onClick={onClose}
              className="btn-ghost w-full"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  )
}
