import { motion } from 'framer-motion'

/**
 * Shared gold atmosphere: radial washes, optional pulse orb, optional grid.
 * Place inside a `relative overflow-hidden` section.
 */
const SectionAtmosphere = ({
  pulse = false,
  grid = false,
  intensity = 'mid',
}) => {
  const washes =
    intensity === 'strong'
      ? 'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(209,173,74,0.22), transparent 55%), radial-gradient(ellipse 45% 35% at 95% 85%, rgba(209,173,74,0.1), transparent 50%), radial-gradient(ellipse 40% 30% at 5% 75%, rgba(209,173,74,0.07), transparent 45%)'
      : intensity === 'soft'
        ? 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(209,173,74,0.1), transparent 55%), radial-gradient(ellipse 40% 30% at 85% 90%, rgba(209,173,74,0.05), transparent 50%)'
        : 'radial-gradient(ellipse 75% 50% at 50% -5%, rgba(209,173,74,0.14), transparent 55%), radial-gradient(ellipse 45% 35% at 90% 80%, rgba(209,173,74,0.07), transparent 50%)'

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ background: washes }}
      />
      {pulse && (
        <motion.div
          className="pointer-events-none absolute -top-20 left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-game-accent/10 blur-3xl"
          aria-hidden="true"
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.06, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      {grid && (
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(rgba(214,214,214,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(214,214,214,0.4) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage:
              'radial-gradient(ellipse 70% 55% at 50% 40%, black, transparent)',
          }}
        />
      )}
    </>
  )
}

export default SectionAtmosphere
