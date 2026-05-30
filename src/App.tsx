import { useMemo, useState, type FormEvent } from 'react'
import './index.css'

const services = [
  {
    title: 'Septic Services',
    href: '/septic-services',
    items: [
      'AOWMA-Certified Septic System Design',
      'Septic System Installation',
      'System Repair, Emergency Services',
      'Septic System Maintenance',
      'Site Assessments & Soil Testing (PSDS Compliant)',
      'Real Estate & Compliance Inspection',
      'Advanced Treatment Solutions',
      'Homeowner Septic Education',
    ],
  },
  {
    title: 'Land Clearing & Mulching',
    items: [
      'Forestry Mulching (Brush & Tree Clearing)',
      'Overgrowth Control & Site Reclamation',
      'Fire Guard & Line Clearing',
      'Pipeline & Lease Clearing',
      'Right-of-Way Clearing',
    ],
  },
  {
    title: 'Excavation & Earthworks',
    items: [
      'Basement Excavation (New & Existing)',
      'Foundation Excavation & Backfill',
      'Trenching & Utilitie Excation',
      '(Water, Sewer, Gas & Electrical)',
      'Garage Pads, Shop Pads & Building Pad',
      'Acerage Site Prep & Lot development',
      'Road building, Ditching, Culvert Install',
      'Rough Grade & Final Grade',
      'Driveway Building and Repair',
      'Bulk Earth Moving',
    ],
  },
  {
    title: 'Dewatering & Water Transfer Services',
    items: [
      'Construction & Mine Dewatering',
      'High Volume Water Transfer',
      'Pump Rentals & Custom Pumping Packages',
      'Emergency Flood Respone & Site Drainage',
    ],
  },
  {
    title: 'Screw Pile Installation',
    intro: 'We provide precise Auguring & Screw-Pile installation',
    items: [
      'Fence & Deck post hole auguring',
      'Conrete and fence install and design',
      'Screw pile holes with depth-specific options, weight rating and engineered designs',
      'signage installations, and foundation footing augering — all completed with accuracy and efficiency.',
    ],
  },
  {
    title: 'Demolition & Decommission',
    items: [
      'Residential And Commercial Structure Demolition',
      'Concrete & Asphalt Removal',
      'Shed, Garage & Outbuilding Removal',
      'Hot Tub & Pool Removal',
      'Junk removal',
    ],
  },
  {
    title: 'Seasonal Services',
    items: ['Snow Removal & Hauling', 'Ice Control & Sanding', 'Commercial & Residential Snow Contracts'],
  },
  {
    title: 'Landscape',
    items: [
      'Topsoil Spreading & Final Grading',
      'Sod Prep & Install',
      'Concrete Prep for Pads & Walkways',
      'Retaining Wall Design & Install',
      'Pressure washing services exterior and driveways',
      'Christmas light install',
    ],
  },
]

const faqs = [
  ['Do you provide septic services for acreages and rural homes?', 'Yes. Ozzy’s Energy Services Ltd. provides end-to-end private septic system solutions for acreages, rural homes, and new builds across Alberta.'],
  ['Are you AOWMA-certified?', 'Yes. Ozzy’s provides AOWMA-certified septic system assessment, design, installation, repair, and upgrade services.'],
  ['What excavation services are available?', 'Services include basement excavation, foundation excavation and backfill, trenching, acreage site preparation, road building, ditching, culvert installation, grading, driveway work, and bulk earth moving.'],
  ['How do I request a quote?', 'Use the request form with your scope, area dimensions, time frame, budget, and site address, or contact Ozzy’s Excavation by phone or email.'],
]

function App() {
  const [submitted, setSubmitted] = useState(false)

  const schema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': 'https://www.ozzysexcavation.ca/#business',
        name: "Ozzy's Excavation",
        legalName: "Ozzy’s Energy Services Ltd.",
        url: 'https://www.ozzysexcavation.ca/',
        telephone: '+1-778-209-1414',
        email: 'admin@ozzysexcavation.ca',
        image: 'https://www.ozzysexcavation.ca/images/service-equipment.jpg',
        areaServed: ['Calgary', 'Alberta', 'Acreages', 'Rural homes'],
        description: 'Professional excavation, earthworks, septic, dewatering, land clearing, screw pile, demolition, seasonal, and landscape services in Alberta.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqs.map(([question, answer]) => ({
          '@type': 'Question',
          name: question,
          acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
    ],
  }), [])

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <header className="site-header">
        <a className="brand" href="/" aria-label="Ozzy's Excavation home">
          <img src="/images/logo.png" alt="Ozzys Excavation" />
          <span>Ozzy's Excavation Earthworks and Septic</span>
        </a>
        <nav aria-label="Primary navigation">
          <a href="/">Home</a>
          <a href="/septic-services">Septic Services</a>
          <a href="/septic-system-assessment-form">Septic System Assesment Form</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact Us</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow">AWOMA Certified & Insured</p>
            <h1>Expert Excavation & Site Solutions, Certified Septic Installer.</h1>
            <p>Your Land. Your Vision. Our Expertise.</p>
            <a className="button" href="#contact">Request a Quote</a>
          </div>
        </section>

        <section className="section split" id="about">
          <div>
            <p className="eyebrow">About</p>
            <h2>Ozzy’s Energy Services Ltd.</h2>
            <p>At Ozzy’s Energy Services Ltd., we provide end-to-end private septic system solutions for acreages, rural homes, and new builds across Alberta. As AOWMA-certified professionals, we are qualified to assess, design, install, repair, and upgrade septic systems that meet provincial standards and perform reliably for years to come.</p>
            <p>Whether you’re building a new home, replacing a failed system, expanding your property, or correcting drainage issues, We take care of everything from initial soil evaluation and permitting to final inspection and commissioning.</p>
            <a className="button secondary" href="#contact">Book a Consultation</a>
          </div>
          <div className="why-card">
            <h3>Why Clients Choose Us</h3>
            <ul>
              <li>Certified & AOWMA-Approved</li>
              <li>Fully Insured & Code-Compliant</li>
              <li>Modern Equipment, Skilled Operators</li>
              <li>Transparent Pricing, No Hidden Fees</li>
              <li>Reliable workmanship built for Alberta Conditions</li>
            </ul>
          </div>
        </section>

        <section className="section services" id="services">
          <p className="eyebrow">Our Services</p>
          <h2>Septic, Earthwork and Excavation</h2>
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.title}>
                <h3>{service.title}</h3>
                {service.intro && <p>{service.intro}</p>}
                {service.title === 'Septic Services' && <p>Our Septic Services include:</p>}
                <ul>
                  {service.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                {service.href ? <a href={service.href}>Learn More</a> : null}
                <a className="quote-link" href="#contact">Request a Quote</a>
              </article>
            ))}
          </div>
        </section>

        <section className="section cta-band">
          <h2>Additional Services</h2>
          <h3>Lets get your project moving.</h3>
          <p>Whether you're reshaping your lot, prepping for new construction, or planning a custom excavation project, we're here to make it simple. Share a few details about your site and we'll follow up quickly with next steps.</p>
        </section>

        <section className="section split founder">
          <img src="/images/owner-ty-osborne.jpg" alt="Ty Osborne, President and Founder of Ozzy's Excavation" />
          <div>
            <h2>Ty Osborne</h2>
            <p className="eyebrow">President/ Founder</p>
            <p>I grew up obsessed with machines, and that childhood passion shaped a career across major heavy-civil and inner-city construction projects. After nearly a decade in the industry, I built Ozzy’s Excavation & Earthworks to turn acreages, backyards, and client visions into reality while delivering honest, high-quality work every time.</p>
            <h3>Your land. Your vision. Our expertise.</h3>
          </div>
        </section>

        <section className="section contact" id="contact">
          <div>
            <p className="eyebrow">Request a Quote</p>
            <h2>Tell us about your site.</h2>
            <p>Ozzys Excavation</p>
            <p><a href="tel:17782091414">778-209-1414</a></p>
            <p><a href="mailto:admin@ozzysexcavation.ca">admin@ozzysexcavation.ca</a></p>
          </div>
          <form onSubmit={onSubmit}>
            <label>First name<input name="firstName" required /></label>
            <label>Last name<input name="lastName" required /></label>
            <label>Email<input name="email" type="email" required /></label>
            <label>Phone<input name="phone" type="tel" required /></label>
            <label>Scope of services and project outcome required<textarea name="scope" required /></label>
            <label>Area Dimensions (DxWxL or Soft)<input name="dimensions" /></label>
            <label>Time frame<input name="timeFrame" /></label>
            <label>Budget<input name="budget" /></label>
            <label>Site Address<input name="siteAddress" /></label>
            <label className="consent"><input name="smsConsent" type="checkbox" required /> I consent to receive calls/texts about my quote request. Message and data rates may apply. Reply STOP to opt out.</label>
            <button type="submit">Submit</button>
            {submitted && <p role="status" className="success">Thanks — this demo form is ready to wire to email or CRM.</p>}
          </form>
        </section>

        <section className="section faq">
          <p className="eyebrow">Questions</p>
          <h2>Septic, excavation, and site service FAQs</h2>
          {faqs.map(([q, a]) => (
            <details key={q}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </section>
      </main>

      <footer>
        <strong>Ozzys Excavation</strong>
        <span>778-209-1414</span>
        <a href="mailto:admin@ozzysexcavation.ca">admin@ozzysexcavation.ca</a>
      </footer>
    </>
  )
}

export default App
