import { motion } from 'framer-motion'

const AppBanner = () => {
  // const [activeTheme] = useThemeSwitcher();

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
      className="mt-12 flex flex-col items-center sm:flex-row sm:justify-between md:mt-2"
    >
      <div className="w-full text-left md:w-1/3">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: 'easeInOut',
            duration: 0.9,
            delay: 0.1,
          }}
          className="font-general-semibold text-ternary-dark dark:text-primary-light mb-4 text-center text-2xl uppercase sm:text-left lg:text-3xl xl:text-4xl"
        >
          Hi, I'm Filip
        </motion.h1>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -180 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: 'easeInOut', duration: 0.9, delay: 0.2 }}
        className="float-right mt-8 w-full text-right sm:mt-0 sm:w-2/3"
      >
        {/* <img
					src={
						activeTheme === 'dark' ? developerLight : developerDark
					}
					alt="Developer"
				/> */}
      </motion.div>
    </motion.section>
  )
}

export default AppBanner
