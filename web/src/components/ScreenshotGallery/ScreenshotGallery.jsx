import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import SectionAtmosphere from 'src/components/SectionAtmosphere/SectionAtmosphere'

const ScreenshotGallery = ({ screenshots = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(null)

  const defaultScreenshots = [
    {
      id: 1,
      url: '/images/screenshots/Screenshot_20260121_164451.png',
      alt: 'Play With Friends - Game Screenshot 1',
    },
    {
      id: 2,
      url: '/images/screenshots/Screenshot_20260121_164529.png',
      alt: 'Play With Friends - Game Screenshot 2',
    },
    {
      id: 3,
      url: '/images/screenshots/Screenshot_20260121_164630.png',
      alt: 'Play With Friends - Game Screenshot 3',
    },
    {
      id: 4,
      url: '/images/screenshots/Screenshot_20260121_164707.png',
      alt: 'Play With Friends - Game Screenshot 4',
    },
    {
      id: 5,
      url: '/images/screenshots/Screenshot_20260121_164851.png',
      alt: 'Play With Friends - Game Screenshot 5',
    },
    {
      id: 6,
      url: '/images/screenshots/Screenshot_20260121_165521.png',
      alt: 'Play With Friends - Game Screenshot 6',
    },
  ]

  const images = screenshots.length > 0 ? screenshots : defaultScreenshots

  return (
    <section className="relative overflow-hidden py-14 md:py-20 border-t border-game-accent/15">
      <SectionAtmosphere intensity="mid" grid />
      <div className="relative container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8 md:mb-10"
        >
          <p className="text-game-accent font-semibold tracking-[0.18em] uppercase text-xs mb-3">
            In-game
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-game-light mb-3">
            Screenshots
          </h2>
          <p className="text-game-light/65 text-lg max-w-xl mx-auto">
            Retro chaos in motion — click any shot to go fullscreen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {images.map((screenshot, index) => (
            <motion.button
              type="button"
              key={screenshot.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.5, delay: Math.min(index * 0.07, 0.35) }}
              className={`group relative overflow-hidden border border-game-accent/25 hover:border-game-accent/70 transition-all duration-300 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-game-accent ${
                index === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={screenshot.url}
                alt={screenshot.alt}
                className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                  index === 0
                    ? 'h-56 sm:h-72 md:h-full md:min-h-[22rem] lg:min-h-[28rem]'
                    : 'h-44 sm:h-52 md:h-56'
                }`}
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-game-dark/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/92 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedIndex(null)}
            >
              <motion.div
                initial={{ scale: 0.92, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.92, opacity: 0 }}
                className="relative max-w-6xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={images[selectedIndex].url}
                  alt={images[selectedIndex].alt}
                  className="max-w-full max-h-[90vh] w-full h-auto object-contain"
                />
                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  className="absolute top-2 right-2 md:top-4 md:right-4 bg-game-accent text-game-dark w-10 h-10 md:w-12 md:h-12 font-bold text-xl md:text-2xl hover:bg-game-accent/90 transition-colors flex items-center justify-center"
                  aria-label="Close"
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ScreenshotGallery
