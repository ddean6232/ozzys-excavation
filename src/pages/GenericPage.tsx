import { useParams, Link } from 'react-router-dom'
import { pageContent_ } from '../data/content'
import FadeInSection from '../components/FadeInSection'

const pageContent = pageContent_ as Record<string, { title: string; subtitle: string; hero: string }>

export default function GenericPage() {
  const { slug } = useParams<{ slug: string }>()
  const page = slug ? pageContent[slug] : undefined

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-cream">
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-earth mb-4">Page Not Found</h1>
          <p className="text-gray-800 mb-8">The page you're looking for doesn't exist.</p>
          <Link to="/" className="bg-rust text-white px-6 py-3 rounded-full font-medium hover:bg-rust-dark transition-all">
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img
          src={page.hero}
          alt={page.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
            <Link to="/" className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-3">
              {page.title}
            </h1>
            <p className="text-xl text-rust-light font-medium">{page.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Content placeholder */}
      <FadeInSection>
        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-lg text-gray-800 leading-relaxed">
              Content coming soon. Check back for updates about {page.title.toLowerCase()}.
            </p>
          </div>
        </section>
      </FadeInSection>

      {/* CTA Section */}
      <section className="py-20 bg-earth text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-white/70 mb-8">
            Get in touch for a free estimate. We'll assess your site, answer your questions, and provide a detailed quote with no obligation.
          </p>
          <Link
            to="/#contact"
            className="inline-flex items-center gap-2 bg-rust hover:bg-rust-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-xl hover:shadow-rust/25"
          >
            Get a Free Estimate
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}
