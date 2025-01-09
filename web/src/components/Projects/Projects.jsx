import { motion } from 'framer-motion'

const Projects = () => {
  return (
    <div className="ml-5 mr-5 mt-6 grid grid-cols-1 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
      <div>
        <a
          aria-label="Flow Algorithm with Heat Map"
          href="https://github.com/FilipRusiecki/ProjectsToShow/tree/main/FlowAlgorithmWithHeatMap "
        >
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src="/static/media/web-project-2.f0108702.jpg"
                className="rounded-t-xl border-none"
                alt="Flow Algorithm with Heat Map"
              />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  Flow Algorithm with Heat Map
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  Flow algorithm that has a heat map and a traversal path from
                  point A to point B that avoids obstacles.
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div>
        <a
          aria-label="Fuzzy logic"
          href="https://github.com/FilipRusiecki/ProjectsToShow/tree/main/FuzzyLogic"
        >
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src="/static/media/mobile-project-2.a5aae786.jpg"
                className="rounded-t-xl border-none"
                alt="Fuzzy logic"
              />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  Fuzzy logic
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  Fuzzy logic is calculating algorithm based on human like way
                  of thinking.
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div>
        <a
          aria-label="AI behaviours"
          href="https://github.com/FilipRusiecki/ProjectsToShow/tree/main/SimpleAIBehaviours"
        >
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src="/static/media/ui-project-1.41def4d8.jpg"
                className="rounded-t-xl border-none"
                alt="AI behaviours"
              />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  AI behaviours
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  Program showing AI behaviours such as: Pursue, Flee, Seek,
                  Kinematic Wander, Arrive Slow/Fast.
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div>
        <a
          aria-label="MultiPlayer VR Game"
          href=" https://github.com/FilipRusiecki/FinalYearProject"
        >
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src="/static/media/ui-project-2.d2891914.jpg"
                className="rounded-t-xl border-none"
                alt="MultiPlayer VR Game"
              />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  MultiPlayer VR Game
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  Includes interaction with objects and other players,
                  multiplayer lobby, useable plane, day/night cycle.
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div>
        <a
          aria-label="Minecraft Modification"
          href="https://mcreator.net/modification/99286/anywhereyoogo		"
        >
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src="/static/media/mobile-project-1.0aa0cb76.jpg"
                className="rounded-t-xl border-none"
                alt="Minecraft Modification"
              />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  Minecraft Modification
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  Partially done with visual scripting. Huge Modification to the
                  base game that changes and expands the dynamic of the core
                  game. 6 Dimensions, 38 New Weapons, 70 New creatures, 22 Ores,
                  tools and armor sets.
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div>
        <a
          aria-label="Zombie gamemode for Counter:Strike 2 Game"
          href="https://steamcommunity.com/sharedfiles/filedetails/?id=3171183590	"
        >
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src="/static/media/web-project-1.dbc2198e.jpg"
                className="rounded-t-xl border-none"
                alt="Zombie gamemode for Counter:Strike 2 Game"
              />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  Zombie gamemode for Counter:Strike 2 Game
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  A gamemode map that is published on steam with over 21K
                  downloads and 4 star rating.
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
