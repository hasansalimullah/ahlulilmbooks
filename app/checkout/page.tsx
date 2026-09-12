'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/lib/context/CartContext'
import { books } from '@/lib/data/books'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { ChevronLeft, Lock, Truck } from 'lucide-react'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '')

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const { items, getTotal } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) return

    setIsProcessing(true)
    setError(null)

    try {
      // Create payment method
      const { paymentMethod, error: paymentError } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement)!,
        billing_details: {
          email,
          phone,
          address: {
            line1: address,
            city,
            state,
            postal_code: zip,
          },
        },
      })

      if (paymentError) {
        setError(paymentError.message || 'Payment error occurred')
        setIsProcessing(false)
        return
      }

      // In a real application, you would send this to your backend
      // to create a payment intent and charge the card
      console.log('Payment successful:', paymentMethod)
      setSuccess(true)
    } catch (err) {
      setError('An error occurred during payment processing')
      setIsProcessing(false)
    }
  }

  const cartItems = items.map((item) => ({
    ...item,
    book: books.find((b) => b.id === item.bookId),
  }))

  if (success) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">✓</div>
        <h2 className="text-3xl font-bold text-green-600 mb-4">Order Confirmed!</h2>
        <p className="text-text-muted mb-8">Thank you for your order. You'll receive a confirmation email shortly.</p>
        <Link href="/">
          <button className="btn-primary">Return to Home</button>
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Shipping Information */}
      <div className="bg-white rounded-lg border border-border-warm p-6">
        <h2 className="text-2xl font-bold text-text-primary mb-6">Shipping Address</h2>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-border-warm rounded-lg focus:outline-none focus:border-wood-dark"
            required
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border border-border-warm rounded-lg focus:outline-none focus:border-wood-dark"
            required
          />
          <input
            type="text"
            placeholder="Street Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-3 border border-border-warm rounded-lg focus:outline-none focus:border-wood-dark"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="px-4 py-3 border border-border-warm rounded-lg focus:outline-none focus:border-wood-dark"
              required
            />
            <input
              type="text"
              placeholder="State/Province"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="px-4 py-3 border border-border-warm rounded-lg focus:outline-none focus:border-wood-dark"
              required
            />
          </div>
          <input
            type="text"
            placeholder="ZIP/Postal Code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="w-full px-4 py-3 border border-border-warm rounded-lg focus:outline-none focus:border-wood-dark"
            required
          />
        </div>
      </div>

      {/* Payment Information */}
      <div className="bg-white rounded-lg border border-border-warm p-6">
        <h2 className="text-2xl font-bold text-text-primary mb-6 flex items-center gap-2">
          <Lock className="w-6 h-6 text-wood-dark" />
          Payment Method
        </h2>
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            🔒 Your payment is secure and encrypted using Stripe
          </p>
        </div>
        <div className="p-4 border border-border-warm rounded-lg bg-parchment mb-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#222222',
                  '::placeholder': {
                    color: '#777777',
                  },
                },
                invalid: {
                  color: '#EF4444',
                },
              },
            }}
          />
        </div>

        {error && <div className="text-red-600 text-sm mb-4">{error}</div>}

        <button
          type="submit"
          disabled={!stripe || isProcessing || cartItems.length === 0}
          className="btn-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : `Pay $${getTotal().toFixed(2)}`}
        </button>
      </div>
    </form>
  )
}

export default function CheckoutPage() {
  const { items, getTotal } = useCart()
  const cartItems = items.map((item) => ({
    ...item,
    book: books.find((b) => b.id === item.bookId),
  }))

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-parchment py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-text-primary mb-4">Your cart is empty</h1>
            <p className="text-text-muted mb-8">Add some books before proceeding to checkout</p>
            <Link href="/books">
              <button className="btn-primary">Continue Shopping</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-parchment py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <Link href="/" className="text-wood-dark hover:underline flex items-center gap-2 mb-8">
          <ChevronLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <h1 className="text-4xl font-bold text-text-primary mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2">
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border-warm p-6 sticky top-20">
              <h2 className="text-2xl font-bold text-text-primary mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 pb-6 border-b border-border-warm">
                {cartItems.map((item) => {
                  if (!item.book) return null
                  return (
                    <div key={item.bookId} className="flex gap-4">
                      <img
                        src={item.book.image}
                        alt={item.book.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-text-primary text-sm line-clamp-2">
                          {item.book.title}
                        </h3>
                        <p className="text-text-muted text-xs mb-2">{item.book.author}</p>
                        <p className="text-wood-dark font-bold text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-text-muted text-xs">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Pricing */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-text-muted">
                  <span>Subtotal</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Shipping</span>
                  <span className="text-green-600 font-semibold">Free</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Tax</span>
                  <span>${(getTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-border-warm pt-3 flex justify-between font-bold text-lg">
                  <span className="text-text-primary">Total</span>
                  <span className="text-wood-dark">
                    ${(getTotal() * 1.08).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Info Badges */}
              <div className="space-y-2 text-sm text-text-muted">
                <div className="flex items-start gap-2">
                  <Truck className="w-5 h-5 text-wood-dark flex-shrink-0 mt-0.5" />
                  <span>Free shipping worldwide on orders over $50</span>
                </div>
                <div className="flex items-start gap-2">
                  <Lock className="w-5 h-5 text-wood-dark flex-shrink-0 mt-0.5" />
                  <span>Secure payment with Stripe encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
