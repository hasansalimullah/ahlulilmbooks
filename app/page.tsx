import { HeroBanner } from '@/components/HeroBanner'
import { TrustCounter } from '@/components/TrustCounter'
import { StartHerePath } from '@/components/StartHerePath'
import { NewArrivalsCarousel } from '@/components/NewArrivalsCarousel'
import { CategoriesGrid } from '@/components/CategoriesGrid'
import { ReviewsCarousel } from '@/components/ReviewsCarousel'

export default function Home() {
  return (
    <div className="w-full">
      {/* Announcement Bar */}
      <div className="bg-wood-dark text-white py-3 px-4 text-center text-sm">
        <p>🌍 Worldwide Shipping Available | Free Delivery on Orders Over $50</p>
      </div>

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
