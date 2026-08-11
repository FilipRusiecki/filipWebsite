import { motion } from 'framer-motion'

import SectionAtmosphere from 'src/components/SectionAtmosphere/SectionAtmosphere'

const MatureContentNotice = () => {
  return (
    <section className="relative overflow-hidden py-10 md:py-14 border-t border-game-accent/15">
      <SectionAtmosphere intensity="soft" />
      <div className="relative container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="border-l-2 border-game-accent/45 pl-6 md:pl-8"
        >
          <h3 className="text-xl md:text-2xl font-bold mb-3 text-game-light">
            Mature Content Description
          </h3>
          <p className="text-game-light/70 leading-relaxed text-base md:text-lg">
            Play With Friends contains mild cartoon-style combat, light-hearted references to alcohol,
            tobacco, and fictional &quot;drug&quot; items. Effects are comedic and stylized (screen wobble,
            movement changes). There is no realistic substance use, injury, or gore.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default MatureContentNotice
