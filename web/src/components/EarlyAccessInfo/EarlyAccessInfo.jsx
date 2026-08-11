import { motion } from 'framer-motion'

import SectionAtmosphere from 'src/components/SectionAtmosphere/SectionAtmosphere'

const expectations = [
  'The game is actively developed with regular updates',
  "Player feedback shapes the game's direction",
  'Development may take longer to ensure quality',
  'Progress, updates, and transparency are our priorities',
  'Community involvement is core to development',
]

const EarlyAccessInfo = () => {
  return (
    <section className="relative overflow-hidden py-14 md:py-20 border-t border-game-accent/15 text-game-light">
      <SectionAtmosphere intensity="soft" />
      <div className="relative container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <p className="text-game-accent font-semibold tracking-[0.18em] uppercase text-xs mb-3">
            Roadmap
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-game-light mb-6">
            Early Access
          </h2>
          <p className="text-lg md:text-xl text-game-light/75 leading-relaxed">
            Play With Friends is planned for Early Access in{' '}
            <strong className="text-game-accent font-semibold">early 2026</strong>. We&apos;re three
            passionate developers working alongside contributors while balancing full-time jobs.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-xl md:text-2xl font-bold text-game-light mb-6">
            What to expect
          </h3>
          <ul className="space-y-5">
            {expectations.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="flex gap-4 border-l-2 border-game-accent/40 pl-5 text-game-light/80 text-lg"
              >
                <span className="text-game-accent font-mono text-sm pt-1 tabular-nums shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-5 text-game-light/70 text-lg leading-relaxed"
        >
          <p>
            The full version will expand with more content, enemies, bosses, weapons, areas, better
            polish, balance, and quality-of-life improvements. Pricing will remain the same during
            and after Early Access.
          </p>
          <p>
            An optional Supporter Bundle (cosmetics only, no pay-to-win) may be available to help
            support development.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default EarlyAccessInfo
