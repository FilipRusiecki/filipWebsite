import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ScreenshotGallery = ({ screenshots = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(null)

  // Placeholder screenshots if none provided
  const images = screenshots.length > 0
    ? screenshots
    : Array.from({ length: 6 }, (_, i) => ({
        id: i,
        url: `https://via.placeholder.com/800x450/252325/D1AD4A?text=Screenshot+${i + 1}`,
        alt: `Game Screenshot ${i + 1}`
      }))

  return (
    <section className="py-20 bg-game-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-game-light">
          Game Screenshots
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
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
                className="relative max-w-6xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={images[selectedIndex].url}
                  alt={images[selectedIndex].alt}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg"
                />
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="absolute top-4 right-4 bg-game-accent text-game-dark w-10 h-10 rounded-full font-bold text-xl hover:bg-game-accent/90 transition-colors"
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
