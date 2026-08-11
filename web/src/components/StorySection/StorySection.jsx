import { motion } from 'framer-motion'

import SectionAtmosphere from 'src/components/SectionAtmosphere/SectionAtmosphere'

const paragraphs = [
  'The end of the world is nigh. Dark forces have tightened their grip over the land, and the Dark Lord has finally set his final plan into motion.',
  'His minions roam the wilderness, preparing to attack every inhabited area. With only weeks left, the world has given up hope. People live out their final days pretending nothing is wrong.',
  'One night, a small group of friends set out to camp in a cave—not to save the world, but to get drunk and party one last time together.',
  'When they wake, something has changed.',
  'The ancient cave has granted them strange abilities—powers capable of challenging the Dark Lord himself. Was this a miracle, a blessing, or another cruel game?',
]

const StorySection = () => {
  return (
    <section className="relative overflow-hidden py-14 md:py-20 border-t border-game-accent/15 text-game-light">
      <SectionAtmosphere intensity="mid" grid pulse />
      <div className="relative container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
          className="mb-8 md:mb-10"
        >
          <p className="text-game-accent font-semibold tracking-[0.18em] uppercase text-xs mb-3">
            Play With Friends
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-game-light">
            The Story
          </h2>
        </motion.div>

        <div className="space-y-5 md:space-y-6 text-base md:text-lg leading-relaxed">
          {paragraphs.map((text, index) => (
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className={
                index === paragraphs.length - 1
                  ? 'text-game-light font-semibold'
                  : 'text-game-light/80'
              }
            >
              {text}
            </motion.p>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="text-game-accent text-xl md:text-2xl font-bold mt-10 md:mt-12"
        >
          This is where your story begins.
        </motion.p>
      </div>
    </section>
  )
}

export default StorySection
