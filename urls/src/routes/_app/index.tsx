import HeroSection from '#/components/HeroSection'
import ReviewsSection from '#/components/ReviewsSection'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/')({ component: Home })

function Home() {
  return (
    <main className="min-h-dvh">
      <section className="py-20 bg-linear-to-br from-blue-50 via-white to-purple-50">
        <HeroSection />
      </section>
      <section className="py-20 bg-gray-50">
        <ReviewsSection />
      </section>
    </main>
  )
}
