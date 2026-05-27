import { Link } from 'react-router-dom'
import { footerContent, serviceDetails, site, navLogoLetter } from '../data/content'

// Build slug lookup from service detail pages
const slugMap: Record<string, string> = {}
serviceDetails.forEach((s) => {
  slugMap[s.title] = s.slug
})

// Map service names with no dedicated page to their parent
const serviceRedirects: Record<string, string> = {
  'Demolition': 'additional-services',
  'Snow Removal': 'additional-services',
}

function serviceHref(name: string): string {
  const slug = slugMap[name] || serviceRedirects[name]
  return slug ? `/services/${slug}` : '/#services'
}

// Map footer page link names to route slugs
const pageSlugMap: Record<string, string> = {
  'About Oz': 'about',
  'Our Equipment': 'equipment',
  'Service Areas': 'service-areas',
  'Careers': 'careers',
  'Septic System Guide': 'septic-guide',
  'Alberta Regulations': 'alberta-regulations',
  'FAQ': 'faq',
  'Blog': 'blog',
}

function pageHref(name: string): string {
  return pageSlugMap[name] ? `/${pageSlugMap[name]}` : '#'
}

export default function Footer() {
  return (
    <footer className="bg-earth text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-rust rounded-lg flex items-center justify-center text-white font-display font-bold text-lg">
                {navLogoLetter}
              </div>
              <div>
                <div className="font-display font-bold text-xl">{site.name}</div>
                <div className="text-white/50 text-sm">{site.tagline}</div>
              </div>
            </div>
            <p className="text-white/80 leading-relaxed mb-8 max-w-sm">
              {footerContent.description}
            </p>
            {/* Certifications */}
            <div className="flex items-center gap-4">
              {footerContent.certifications.map((cert) => (
                <div key={cert} className="bg-white/10 rounded-lg px-4 py-2 text-sm text-white/85">
                  {cert}
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerContent.linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-display font-semibold text-sm uppercase tracking-wider text-white/50 mb-6">
                {group.title}
              </h4>
              <ul className="space-y-3">
                {group.items.map((item) => {
                  return (
                    <li key={item}>
                      <Link
                        to={group.title === 'Services' ? serviceHref(item) : pageHref(item)}
                        className="text-white/80 hover:text-rust-light transition-colors text-sm"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} {footerContent.copyright}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {Object.entries(footerContent.legal).map(([label, href]) => (
              <a key={label} href={href} className="text-white/50 hover:text-white/80 transition-colors text-sm">
                {label}
              </a>
            ))}
            <a
              href={`https://${site.domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-rust-light transition-colors text-sm flex items-center gap-1"
            >
              {site.domain}
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
