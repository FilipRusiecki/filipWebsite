import { motion } from 'framer-motion'

import SectionAtmosphere from 'src/components/SectionAtmosphere/SectionAtmosphere'
import SteamWishlistButton from 'src/components/SteamWishlistButton/SteamWishlistButton'

const WishlistCTA = () => {
  return (
    <section className="relative overflow-hidden py-14 md:py-20 border-t border-game-accent/15 text-game-light">
      <SectionAtmosphere intensity="strong" pulse grid />
      <div className="relative container mx-auto px-4 text-center max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-game-accent font-semibold tracking-[0.18em] uppercase text-xs mb-3">
            Steam
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-game-light">
            Help Us Grow
          </h2>
          <p className="text-lg md:text-xl mb-6 leading-relaxed text-game-light/80">
            Wishlisting Play With Friends helps the game reach more players, supports development,
            and shows Steam there&apos;s interest in our chaotic adventure.
          </p>
          <p className="text-base md:text-lg mb-10 text-game-light/60 max-w-2xl mx-auto">
            Early Access is planned for early 2026. We&apos;re a small team balancing full-time jobs —
            your wishlist helps us build the best game we can.
          </p>
          <div className="flex justify-center">
            <SteamWishlistButton size="xl" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default WishlistCTA
