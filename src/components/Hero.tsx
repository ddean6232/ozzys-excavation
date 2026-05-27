import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-earth via-earth/95 to-rust-dark z-10" />

      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1920&q=80')`,
        }}
      />

      {/* Overlay pattern */}
      <div className="absolute inset-0 z-10 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="animate-fade-in-up mb-8">
          <Link
            to="/coverage"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-white/20 hover:border-rust-light/50 transition-all"
          >
            <span className="w-2 h-2 bg-ember rounded-full animate-pulse" />
            Serving Alberta
          </Link>
        </div>

        {/* Main headline */}
        <h1 className="animate-fade-in-up animation-delay-200 text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-display font-bold text-white leading-tight mb-6">
          Ozzy's Excavation
          <br />
          <span className="text-rust-light">Earthworks & Septic</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-in-up animation-delay-400 text-lg sm:text-xl text-white/95 max-w-3xl mx-auto mb-10">
          Expert Excavation & Site Solutions, Certified Septic Installer.
          Your land. Your vision. Our expertise — built for Alberta conditions.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up animation-delay-600 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="bg-rust hover:bg-rust-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:shadow-xl hover:shadow-rust/30 hover:-translate-y-0.5 inline-flex items-center gap-2"
          >
            Get Your Free Quote
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#services"
            className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all hover:bg-white/20 hover:-translate-y-0.5"
          >
            Our Services
          </a>
        </div>

        {/* Trust badges */}
        <div className="animate-fade-in-up animation-delay-600 mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {[
            { label: 'AOWMA Certified', icon: '🏅' },
            { label: 'Fully Insured', icon: '🛡️' },
            { label: '10+ Years Experience', icon: '⚙️' },
            { label: 'Alberta Based', icon: '📍' },
          ].map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-white/85 text-sm">
              <span className="text-lg">{badge.icon}</span>
              <span>{badge.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <a href="#why-us" className="block text-white/50 hover:text-white/80 transition-colors">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}
