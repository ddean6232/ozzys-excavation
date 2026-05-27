import { MapContainer, TileLayer, Popup, CircleMarker } from 'react-leaflet'
import { Link } from 'react-router-dom'
import { pageContent_, jobLocations, type JobLocation } from '../data/content'
import FadeInSection from '../components/FadeInSection'
import 'leaflet/dist/leaflet.css'

const page = pageContent_ as Record<string, { title: string; subtitle: string; hero: string }>
const coverage = page.coverage

const completed = jobLocations.filter((j) => j.status === 'completed')
const underway = jobLocations.filter((j) => j.status === 'underway')

// Centered on Alberta
const CENTER: [number, number] = [54.5, -115]

function Legend() {
  return (
    <div className="absolute bottom-6 right-6 z-[1000] bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4 text-sm">
      <h4 className="font-display font-bold text-earth mb-2">Legend</h4>
      <div className="flex items-center gap-2 mb-1.5">
        <span className="w-3.5 h-3.5 rounded-full bg-green-600" />
        <span className="text-gray-800">Completed ({completed.length})</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3.5 h-3.5 rounded-full bg-amber-400" />
        <span className="text-gray-800">Underway ({underway.length})</span>
      </div>
    </div>
  )
}

function JobPopup({ job }: { job: JobLocation }) {
  return (
    <div className="min-w-[200px]">
      <h3 className="font-display font-bold text-earth text-sm mb-1">{job.name}</h3>
      <div className="space-y-0.5 text-xs text-gray-700">
        <p><span className="font-medium">Service:</span> {job.service}</p>
        <p><span className="font-medium">Status:</span>{' '}
          <span className={job.status === 'completed' ? 'text-green-700 font-semibold' : 'text-amber-600 font-semibold'}>
            {job.status === 'completed' ? 'Completed' : 'Underway'}
          </span>
        </p>
        <p><span className="font-medium">Year:</span> {job.year}</p>
      </div>
    </div>
  )
}

export default function CoverageMap() {
  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[40vh] min-h-[320px] overflow-hidden">
        <img
          src={coverage.hero}
          alt={coverage.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-4 transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-3">
              {coverage.title}
            </h1>
            <p className="text-xl text-rust-light font-medium">{coverage.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-earth text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-display font-bold text-rust-light">
                {jobLocations.length}
              </div>
              <div className="text-white/70 text-sm mt-1">Total Projects</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-display font-bold text-green-400">
                {completed.length}
              </div>
              <div className="text-white/70 text-sm mt-1">Completed</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-display font-bold text-amber-400">
                {underway.length}
              </div>
              <div className="text-white/70 text-sm mt-1">Underway</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-display font-bold text-rust-light">
                {new Set(jobLocations.map((j) => j.service)).size}
              </div>
              <div className="text-white/70 text-sm mt-1">Service Types</div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <FadeInSection>
        <section className="relative bg-warm-cream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="relative w-full aspect-[16/9] min-h-[500px] rounded-2xl overflow-hidden shadow-xl border border-gray-200">
              <MapContainer
                center={CENTER}
                zoom={6}
                scrollWheelZoom={true}
                style={{ width: '100%', height: '100%' }}
                className="z-0"
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Completed — green */}
                {completed.map((job, i) => (
                  <CircleMarker
                    key={`completed-${i}`}
                    center={[job.lat, job.lng]}
                    radius={9}
                    pathOptions={{
                      fillColor: '#16a34a',
                      fillOpacity: 0.85,
                      color: '#ffffff',
                      weight: 2,
                      opacity: 1,
                    }}
                  >
                    <Popup>
                      <JobPopup job={job} />
                    </Popup>
                  </CircleMarker>
                ))}

                {/* Underway — yellow */}
                {underway.map((job, i) => (
                  <CircleMarker
                    key={`underway-${i}`}
                    center={[job.lat, job.lng]}
                    radius={9}
                    pathOptions={{
                      fillColor: '#fbbf24',
                      fillOpacity: 0.85,
                      color: '#ffffff',
                      weight: 2,
                      opacity: 1,
                    }}
                  >
                    <Popup>
                      <JobPopup job={job} />
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>

              <Legend />
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* Project List */}
      <FadeInSection delay={100}>
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-display font-bold text-earth mb-8 text-center">
              All Project Locations
            </h2>

            {/* Completed */}
            <div className="mb-12">
              <h3 className="text-xl font-display font-bold text-earth mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-600 inline-block" />
                Completed Projects ({completed.length})
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {completed.map((job) => (
                  <div
                    key={job.name}
                    className="bg-warm-cream rounded-xl p-4 border border-transparent hover:border-green-200 hover:shadow-sm transition-all"
                  >
                    <h4 className="font-bold text-earth text-sm">{job.name}</h4>
                    <p className="text-xs text-gray-800 mt-1">{job.service} — {job.year}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Underway */}
            <div>
              <h3 className="text-xl font-display font-bold text-earth mb-4 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
                Underway ({underway.length})
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {underway.map((job) => (
                  <div
                    key={job.name}
                    className="bg-warm-cream rounded-xl p-4 border border-transparent hover:border-amber-200 hover:shadow-sm transition-all"
                  >
                    <h4 className="font-bold text-earth text-sm">{job.name}</h4>
                    <p className="text-xs text-gray-800 mt-1">{job.service} — {job.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* CTA */}
      <section className="py-20 bg-earth text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Have a Project in Alberta?
          </h2>
          <p className="text-lg text-white/70 mb-8">
            We work across the province — from Calgary to Fort McMurray. Get in touch to see how we can help with your site.
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
