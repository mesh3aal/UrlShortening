import { allUsers } from '../data/data'
import Brief from './Brief.tsx'
import Card from './Card'

export default function ReviewsSection() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl mb-4 text-gray-900">
          What Our Users Say
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Join thousands of satisfied users who trust ShortLink for their URL
          shortening needs.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allUsers.map((item) => (
          <Card
            key={item.name}
            paragraph={item.paragraph}
            name={item.name}
            job={item.job}
          />
        ))}
      </div>
      <Brief />
    </div>
  )
}
