import Link from 'next/link'
import { Heart, Target, Users } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-parchment">
      {/* Hero Section */}
      <section className="bg-white border-b border-border-warm py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-text-primary mb-6">About AhlulIlmBooks</h1>
          <p className="text-xl text-text-muted leading-relaxed">
            We're on a mission to make authentic Islamic knowledge accessible to everyone, everywhere.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-parchment rounded-full">
                  <Target className="w-8 h-8 text-wood-dark" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Our Mission</h3>
              <p className="text-text-muted">
                To provide a comprehensive, curated collection of authentic Islamic books that support students of knowledge at every level.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-parchment rounded-full">
                  <Heart className="w-8 h-8 text-wood-dark" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Our Values</h3>
              <p className="text-text-muted">
                Authenticity, quality, and accessibility drive every decision we make. We believe in honest dealings and ethical business.
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-parchment rounded-full">
                  <Users className="w-8 h-8 text-wood-dark" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-2">Our Community</h3>
              <p className="text-text-muted">
                We serve students of knowledge, reverts, scholars, and book collectors across 45+ countries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary mb-8">Our Story</h2>
          <div className="space-y-6 text-text-muted leading-relaxed">
            <p>
              AhlulIlmBooks was founded with a simple vision: to create a beautiful, intuitive online space where seekers of Islamic knowledge can discover authentic, high-quality books. We recognized a gap in the market for a bookstore that combines scholarly rigor with a warm, accessible aesthetic.
            </p>
            <p>
              What started as a passion project has grown into a thriving community of readers, students, and scholars united by a commitment to Islamic learning. Today, we're proud to offer one of the most comprehensive collections of Islamic literature available online.
            </p>
            <p>
              Every book in our catalog is carefully selected to ensure authenticity and quality. We work directly with trusted publishers and distributors to bring you the best Islamic literature, from classical commentaries to contemporary Islamic studies.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-text-primary mb-12 text-center">Why Choose AhlulIlmBooks?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg border border-border-warm">
              <h3 className="font-bold text-text-primary mb-3">Authentic & Curated</h3>
              <p className="text-text-muted">
                Every book is handpicked by our team to ensure authenticity and scholarly rigor. We only stock books from reputable Islamic publishers and scholars.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-border-warm">
              <h3 className="font-bold text-text-primary mb-3">Worldwide Shipping</h3>
              <p className="text-text-muted">
                We ship to 45+ countries with reliable, secure packaging. Your books arrive in perfect condition, every time.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-border-warm">
              <h3 className="font-bold text-text-primary mb-3">Exceptional Service</h3>
              <p className="text-text-muted">
                Our dedicated team is passionate about helping you find exactly what you need. We're here to answer questions and provide recommendations.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-border-warm">
              <h3 className="font-bold text-text-primary mb-3">Competitive Pricing</h3>
              <p className="text-text-muted">
                We believe Islamic knowledge should be accessible. We offer competitive prices and regular promotions to make books more affordable.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-border-warm">
              <h3 className="font-bold text-text-primary mb-3">Beautiful Design</h3>
              <p className="text-text-muted">
                Our library-inspired aesthetic creates a peaceful, welcoming environment that celebrates the beauty of Islamic knowledge.
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg border border-border-warm">
              <h3 className="font-bold text-text-primary mb-3">Community Focused</h3>
              <p className="text-text-muted">
                We're building a community of knowledge seekers. Share reviews, recommendations, and connect with fellow readers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-wood-dark text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-xl text-wood-light mb-8">
            Explore our collection of authentic Islamic books and find your next great read.
          </p>
          <Link href="/books">
            <button className="px-8 py-3 bg-accent-gold text-wood-dark font-bold rounded-lg hover:bg-yellow-400 transition-colors text-lg">
              Browse Our Collection
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
