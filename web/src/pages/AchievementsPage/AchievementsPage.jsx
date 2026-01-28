import { Metadata } from '@redwoodjs/web'
import { motion } from 'framer-motion'

import Navigation from 'src/components/Navigation/Navigation'
import Footer from 'src/components/Footer/Footer'

const AchievementsPage = () => {
  // Generate 50 placeholder achievements
  const achievements = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Achievement ${i + 1}`,
    description: `This is a placeholder description for achievement ${i + 1}. This will be updated with the actual achievement details, requirements, and unlock conditions.`,
    icon: `https://via.placeholder.com/64x64/252325/D1AD4A?text=${i + 1}`,
  }))

  return (
    <>
      <Metadata
        title="Achievements - Filip Rusiecki Video Games"
        description="View all achievements and unlockables in Play With Friends"
      />
      <div className="dark bg-game-dark min-h-screen">
        <Navigation />
        <div className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-game-light">
                Achievements
              </h1>
              <p className="text-xl text-game-light/80 max-w-2xl mx-auto">
                Complete challenges and unlock achievements to showcase your progress
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-6 hover:border-game-accent transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <img
                        src={achievement.icon}
                        alt={achievement.name}
                        className="w-16 h-16 rounded-lg border-2 border-game-accent/30"
                        onError={(e) => {
                          e.target.src = `https://via.placeholder.com/64x64/252325/D1AD4A?text=${achievement.id}`
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-game-light mb-2">
                        {achievement.name}
                      </h3>
                      <p className="text-game-light/80 text-sm leading-relaxed">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default AchievementsPage
