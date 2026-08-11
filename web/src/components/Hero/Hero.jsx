import { motion } from 'framer-motion'

import SectionAtmosphere from 'src/components/SectionAtmosphere/SectionAtmosphere'
import SteamWishlistButton from 'src/components/SteamWishlistButton/SteamWishlistButton'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-game-dark text-game-light">
      <SectionAtmosphere intensity="strong" pulse grid />

      <div className="relative container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/images/logos/FRVGLOGOtransperant.png"
            alt="Filip Rusiecki Video Games"
            className="h-40 sm:h-52 md:h-64 lg:h-80 xl:h-96 w-auto object-contain mx-auto mb-6 sm:mb-8"
          />
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 text-game-light px-2">
            Play With Friends
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 text-game-light/90 max-w-3xl mx-auto px-4"
          >
            A Retro Party Rogue-like to Play With Friends
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl mb-8 sm:mb-12 text-game-light/80 max-w-2xl mx-auto px-4"
          >
            Survive the apocalypse, grow stronger, and prove you&apos;re more than just drunk cave friends.
            Or just dance on your enemies. Either way, it&apos;s chaos.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex justify-center"
          >
            <SteamWishlistButton size="lg" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
