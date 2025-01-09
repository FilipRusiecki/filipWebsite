import { motion } from 'framer-motion'

import elogo from './email.png'
const Contact = () => {
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
        className="font-general-semibold text-ternary-dark dark:text-primary-light mt-80 bg-slate-100 text-center text-2xl sm:text-center lg:text-3xl xl:text-4xl"
      >
        My Contact
      </motion.h1>
      <div className=" mb-4 ml-auto mr-auto mt-4 max-w-72 rounded-xl border-2 border-solid border-y-zinc-700  bg-gray-200 text-center align-middle">
        <a
          aria-label="Flow Algorithm with Heat Map"
          href="mailto:fifuniek080@gmail.com"
        >
          <p className="-mt-4 mb-3 text-2xl">
            <img
              src={elogo}
              className=" -mb-3 ml-auto mr-auto  mt-4 block h-14"
              alt="email pic"
            />
            fifuniek080@gmail.com
          </p>
        </a>
      </div>
    </div>
  )
}

export default Contact
