import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-game-dark text-game-light">
      <div className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-game-light">
            Play With Friends
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl lg:text-3xl mb-8 text-game-light/90 max-w-3xl mx-auto"
          >
            A Retro Party Rogue-like to Play With Friends
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl mb-12 text-game-light/80 max-w-2xl mx-auto"
          >
            Survive the apocalypse, grow stronger, and prove you're more than just drunk cave friends.
            Or just dance on your enemies. Either way, it's chaos.
          </motion.p>
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            href="https://store.steampowered.com/app/4152100/Play_With_Friends/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-game-accent text-game-dark px-8 py-4 rounded-lg text-xl font-bold hover:bg-game-accent/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Wishlist on Steam
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
