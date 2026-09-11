import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-parchment flex items-center justify-center px-4">
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <BookOpen className="w-20 h-20 text-wood-dark opacity-50" />
        </div>
        <h1 className="text-6xl font-bold text-text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold text-text-primary mb-4">Page Not Found</h2>
        <p className="text-text-muted text-lg mb-8 max-w-lg mx-auto">
          We couldn't find the page you're looking for. It might have been moved or no longer exists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="btn-primary">Go to Home</button>
          </Link>
          <Link href="/books">
            <button className="btn-secondary">Browse Books</button>
          </Link>
        </div>
      </div>
    </div>
  )
}
