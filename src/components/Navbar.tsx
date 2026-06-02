import { useState } from 'react'
import { Link } from 'react-router-dom'
import { navLinks, navCtaText, navLogoLetter, site } from '../data/content'

interface NavbarProps {
  scrolled: boolean
}

export default function Navbar({ scrolled }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const textColor = scrolled ? 'text-earth' : 'text-white'
  const hoverColor = 'hover:text-rust'

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="#" className="flex items-center gap-3 group" onClick={handleHomeClick}>
            <div className="w-10 h-10 bg-rust rounded-lg flex items-center justify-center text-white font-display font-bold text-lg transition-transform group-hover:scale-110">
              {navLogoLetter}
            </div>
            <div>
              <div className={`font-display font-bold text-lg leading-tight transition-colors ${textColor}`}>
                {site.name}
              </div>
              <div className={`text-xs leading-tight transition-colors ${
                scrolled ? 'text-gray-600' : 'text-white/70'
              }`}>
                {site.tagline}
              </div>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={link.href === '/' ? handleHomeClick : undefined}
                className={`font-medium text-sm tracking-wide transition-colors ${textColor} ${hoverColor}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/#contact"
              className="bg-rust hover:bg-rust-dark text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all hover:shadow-lg hover:shadow-rust/25"
            >
              {navCtaText}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${textColor}`}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in-up bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-4 mx-2">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={(e) => {
                    setMenuOpen(false)
                    if (link.href === '/') handleHomeClick(e)
                  }}
                  className="text-earth font-medium py-2 hover:text-rust transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/#contact"
                onClick={() => setMenuOpen(false)}
                className="bg-rust text-white text-center px-6 py-3 rounded-full font-medium hover:bg-rust-dark transition-all"
              >
                {navCtaText}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
