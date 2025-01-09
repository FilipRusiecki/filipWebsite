import { motion } from 'framer-motion'

const Projects = () => {
  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
      <div>
        <a aria-label="Single Project" href="/projects/single-project">
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src="/static/media/web-project-2.f0108702.jpg"
                className="rounded-t-xl border-none"
                alt="Single Project"
              />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  Google Health Platform
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  Web Application
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div>
        <a aria-label="Single Project" href="/projects/single-project">
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src="/static/media/mobile-project-2.a5aae786.jpg"
                className="rounded-t-xl border-none"
                alt="Single Project"
              />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  Phoenix Digital Agency
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  Mobile Application
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div>
        <a aria-label="Single Project" href="/projects/single-project">
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src="/static/media/ui-project-1.41def4d8.jpg"
                className="rounded-t-xl border-none"
                alt="Single Project"
              />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  Project Management UI
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  UI/UX Design
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div>
        <a aria-label="Single Project" href="/projects/single-project">
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src="/static/media/ui-project-2.d2891914.jpg"
                className="rounded-t-xl border-none"
                alt="Single Project"
              />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  Cloud Storage Platform
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  UI/UX Design
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div>
        <a aria-label="Single Project" href="/projects/single-project">
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src="/static/media/mobile-project-1.0aa0cb76.jpg"
                className="rounded-t-xl border-none"
                alt="Single Project"
              />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  React Social App
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  Mobile Application
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div>
        <a aria-label="Single Project" href="/projects/single-project">
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src="/static/media/web-project-1.dbc2198e.jpg"
                className="rounded-t-xl border-none"
                alt="Single Project"
              />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  Apple Design System
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  Web Application
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  )
}

export default Projects
