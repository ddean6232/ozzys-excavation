import { useState, type FormEvent } from 'react'

export default function CTA() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    details: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // In production, wire this to Formspree, Netlify Forms, or your API
    console.log('Form submitted:', formData)
    setSubmitted(true)
  }

  return (
    <section id="contact" className="py-24 sm:py-32 bg-warm-cream relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rust rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-ember rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <div>
            <span className="text-rust font-semibold text-sm tracking-widest uppercase">Let's Get Started</span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-display font-bold text-earth leading-tight">
              Ready to Transform<br />Your <span className="text-rust">Property?</span>
            </h2>
            <p className="mt-6 text-lg text-gray-700 leading-relaxed">
              Whether you're reshaping your lot, prepping for new construction, or planning a custom excavation
              project — we're here to make it simple. Share a few details about your site and we'll follow up
              quickly with next steps.
            </p>

            {/* Contact info */}
            <div className="mt-10 space-y-5">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  ),
                  label: 'Email',
                  value: 'admin@ozzysexcavation.ca',
                  href: 'mailto:admin@ozzysexcavation.ca',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  ),
                  label: 'Phone',
                  value: 'Call for a quote',
                  href: '#',
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  label: 'Location',
                  value: 'Alberta, Canada',
                  href: '#',
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-4 text-gray-800 hover:text-rust transition-colors group"
                >
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-rust shadow-sm group-hover:shadow-md transition-all">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider">{item.label}</div>
                    <div className="font-medium">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="bg-white rounded-2xl p-8 sm:p-10 shadow-xl">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-display font-bold text-earth mb-2">Quote Request Sent!</h3>
                <p className="text-gray-600">
                  Thanks, {formData.name}! We'll review your project details and get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-rust hover:text-rust-dark font-medium transition-colors"
                >
                  Submit another request →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-display font-bold text-earth mb-2">Request a Quote</h3>
                  <p className="text-warm-gray text-sm">Fill out the form and we'll be in touch within 24 hours.</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-earth mb-1.5">
                      Full Name <span className="text-rust">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-warm-cream border border-transparent focus:border-rust rounded-xl text-earth placeholder-warm-gray focus:outline-none focus:ring-2 focus:ring-rust/20 transition-all"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-earth mb-1.5">
                      Phone Number <span className="text-rust">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-warm-cream border border-transparent focus:border-rust rounded-xl text-earth placeholder-warm-gray focus:outline-none focus:ring-2 focus:ring-rust/20 transition-all"
                      placeholder="(403) 555-0123"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-earth mb-1.5">
                    Email Address <span className="text-rust">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-warm-cream border border-transparent focus:border-rust rounded-xl text-earth placeholder-warm-gray focus:outline-none focus:ring-2 focus:ring-rust/20 transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-earth mb-1.5">
                    Service Needed <span className="text-rust">*</span>
                  </label>
                  <select
                    id="service"
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-warm-cream border border-transparent focus:border-rust rounded-xl text-earth focus:outline-none focus:ring-2 focus:ring-rust/20 transition-all appearance-none"
                  >
                    <option value="">Select a service...</option>
                    <option value="septic">Septic System Installation</option>
                    <option value="excavation">Excavation & Earthworks</option>
                    <option value="land-clearing">Land Clearing & Mulching</option>
                    <option value="dewatering">Dewatering & Water Transfer</option>
                    <option value="screw-piles">Screw Pile Installation</option>
                    <option value="demolition">Demolition</option>
                    <option value="snow">Snow Removal</option>
                    <option value="landscaping">Landscaping & Grading</option>
                    <option value="other">Other / Multiple Services</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="details" className="block text-sm font-medium text-earth mb-1.5">
                    Project Details <span className="text-rust">*</span>
                  </label>
                  <textarea
                    id="details"
                    required
                    rows={4}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full px-4 py-3 bg-warm-cream border border-transparent focus:border-rust rounded-xl text-earth placeholder-warm-gray focus:outline-none focus:ring-2 focus:ring-rust/20 transition-all resize-none"
                    placeholder="Tell us about your project — scope, dimensions, timeline, and any specific requirements..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-rust hover:bg-rust-dark text-white py-4 rounded-full font-semibold text-lg transition-all hover:shadow-xl hover:shadow-rust/25 hover:-translate-y-0.5"
                >
                  Send Quote Request →
                </button>

                <p className="text-center text-gray-500 text-xs">
                  We respect your privacy. Your information is never shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
