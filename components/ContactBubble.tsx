'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

export function ContactBubble() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-3 w-64 bg-white rounded-lg shadow-book-hover border border-border-warm p-4">
          <p className="font-semibold text-text-primary text-sm mb-1">AhlulIlmBooks</p>
          <p className="text-text-muted text-xs mb-3">Usually replies within 10 minutes.</p>
          <a
            href="mailto:info@ahlulilmbooks.com"
            className="block text-center btn-primary text-sm py-2"
          >
            Message Us
          </a>
        </div>
      )}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Contact us"
        className="w-14 h-14 rounded-full bg-wood-dark hover:bg-wood-light text-white shadow-lg flex items-center justify-center transition-colors"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  )
}
