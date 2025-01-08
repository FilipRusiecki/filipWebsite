import { motion } from 'framer-motion'

const Projects = () => {
  return (
    <div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          ease: 'easeInOut',
          duration: 1.0,
          delay: 0.1,
        }}
        className="font-general-semibold text-ternary-dark dark:text-primary-light bg-gray-400 text-center text-2xl sm:text-center lg:text-3xl xl:text-4xl"
      >
        Projects Showcase
      </motion.h1>
    </div>
  )
}

export default Projects
