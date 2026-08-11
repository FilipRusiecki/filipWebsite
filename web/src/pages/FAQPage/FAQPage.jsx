import { useState } from 'react'
import { Metadata } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import { motion, AnimatePresence } from 'framer-motion'

import Navigation from 'src/components/Navigation/Navigation'
import Footer from 'src/components/Footer/Footer'
import SectionAtmosphere from 'src/components/SectionAtmosphere/SectionAtmosphere'

const faqs = [
  {
    question: 'When will Play With Friends be released?',
    answer:
      "Play With Friends is planned for Early Access in early 2026. We're three passionate developers working alongside contributors while balancing full-time jobs, so development may take longer to ensure quality.",
  },
  {
    question: 'What platforms will the game be available on?',
    answer:
      "Play With Friends will be available on Steam. We're focusing on PC first, with potential for other platforms in the future. The game requires an internet connection to run on Steam, as the economy system is connected online.",
  },
  {
    question: 'How many players can play together?',
    answer:
      'Play With Friends supports up to 5 players in co-op multiplayer. The game is designed for playing with friends or solo — there are no public matchmaking options. You can invite your friends to join your game session.',
  },
  {
    question: 'What makes this game different from other rogue-likes?',
    answer:
      "Play With Friends combines true rogue-like mechanics (death means restart) with chaotic multiplayer co-op, PS1-inspired retro visuals, and a focus on fun party-game energy rather than perfection. It's designed to be played with friends, where disasters and trolling are part of the fun.",
  },
  {
    question: 'Will there be microtransactions or pay-to-win?',
    answer:
      'No pay-to-win elements. There may be an optional Supporter Bundle with cosmetics only, but all gameplay content will be available through normal play.',
  },
  {
    question: 'How do I report bugs or get support?',
    answer:
      'You can submit bug reports and support requests through our Support page. We actively monitor and respond to all tickets.',
  },
  {
    question: 'Will Early Access progress carry over?',
    answer:
      "We're still finalizing this, but we'll communicate our plans clearly before Early Access launch. Our goal is to ensure a smooth experience for players.",
  },
  {
    question: 'Can I play solo?',
    answer:
      'Yes — solo or with friends (up to 5 players). There is no public matchmaking. Solo works, but the full experience is best with friends.',
  },
  {
    question: 'How can I help shape future updates?',
    answer:
      'Community feedback is at the heart of our development. Share ideas through Support, and check Updates for news and roadmap progress.',
  },
]

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <Metadata
        title="FAQ - Filip Rusiecki Video Games"
        description="Find answers to common questions about Play With Friends, release dates, gameplay, and more"
      />
      <div className="dark bg-game-dark min-h-screen text-game-light">
        <Navigation />

        <section className="relative overflow-hidden min-h-[42vh] flex items-center border-b border-game-accent/15">
          <SectionAtmosphere intensity="strong" pulse grid />
          <div className="relative container mx-auto px-4 py-14 md:py-20 text-center">
            <motion.p
              className="text-game-accent font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm mb-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              Play With Friends
            </motion.p>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-game-light mb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08 }}
            >
              FAQ
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-game-light/65 max-w-xl mx-auto"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.16 }}
            >
              Quick answers — tap a question to expand.
            </motion.p>
          </div>
        </section>

        <section className="relative overflow-hidden py-12 md:py-16">
          <SectionAtmosphere intensity="soft" />
          <div className="relative container mx-auto px-4 max-w-2xl">
            <div className="divide-y divide-game-accent/20 border-y border-game-accent/20">
              {faqs.map((faq, index) => {
                const isOpen = openIndex === index
                return (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.28) }}
                  >
                    <button
                      type="button"
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={isOpen}
                      className="w-full text-left py-5 flex items-start justify-between gap-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-game-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-game-dark"
                    >
                      <span className="text-base md:text-lg font-semibold text-game-light group-hover:text-game-accent transition-colors pr-2">
                        {faq.question}
                      </span>
                      <span
                        className={`text-game-accent text-xl font-light leading-none mt-0.5 shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-45' : ''
                        }`}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <p className="pb-5 text-game-light/70 leading-relaxed text-sm md:text-base max-w-prose">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-12 text-center"
            >
              <p className="text-game-light/50 text-sm mb-4">Still stuck?</p>
              <Link
                to={routes.support()}
                className="inline-flex items-center gap-2 bg-game-accent text-game-dark px-6 py-3 rounded-lg font-bold hover:brightness-110 transition-all duration-300 shadow-[0_0_24px_-6px_rgba(209,173,74,0.5)]"
              >
                Contact Support
                <span aria-hidden="true">→</span>
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

export default FAQPage
