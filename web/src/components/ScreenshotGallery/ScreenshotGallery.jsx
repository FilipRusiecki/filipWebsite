import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ScreenshotGallery = ({ screenshots = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(null)

  // Real game screenshots
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
    <section className="py-12 md:py-20 bg-game-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-8 md:mb-12 text-game-light">
          Game Screenshots
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {images.map((screenshot, index) => (
            <motion.div
              key={screenshot.id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="cursor-pointer overflow-hidden rounded-lg border-2 border-game-accent/30 hover:border-game-accent transition-all"
              onClick={() => setSelectedIndex(index)}
            >
              <img
                src={screenshot.url}
                alt={screenshot.alt}
                className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover hover:scale-110 transition-transform duration-300"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedIndex(null)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-6xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={images[selectedIndex].url}
                  alt={images[selectedIndex].alt}
                  className="max-w-full max-h-[90vh] w-full h-auto object-contain rounded-lg"
                />
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="absolute top-2 right-2 md:top-4 md:right-4 bg-game-accent text-game-dark w-10 h-10 md:w-12 md:h-12 rounded-full font-bold text-xl md:text-2xl hover:bg-game-accent/90 transition-colors flex items-center justify-center"
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
