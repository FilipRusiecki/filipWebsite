import { motion } from 'framer-motion'

import frugo from './1.jpg'
import zhill from './2.jpg'
import Aipic from './ai.png'
import chr from './chr1.jpg'
import mcpic from './Dimension.png'
import famas from './famas.png'
import flowAlgo from './FlowAlgorithmWithHeatmap.png'
import fuzzy from './fuzzy.png'
import m4bg from './m4bg.png'
import m4g from './m4g.png'
import m4gw from './m4gw.png'
import m4pb from './m4pb.png'
import m4wg from './m4wg.png'
import p250wg from './p250wg.png'
import vrpic from './VR3.png'

const Projects = () => {
  return (
    <div className="ml-5 mr-5 mt-6 grid grid-cols-1 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
      <div>
        <a
          aria-label="Flow Algorithm with Heat Map"
          href="https://github.com/FilipRusiecki/ProjectsToShow/tree/main/FlowAlgorithmWithHeatMap "
        >
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl border-2 border-solid border-black  bg-slate-100 shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src={flowAlgo}
                className="rounded-t-x1 border-none"
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
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl border-2 border-solid border-black bg-slate-100 shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src={fuzzy}
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
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl border-2 border-solid border-black  bg-slate-100 shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src={Aipic}
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
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl border-2 border-solid border-black  bg-slate-100 shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src={vrpic}
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
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl border-2 border-solid border-black  bg-slate-100 shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src={mcpic}
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
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl border-2 border-solid border-black  bg-slate-100 shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src={zhill}
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

      <div>
        <a
          aria-label="Map for Counter:Strike 2 Game"
          href="https://steamcommunity.com/sharedfiles/filedetails/?id=3169731504"
        >
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl border-2 border-solid border-black  bg-slate-100 shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src={frugo}
                className="rounded-t-xl border-none"
                alt="frugo map"
              />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  Map for Counter:Strike 2 Game
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  A map that is published on steam with over 16K downloads and 4
                  star rating.
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>

      <div>
        <a
          aria-label="Map for Counter:Strike 2 Game"
          href="https://steamcommunity.com/sharedfiles/filedetails/?id=2303607674 "
        >
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl border-2 border-solid border-black  bg-slate-100 shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img src={chr} className="rounded-t-xl border-none" alt="chr" />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  Map for Counter:Strike 2 Game
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  A map that is published on steam with over 10K downloads and 3
                  star rating.
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>

      <div>
        <a
          aria-label="Gun Skin for Counter:Strike 2 Game"
          href="https://steamcommunity.com/sharedfiles/filedetails/?id=3171183590	"
        >
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl border-2 border-solid border-black bg-slate-100 shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src={famas}
                className="rounded-t-xl border-none"
                alt="famas"
              />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  Gun Skin for Counter:Strike 2 Game
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  A skin for a weapon inside the game published on steam
                  workshop, Blender, Gimp/Photoshop and valve tools were used
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>

      <div>
        <a
          aria-label="Gun Skin for Counter:Strike 2 Game"
          href="https://steamcommunity.com/sharedfiles/filedetails/?id=3171183590	"
        >
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl border-2 border-solid border-black bg-slate-100 shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src={p250wg}
                className="rounded-t-xl border-none"
                alt="p250wg"
              />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  Gun Skin for Counter:Strike 2 Game
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  A skin for a weapon inside the game published on steam
                  workshop, Blender, Gimp/Photoshop and valve tools were used
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>

      <div>
        <a
          aria-label="Gun Skin for Counter:Strike 2 Game"
          href="https://steamcommunity.com/sharedfiles/filedetails/?id=3171183590	"
        >
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl border-2 border-solid border-black bg-slate-100 shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img src={m4wg} className="rounded-t-xl border-none" alt="m4wg" />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  Gun Skin for Counter:Strike 2 Game
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  A skin for a weapon inside the game published on steam
                  workshop, Blender, Gimp/Photoshop and valve tools were used
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>

      <div>
        <a
          aria-label="Gun Skin for Counter:Strike 2 Game"
          href="https://steamcommunity.com/sharedfiles/filedetails/?id=3171183590	"
        >
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl border-2 border-solid border-black bg-slate-100 shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img src={m4bg} className="rounded-t-xl border-none" alt="m4bg" />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  Gun Skin for Counter:Strike 2 Game
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  A skin for a weapon inside the game published on steam
                  workshop, Blender, Gimp/Photoshop and valve tools were used
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>

      <div>
        <a
          aria-label="Gun Skin for Counter:Strike 2 Game"
          href="https://steamcommunity.com/sharedfiles/filedetails/?id=3171183590	"
        >
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl border-2 border-solid border-black bg-slate-100 shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img src={m4pb} className="rounded-t-xl border-none" alt="m4pb" />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  Gun Skin for Counter:Strike 2 Game
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  A skin for a weapon inside the game published on steam
                  workshop, Blender, Gimp/Photoshop and valve tools were used
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>

      <div>
        <a
          aria-label="Gun Skin for Counter:Strike 2 Game"
          href="https://steamcommunity.com/sharedfiles/filedetails/?id=3171183590	"
        >
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl border-2 border-solid border-black bg-slate-100 shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img src={m4gw} className="rounded-t-xl border-none" alt="m4gw" />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  Gun Skin for Counter:Strike 2 Game
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  A skin for a weapon inside the game published on steam
                  workshop, Blender, Gimp/Photoshop and valve tools were used
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>

      <div>
        <a
          aria-label="Gun Skin for Counter:Strike 2 Game"
          href="https://steamcommunity.com/sharedfiles/filedetails/?id=3171183590	"
        >
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl border-2 border-solid border-black bg-slate-100 shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img src={m4g} className="rounded-t-xl border-none" alt="Zm4g" />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  Gun Skin for Counter:Strike 2 Game
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  A skin for a weapon inside the game published on steam
                  workshop, Blender, Gimp/Photoshop and valve tools were used
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>

      <div>
        <a
          aria-label="Gun Skin for Counter:Strike 2 Game"
          href="https://steamcommunity.com/sharedfiles/filedetails/?id=3171183590	"
        >
          <div className="bg-secondary-light dark:bg-ternary-dark mb-10 cursor-pointer rounded-xl border-2 border-solid border-black bg-slate-100 shadow-lg hover:shadow-xl sm:mb-0">
            <div>
              <img
                src={m4bg}
                className="rounded-t-xl border-none"
                alt="Zombie gamemode for Counter:Strike 2 Game"
              />
              <div className="px-4 py-6 text-center">
                <p className="font-general-medium text-ternary-dark dark:text-ternary-light mb-2 text-lg md:text-xl">
                  Gun Skin for Counter:Strike 2 Game
                </p>
                <span className="text-ternary-dark dark:text-ternary-light text-lg">
                  A skin for a weapon inside the game published on steam
                  workshop, Blender, Gimp/Photoshop and valve tools were used
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
