import { motion } from 'framer-motion'

const WishlistCTA = () => {
  return (
    <section className="py-20 bg-game-accent text-game-dark">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Help Us Grow
          </h2>
          <p className="text-xl mb-8 leading-relaxed">
            Wishlisting Play With Friends directly helps the game grow! Your support helps us reach more players,
            supports development, and shows Steam that there's interest in our chaotic adventure.
          </p>
          <p className="text-lg mb-10 text-game-dark/90">
            The game is planned for Early Access in early 2026. We're two passionate developers working alongside
            contributors while balancing full-time jobs. Your wishlist helps us build the best game possible!
          </p>
          <motion.a
            href="https://store.steampowered.com/app/4152100/Play_With_Friends/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-game-dark text-game-accent px-10 py-5 rounded-lg text-2xl font-bold hover:bg-game-dark/90 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Wishlist on Steam
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default WishlistCTA
