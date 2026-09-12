import { HeroBanner } from '@/components/HeroBanner'
import { TrustCounter } from '@/components/TrustCounter'
import { StartHerePath } from '@/components/StartHerePath'
import { NewArrivalsCarousel } from '@/components/NewArrivalsCarousel'
import { CategoriesGrid } from '@/components/CategoriesGrid'
import { ReviewsCarousel } from '@/components/ReviewsCarousel'

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Trust Counter */}
      <TrustCounter />

      {/* Start Here Path */}
      <StartHerePath />

      {/* New Arrivals */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-text-primary">New Arrivals</h2>
          <NewArrivalsCarousel />
        </div>
      </section>

      {/* Books on Request CTA */}
      <section className="py-12 px-4 bg-wood-dark">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold text-white mb-1">Looking for a specific title or tahqiq?</h3>
            <p className="text-white/70">We source rare and out-of-print works on request — just tell us what you need.</p>
          </div>
          <a href="#request-a-book" className="btn-primary bg-accent-gold text-wood-dark hover:bg-yellow-400 whitespace-nowrap px-6 py-3 font-semibold rounded-lg transition-colors">
            Request a Book
          </a>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-text-primary">Explore by Category</h2>
          <CategoriesGrid />
        </div>
      </section>

      {/* Reviews */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-text-primary">What Our Readers Say</h2>
          <ReviewsCarousel />
        </div>
      </section>
    </div>
  )
}
