import { motion } from 'framer-motion'
import FeatureCard from 'src/components/FeatureCard/FeatureCard'

const FeaturesSection = () => {
  const features = [
    {
      title: 'Multiplayer Co-op',
      description: 'Play with up to 5 players in chaotic adventures. Laugh through disasters, troll your friends, or accidentally set everyone on fire.',
      icon: '👥',
    },
    {
      title: 'True Rogue-like',
      description: 'Death matters. If you die, you restart. Each run is different with random dungeons, bizarre quests, chaotic loot, and unpredictable outcomes.',
      icon: '💀',
    },
    {
      title: 'Progression System',
      description: 'Between runs, earn coins and experience to unlock permanent upgrades, cosmetics, and career rewards.',
      icon: '📈',
    },
    {
      title: 'Bank & Shop',
      description: 'Bank system with permanent shop upgrades and run-based map shops with temporary items to help you survive.',
      icon: '🏪',
    },
    {
      title: 'Randomized Content',
      description: 'Every run features randomized dungeons, enemies, quests, and loot. No two adventures are the same.',
      icon: '🎲',
    },
    {
      title: 'Proximity Voice Chat',
      description: 'Communicate with friends using proximity voice chat. Emote, mess around, and ruin everything together.',
      icon: '🎤',
    },
    {
      title: 'Trophy System',
      description: 'Complete achievements and unlock trophies as you progress through your chaotic journey.',
      icon: '🏆',
    },
    {
      title: 'PS1-Inspired Visuals',
      description: 'Stylized low-poly visuals that capture the nostalgic charm of retro gaming with modern polish.',
      icon: '🎮',
    },
  ]

  return (
    <section className="py-20 bg-game-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-game-light">
            Core Features
          </h2>
          <p className="text-xl text-game-light/80 max-w-2xl mx-auto">
            💀 Rogue-like Chaos Meets PS1 Nostalgia
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
