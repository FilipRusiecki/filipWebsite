import { useState } from 'react'
import { Metadata } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import { motion } from 'framer-motion'

import Navigation from 'src/components/Navigation/Navigation'
import Footer from 'src/components/Footer/Footer'

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null)

  // Placeholder FAQ items - easily expandable
  const faqs = [
    {
      question: 'When will Play With Friends be released?',
      answer:
        'Play With Friends is planned for Early Access in early 2026. We\'re three passionate developers working alongside contributors while balancing full-time jobs, so development may take longer to ensure quality.',
    },
    {
      question: 'What platforms will the game be available on?',
      answer:
        'Play With Friends will be available on Steam. We\'re focusing on PC first, with potential for other platforms in the future. The game requires an internet connection to run on Steam, as the economy system is connected online.',
    },
    {
      question: 'How many players can play together?',
      answer:
        'Play With Friends supports up to 5 players in co-op multiplayer. The game is designed for playing with friends or solo - there are no public matchmaking options. You can invite your friends to join your game session.',
    },
    {
      question: 'What makes this game different from other rogue-likes?',
      answer:
        'Play With Friends combines true rogue-like mechanics (death means restart) with chaotic multiplayer co-op, PS1-inspired retro visuals, and a focus on fun party-game energy rather than perfection. It\'s designed to be played with friends, where disasters and trolling are part of the fun.',
    },
    {
      question: 'Will there be microtransactions or pay-to-win elements?',
      answer:
        'No pay-to-win elements. There may be an optional Supporter Bundle with cosmetics only, but all gameplay content will be available through normal play.',
    },
    {
      question: 'How do I report bugs or get support?',
      answer:
        'You can submit bug reports and support requests through our Support page. We actively monitor and respond to all tickets.',
    },
    {
      question: 'Will progress carry over from Early Access to full release?',
      answer:
        'We\'re still finalizing this, but we\'ll communicate our plans clearly before Early Access launch. Our goal is to ensure a smooth experience for players.',
    },
    {
      question: 'Can I play solo, or is multiplayer required?',
      answer:
        'You can play solo or with friends (up to 5 players). The game is designed for friends-only multiplayer - there are no public matchmaking options. While solo play is possible, the full experience is best enjoyed with friends.',
    },
    {
      question: 'How can I participate in shaping future updates?',
      answer:
        'Community feedback is at the heart of our development! You can vote on future updates and participate in feature selection directly on our website. We actively listen to player suggestions and incorporate community feedback into our development roadmap. Visit our Updates page to see current voting opportunities and share your ideas.',
    },
  ]

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <Metadata
        title="Frequently Asked Questions - FRVideoGames"
        description="Find answers to common questions about Play With Friends, release dates, gameplay, and more"
      />
      <div className="dark bg-game-dark min-h-screen">
        <Navigation />
        <div className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-game-light">
                Frequently Asked Questions
              </h1>
              <p className="text-xl text-game-light/80 max-w-2xl mx-auto">
                Find answers to common questions about Play With Friends
              </p>
            </motion.div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-game-dark border-2 border-game-accent/30 rounded-lg overflow-hidden hover:border-game-accent transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-6 flex items-center justify-between focus:outline-none"
                  >
                    <h3 className="text-xl font-bold text-game-light pr-4">{faq.question}</h3>
                    <span className="text-game-accent text-2xl font-bold flex-shrink-0">
                      {openIndex === index ? '−' : '+'}
                    </span>
                  </button>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6">
                        <p className="text-game-light/80 leading-relaxed">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-12 text-center"
            >
              <p className="text-game-light/60 mb-4">
                Still have questions? We're here to help!
              </p>
              <Link
                to={routes.support()}
                className="inline-block bg-game-accent text-game-dark px-6 py-3 rounded-lg font-bold hover:bg-game-accent/90 transition-all duration-300"
              >
                Contact Support
              </Link>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default FAQPage
