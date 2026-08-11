import { motion } from 'framer-motion'

const STEAM_URL =
  'https://store.steampowered.com/app/4152100/Play_With_Friends/'

/**
 * High-attraction Steam wishlist CTA — shared across home hero & wishlist section.
 */
const SteamWishlistButton = ({ size = 'lg', className = '' }) => {
  const sizing =
    size === 'xl'
      ? 'px-10 sm:px-12 py-4 sm:py-5 text-xl sm:text-2xl'
      : 'px-8 sm:px-10 py-3.5 sm:py-4 text-lg sm:text-xl'

  return (
    <motion.a
      href={STEAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.97 }}
      className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-lg bg-game-accent font-bold text-game-dark cursor-pointer select-none transition-[filter] duration-300 hover:brightness-110 ${sizing} ${className}`}
      style={{
        boxShadow:
          '0 0 0 2px rgba(209,173,74,0.35), 0 0 40px -6px rgba(209,173,74,0.65), 0 8px 24px rgba(0,0,0,0.35)',
      }}
    >
      {/* Soft breathing glow behind */}
      <motion.span
        className="pointer-events-none absolute -inset-3 rounded-xl bg-game-accent/40 blur-xl -z-10"
        aria-hidden="true"
        animate={{ opacity: [0.45, 0.85, 0.45], scale: [1, 1.08, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Shine sweep */}
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        aria-hidden="true"
      />
      <span className="relative z-10 tracking-wide">Wishlist on Steam</span>
      <span className="relative z-10 text-game-dark/70 group-hover:translate-x-0.5 transition-transform" aria-hidden="true">
        →
      </span>
    </motion.a>
  )
}

export default SteamWishlistButton
