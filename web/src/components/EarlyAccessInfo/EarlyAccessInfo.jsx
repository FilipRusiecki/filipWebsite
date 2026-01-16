import { motion } from 'framer-motion'

const EarlyAccessInfo = () => {
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
            Early Access
          </h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p className="text-game-light/90">
              Play With Friends is planned for Early Access in <strong className="text-game-accent">early 2026</strong>.
              We're two passionate developers working alongside contributors while balancing full-time jobs.
            </p>
            <div className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-6 my-8">
              <h3 className="text-2xl font-bold mb-4 text-game-accent">What to Expect:</h3>
              <ul className="space-y-3 list-disc list-inside text-game-light/90">
                <li>The game is actively developed with regular updates</li>
                <li>Player feedback shapes the game's direction</li>
                <li>Development may take longer to ensure quality</li>
                <li>Progress, updates, and transparency are our priorities</li>
                <li>Community involvement is core to development</li>
              </ul>
            </div>
            <p className="text-game-light/90">
              The full version will expand with more content, enemies, bosses, weapons, areas, better polish,
              balance, and quality-of-life improvements. Pricing will remain the same during and after Early Access.
            </p>
            <p className="text-game-light/90">
              An optional Supporter Bundle (cosmetics only, no pay-to-win) may be available to help support development.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default EarlyAccessInfo
