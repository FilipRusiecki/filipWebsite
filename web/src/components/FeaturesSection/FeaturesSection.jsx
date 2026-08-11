import { motion } from 'framer-motion'

import SectionAtmosphere from 'src/components/SectionAtmosphere/SectionAtmosphere'

const features = [
  {
    title: 'Multiplayer Co-op',
    description:
      'Play with up to 5 players in chaotic adventures. Laugh through disasters, troll your friends, or accidentally set everyone on fire.',
  },
  {
    title: 'True Rogue-like',
    description:
      'Death matters. If you die, you restart. Each run is different with random dungeons, bizarre quests, chaotic loot, and unpredictable outcomes.',
  },
  {
    title: 'Progression System',
    description:
      'Between runs, earn coins and experience to unlock permanent upgrades, cosmetics, and career rewards.',
  },
  {
    title: 'Bank & Shop',
    description:
      'Bank system with permanent shop upgrades and run-based map shops with temporary items to help you survive.',
  },
  {
    title: 'Randomized Content',
    description:
      'Every run features randomized dungeons, enemies, quests, and loot. No two adventures are the same.',
  },
  {
    title: 'Proximity Voice Chat',
    description:
      'Communicate with friends using proximity voice chat. Emote, mess around, and ruin everything together.',
  },
  {
    title: 'Trophy System',
    description:
      'Complete achievements and unlock trophies as you progress through your chaotic journey.',
  },
  {
    title: 'PS1-Inspired Visuals',
    description:
      'Stylized low-poly visuals that capture the nostalgic charm of retro gaming with modern polish.',
  },
]

const FeaturesSection = () => {
  return (
    <section className="relative overflow-hidden py-14 md:py-20 border-t border-game-accent/15">
      <SectionAtmosphere intensity="soft" />
      <div className="relative container mx-auto px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="mb-10 md:mb-12"
        >
          <p className="text-game-accent font-semibold tracking-[0.18em] uppercase text-xs mb-3">
            What you&apos;ll play
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-game-light mb-4">
            Core Features
          </h2>
          <p className="text-xl text-game-light/70 max-w-2xl">
            Rogue-like chaos meets PS1 nostalgia — built for friends, disasters, and another run.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 md:gap-y-10">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -16 : 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (index % 4) * 0.06 }}
              className="border-l-2 border-game-accent/40 pl-5 md:pl-6"
            >
              <span className="text-game-accent font-mono text-xs tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-game-light mt-1 mb-2">
                {feature.title}
              </h3>
              <p className="text-game-light/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
