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
          className="font-general-semibold text-ternary-dark dark:text-primary-light text-center text-2xl uppercase sm:text-left lg:text-3xl xl:text-4xl"
        >
          Hi, I'm Filip
        </motion.h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            ease: 'easeInOut',
            duration: 0.9,
            delay: 0.3,
          }}
          className="flex justify-center sm:block"
        >
          <a
            download="Filip Resume.pdf"
            href="/files/Stoman-Resume.pdf"
            className="font-general-medium dark:border-ternary-dark mb-6 mt-12 flex w-36 items-center justify-center rounded-lg border border-indigo-200 bg-indigo-50 py-2.5 text-lg text-gray-500 shadow-lg duration-500 hover:bg-indigo-500 hover:text-white focus:ring-1 focus:ring-indigo-900 sm:mb-0 sm:w-48 sm:py-3"
            aria-label="Download Resume"
          >
            {/* <FiArrowDownCircle className="mr-2 sm:mr-3 h-5 w-5 sn:w-6 sm:h-6 duration-100"></FiArrowDownCircle> */}
            <span className="font-general-medium text-sm duration-100 sm:text-lg">
              Download CV
            </span>
          </a>
        </motion.div>
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
