import { motion } from 'framer-motion'

const StorySection = () => {
  return (
    <section className="py-20 bg-game-dark text-game-light">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-game-accent">
            The Story
          </h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p className="text-game-light/90">
              The end of the world is nigh. Dark forces have tightened their grip over the land, and the Dark Lord has finally set his final plan into motion.
            </p>
            <p className="text-game-light/90">
              His minions roam the wilderness, preparing to attack every inhabited area. With only weeks left, the world has given up hope. People live out their final days pretending nothing is wrong.
            </p>
            <p className="text-game-light/90">
              One night, a small group of friends set out to camp in a cave—not to save the world, but to get drunk and party one last time together.
            </p>
            <p className="text-game-light/90">
              When they wake, something has changed.
            </p>
            <p className="text-game-light/90 font-semibold">
              The ancient cave has granted them strange abilities—powers capable of challenging the Dark Lord himself. Was this a miracle, a blessing, or another cruel game?
            </p>
            <p className="text-game-accent text-xl font-bold text-center mt-8">
              This is where your story begins.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default StorySection
