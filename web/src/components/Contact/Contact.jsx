import { Link, routes } from '@redwoodjs/router'
import { motion } from 'framer-motion'

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
        Contact
      </motion.h1>
      <div className="mb-4 ml-auto mr-auto mt-4 max-w-72 rounded-xl border-2 border-solid border-y-zinc-700 bg-gray-200 p-4 text-center align-middle">
        <p className="mb-3 text-base text-zinc-700">
          Reach us via Discord, Support, or Business Enquiry — no personal email
          listed publicly.
        </p>
        <div className="flex flex-col gap-2">
          <a
            href="https://discord.gg/QgUmqpKvWJ"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-game-accent hover:underline"
          >
            Discord
          </a>
          <Link
            to={routes.support()}
            className="font-semibold text-game-accent hover:underline"
          >
            Support
          </Link>
          <Link
            to={routes.businessEnquiry()}
            className="font-semibold text-game-accent hover:underline"
          >
            Business Enquiry
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Contact
