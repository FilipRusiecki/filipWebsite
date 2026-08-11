import { Metadata } from '@redwoodjs/web'
import { navigate, routes, Link } from '@redwoodjs/router'
import { motion } from 'framer-motion'

import Navigation from 'src/components/Navigation/Navigation'
import Footer from 'src/components/Footer/Footer'
import TicketForm from 'src/components/TicketForm/TicketForm'

const offerings = [
  {
    title: 'Custom websites',
    line: 'Brand-led sites for artists, studios, and small businesses — designed around you, not a template.',
  },
  {
    title: 'Portfolios & shops of work',
    line: 'Galleries, workshops, about pages, and contact flows that make your work feel premium.',
  },
  {
    title: 'Full-stack when you need it',
    line: 'Forms, tickets, updates, auth, and admin — the same stack behind frvg.net and client sites.',
  },
]

const BusinessEnquiryPage = () => {
  const handleEnquiryCreated = (ticketId, viewToken) => {
    if (!ticketId) return
    const path = routes.supportTicket({ id: ticketId })
    if (viewToken) {
      navigate(`${path}?token=${encodeURIComponent(viewToken)}`)
    } else {
      navigate(path)
    }
  }

  const scrollToForm = () => {
    document.getElementById('enquiry-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <Metadata
        title="Business Enquiry - Filip Rusiecki Video Games"
        description="Custom websites, portfolios, and brand sites from Filip Rusiecki Video Games. Tell us about your project."
      />
      <div className="dark bg-game-dark min-h-screen text-game-light">
        <Navigation />

        {/* Hero — one composition */}
        <section className="relative overflow-hidden min-h-[88vh] flex items-center">
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(209,173,74,0.22), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(209,173,74,0.08), transparent 50%), radial-gradient(ellipse 40% 30% at 10% 70%, rgba(209,173,74,0.06), transparent 45%)',
            }}
          />
          <motion.div
            className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-game-accent/10 blur-3xl"
            aria-hidden="true"
            animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            aria-hidden="true"
            style={{
              backgroundImage:
                'linear-gradient(rgba(214,214,214,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(214,214,214,0.4) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse 70% 60% at 50% 40%, black, transparent)',
            }}
          />

          <div className="relative container mx-auto px-4 py-20 md:py-28 text-center">
            <motion.img
              src="/images/logos/FRVGLOGOtransperant.png"
              alt="Filip Rusiecki Video Games"
              className="h-28 sm:h-36 md:h-44 w-auto object-contain mx-auto mb-6 md:mb-8"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            />
            <motion.p
              className="text-game-accent font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm mb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Filip Rusiecki Video Games
            </motion.p>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-game-light mb-5 md:mb-6 max-w-4xl mx-auto leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              Custom websites, built to feel like your brand
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-game-light/80 max-w-2xl mx-auto mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              From portfolio sites to full marketing platforms — tell us what you need and we&apos;ll
              reply with next steps.
            </motion.p>
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <button
                type="button"
                onClick={scrollToForm}
                className="bg-game-accent text-game-dark px-8 py-3.5 rounded-lg text-lg font-bold hover:bg-game-accent/90 transition-all duration-300 hover:scale-[1.03]"
              >
                Start an enquiry
              </button>
              <Link
                to={routes.portfolio()}
                className="border-2 border-game-accent/40 text-game-light px-8 py-3.5 rounded-lg text-lg font-bold hover:border-game-accent hover:text-game-accent transition-all duration-300"
              >
                See work
              </Link>
            </motion.div>
          </div>
        </section>

        {/* What we build — one job, no card chrome */}
        <section className="relative py-16 md:py-24 border-t border-game-accent/15">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6 }}
              className="mb-12 md:mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-game-light mb-3">
                What you can enquire about
              </h2>
              <p className="text-game-light/70 text-lg max-w-xl">
                Clear scope, designed around your brand — not a generic site builder look.
              </p>
            </motion.div>
            <div className="space-y-10 md:space-y-12">
              {offerings.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="grid grid-cols-[auto_1fr] gap-5 md:gap-8 items-start border-l-2 border-game-accent/40 pl-5 md:pl-8"
                >
                  <span className="text-game-accent font-mono text-sm pt-1 tabular-nums">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-game-light mb-2">
                      {item.title}
                    </h3>
                    <p className="text-game-light/70 text-base md:text-lg leading-relaxed max-w-2xl">
                      {item.line}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.p
              className="mt-14 text-game-light/55 text-sm md:text-base"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Recent client work:{' '}
              <a
                href="https://kotrina.art"
                target="_blank"
                rel="noopener noreferrer"
                className="text-game-accent hover:underline font-semibold"
              >
                kotrina.art
              </a>
              {' · '}
              <Link to={routes.portfolio()} className="text-game-accent hover:underline font-semibold">
                Full portfolio
              </Link>
            </motion.p>
          </div>
        </section>

        {/* Form */}
        <section
          id="enquiry-form"
          className="relative py-16 md:py-24 border-t border-game-accent/15 scroll-mt-20"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-80"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(209,173,74,0.12), transparent 60%)',
            }}
          />
          <div className="relative container mx-auto px-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-game-light mb-3">
                Tell us about your project
              </h2>
              <p className="text-game-light/70 text-lg">
                Share goals, timeline, and links — email required so we can reply.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="border-2 border-game-accent/35 bg-game-dark/80 backdrop-blur-sm p-6 md:p-10 rounded-lg shadow-[0_0_60px_-20px_rgba(209,173,74,0.35)]"
            >
              <TicketForm
                onSuccess={handleEnquiryCreated}
                ticketType="business_inquiry"
              />
            </motion.div>
            <p className="text-center text-sm text-game-light/45 mt-8">
              Game bugs or player help? Use{' '}
              <Link to={routes.support()} className="text-game-accent/80 hover:text-game-accent hover:underline">
                Support
              </Link>{' '}
              instead.
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

export default BusinessEnquiryPage
