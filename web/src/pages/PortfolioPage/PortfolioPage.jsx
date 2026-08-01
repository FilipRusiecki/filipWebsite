import { Metadata } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import { motion } from 'framer-motion'

import Navigation from 'src/components/Navigation/Navigation'
import Footer from 'src/components/Footer/Footer'

const categories = [
  {
    id: 'programs-algorithms',
    title: 'Programs / Algorithms',
    description: 'Labs, tools, and systems work — AI, pathfinding, and software projects.',
    projects: [
      {
        id: 'python-flask',
        title: 'Python & Flask Projects',
        description:
          'A collection of Python coursework and experiments — including Flask web apps for a personal multi-page site, score saving with sessions and leaderboards, and early form handling. Covers routing, templates, file-based data, and server-side Python fundamentals.',
        tags: ['Python', 'Flask', 'Web Dev', 'HTML Templates', 'Coursework'],
        link: 'https://github.com/FilipRusiecki/Python',
        image: null,
      },
      {
        id: 'flow-algorithm-heatmap',
        title: 'Flow Algorithm with Heat Map',
        description:
          'A C++ / SFML lab (AILab5) that visualizes a flow algorithm with a heat map and a path from point A to point B while avoiding obstacles. Demonstrates pathfinding and spatial cost visualization for game AI.',
        tags: ['C++', 'SFML', 'Game AI', 'Pathfinding', 'Heat Map'],
        link: 'https://github.com/FilipRusiecki/ProjectsToShow/tree/main/FlowAlgorithmWithHeatMap',
        image: null,
      },
      {
        id: 'fuzzy-logic',
        title: 'Fuzzy Logic',
        description:
          'A C++ / SFML lab demonstrating a fuzzy logic algorithm for game AI decision-making. Built as a Visual Studio project (Lab7) with player and enemy entities to show how fuzzy systems can drive behaviour beyond hard true/false rules.',
        tags: ['C++', 'SFML', 'Game AI', 'Fuzzy Logic', '2D'],
        link: 'https://github.com/FilipRusiecki/ProjectsToShow/tree/main/FuzzyLogic',
        image: null,
      },
      {
        id: 'simple-ai-behaviours',
        title: 'Simple AI Behaviours',
        description:
          'A C++ / SFML lab demonstrating classic steering behaviours — Seek, Flee, Pursue, Wander, and Arrive (slow/fast) — each with a vision cone. Built as a Visual Studio project (AILab3) to explore foundational game AI movement systems.',
        tags: ['C++', 'SFML', 'Game AI', 'Steering Behaviours', '2D'],
        link: 'https://github.com/FilipRusiecki/ProjectsToShow/tree/main/SimpleAIBehaviours',
        image: null,
      },
    ],
  },
  {
    id: 'games',
    title: 'Games',
    description: 'Shipped titles, jam games, prototypes, and Minecraft mods.',
    projects: [
      {
        id: 'cube-slayer',
        title: 'Cube Slayer',
        description:
          'A commercial Steam release by FRVG — a fast-paced top-down 2D endless survival shooter. Fight zombie waves, pick random weapons, level up for upgrades, unlock maps, and buy permanent buffs between runs. Built and shipped to learn the full Steam publishing pipeline (released Jun 14, 2025).',
        tags: ['Steam', 'Game Dev', 'Roguelike', 'Top-Down Shooter', 'Published'],
        link: 'https://store.steampowered.com/app/3775870/Cube_Slayer/',
        image: null,
      },
      {
        id: 'useful-zombie-flesh',
        title: 'Useful Zombie Flesh',
        description:
          'A Minecraft Forge mod that gives rotten flesh a real purpose — turning a near-useless drop into something players can cook, craft, and use. Built with Java / MCreator as a focused quality-of-life modding project.',
        tags: ['Minecraft', 'Java', 'Forge', 'Modding', 'QoL'],
        link: 'https://github.com/FilipRusiecki/UsefulZombieFlesh_MINECRAFT_MOD',
        image: null,
      },
      {
        id: 'anywhere-you-go',
        title: 'AnywhereYouGo',
        description:
          'A Minecraft Forge mod that expands the game with new dimensions, mobs, food, armor, tools, weapons, bosses, and dungeons. Built and published as a beta on CurseForge — a content-focused modding project exploring custom world content and gameplay systems.',
        tags: ['Minecraft', 'Java', 'Forge', 'Modding', 'Game Content'],
        link: 'https://legacy.curseforge.com/minecraft/mc-mods/anywhereyougo',
        image: null,
      },
      {
        id: 'ggj-team-cermit',
        title: 'Cermit (Global Game Jam)',
        description:
          'A Unity game jam project with Team Cermit (“C stands for Cracked”) — built under Global Game Jam time pressure with C#, custom shaders, and a full Unity project pipeline. A collaborative prototype focused on shipping a playable experience in a short jam window.',
        tags: ['Unity', 'C#', 'Game Jam', 'Shaders', 'Team Project'],
        link: 'https://github.com/FilipRusiecki/GGJ-Team-Cermit',
        image: null,
      },
      {
        id: 'cube-field',
        title: 'Cube Field',
        description:
          'A C++ game built with SFML and OpenGL (GLEW) where the world is made of cubes. Explores 3D math (vectors, matrices), cube rendering, game objects, and easing — a graphics-focused project blending SFML with OpenGL.',
        tags: ['C++', 'SFML', 'OpenGL', '3D Graphics', 'Game Dev'],
        link: 'https://github.com/FilipRusiecki/ProjectsToShow/tree/main/CubeField',
        image: null,
      },
      {
        id: 'cube-tower-jump',
        title: 'Cube Tower Jump',
        description:
          'An endless runner built in C++ with Visual Studio — jump and climb through a cube tower as the challenge keeps going. A focused gameplay prototype exploring continuous progression and timing-based movement.',
        tags: ['C++', 'Game Dev', 'Endless Runner', '2D'],
        link: 'https://github.com/FilipRusiecki/ProjectsToShow/tree/main/CubeTowerJUmp',
        image: null,
      },
      {
        id: 'tank-game',
        title: 'Tank Game',
        description:
          'A C++ / SFML tank combat game with player and AI-controlled tanks, projectile pooling, oriented bounding-box collision, YAML-driven level loading, HUD, and win/lose game states. Built as a Visual Studio SFML project with Thor and yaml-cpp.',
        tags: ['C++', 'SFML', 'Game Dev', 'AI', 'Level Loading', '2D'],
        link: 'https://github.com/FilipRusiecki/ProjectsToShow/tree/main/TankGame',
        image: null,
      },
      {
        id: 'zombie-shooter',
        title: 'Zombie Shooter',
        description:
          'A C++ / SFML top-down zombie survival shooter with round-based waves, grid pathfinding AI, combat, pickups, menus, and character customization. Built with a structured OOP design covering player, zombies, bullets, collision, consumables, and UI screens.',
        tags: ['C++', 'SFML', 'Game Dev', 'AI / Pathfinding', '2D'],
        link: 'https://github.com/FilipRusiecki/ProjectsToShow/tree/main/Zombie%20Game',
        image: null,
      },
    ],
  },
  {
    id: 'skins-maps',
    title: 'Skins / Maps',
    description: 'Counter-Strike Workshop weapon finishes and custom maps.',
    projects: [
      {
        id: 'cs-skin-p250-watcher',
        title: 'P250 | The Watcher',
        description:
          'A Counter-Strike 2 Workshop weapon finish in The Watcher series — engraved detailing with a dark, ominous theme. Self-taught CS2 skin art; about 8 favorites and ~600 Workshop views.',
        tags: ['CS2', 'Weapon Skin', 'Steam Workshop', 'P250', '8 Fav'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3225420810',
        image: null,
      },
      {
        id: 'cs-skin-m4a4-watcher-purple',
        title: 'M4A4 | The Watcher (Purple)',
        description:
          'Purple colourway of The Watcher M4A4 finish — engraved detailing pitched as mysterious or “devil’s work.” Self-taught CS2 skin art; about 10 favorites and ~600 Workshop views.',
        tags: ['CS2', 'Weapon Skin', 'Steam Workshop', 'M4A4', '10 Fav'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3223735520',
        image: null,
      },
      {
        id: 'cs-skin-m4a4-watcher-aristocracy',
        title: 'M4A4 | The Watcher (Aristocracy)',
        description:
          'Aristocracy colourway of The Watcher M4A4 finish — engraved detailing with a refined colour scheme. Self-taught CS2 skin art; about 11 favorites and ~650 Workshop views.',
        tags: ['CS2', 'Weapon Skin', 'Steam Workshop', 'M4A4', '11 Fav'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3223735173',
        image: null,
      },
      {
        id: 'cs-skin-m4a4-watcher-gold-black',
        title: 'M4A4 | The Watcher (Gold Black)',
        description:
          'Gold and black colourway of The Watcher M4A4 finish — engraved detailing with a high-contrast look. Self-taught CS2 skin art; about 6 favorites and ~200 Workshop views.',
        tags: ['CS2', 'Weapon Skin', 'Steam Workshop', 'M4A4', '6 Fav'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3223734762',
        image: null,
      },
      {
        id: 'cs-skin-m4a4-watcher-green-white',
        title: 'M4A4 | The Watcher (Green White)',
        description:
          'Green and white colourway of The Watcher M4A4 finish — engraved detailing across alternate schemes. Self-taught CS2 skin art; about 12 favorites and ~430 Workshop views.',
        tags: ['CS2', 'Weapon Skin', 'Steam Workshop', 'M4A4', '12 Fav'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3223734266',
        image: null,
      },
      {
        id: 'cs-skin-m4a4-watcher-green-black',
        title: 'M4A4 | The Watcher (Green Black)',
        description:
          'Green and black colourway of The Watcher M4A4 finish — engraved detailing with a sharp contrast palette. Self-taught CS2 skin art; about 6 favorites and ~110 Workshop views.',
        tags: ['CS2', 'Weapon Skin', 'Steam Workshop', 'M4A4', '6 Fav'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3223733526',
        image: null,
      },
      {
        id: 'cs-skin-aug-midnight-mantle',
        title: 'AUG | Midnight Mantle',
        description:
          'A Counter-Strike 2 Workshop AUG finish — a kitty-themed midnight skin. Self-taught CS2 weapon art with about 26 favorites and ~980 Workshop views.',
        tags: ['CS2', 'Weapon Skin', 'Steam Workshop', 'AUG', '26 Fav'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3204406599',
        image: null,
      },
      {
        id: 'cs-skin-famas-pearl-princess',
        title: 'FAMAS | Pearl Princess',
        description:
          'A Counter-Strike 2 Workshop FAMAS finish — pearly pastel metal plated onto a white base (“Save The Princess”). Self-taught CS2 weapon skin design submitted to the Steam Workshop.',
        tags: ['CS2', 'Weapon Skin', 'Steam Workshop', 'FAMAS'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3211563073',
        image: null,
      },
      {
        id: 'cs-hide-seek-frugo',
        title: 'Hide and Seek Frugo',
        description:
          'A Counter-Strike 2 Hide and Seek Workshop map exploring CS2 mapping tools — hiding spots, teleports, and no fall damage. Self-taught CS2 level design with about 20.4K Workshop subscribers.',
        tags: ['CS2', 'Level Design', 'Steam Workshop', 'Hide and Seek', '20.4K Subs'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3169731504',
        image: null,
      },
      {
        id: 'cs-zombie-hill',
        title: 'Zombie Hill Gamemode',
        description:
          'A Counter-Strike 2 Workshop map/gamemode where you fight up a hill against zombie terrorists, buying weapons to survive longer. Self-taught CS2 level design with about 35.9K Workshop subscribers.',
        tags: ['CS2', 'Level Design', 'Steam Workshop', 'Zombie', '35.9K Subs'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3171183590',
        image: null,
      },
      {
        id: 'cs-christmas-chaos',
        title: 'Christmas Chaos [Hide and Seek]',
        description:
          'A festive Counter-Strike Hide and Seek Workshop map with 76+ hiding spots, teleports, custom models, snow, snowballs, and a flying sleigh. Self-taught level design with about 9.5K Workshop subscribers.',
        tags: ['CS:GO', 'Level Design', 'Steam Workshop', 'Hide and Seek', '9.5K Subs'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2303607674',
        image: null,
      },
      {
        id: 'cs-anime-city',
        title: 'Anime City [Hide and Seek]',
        description:
          'A large Counter-Strike Hide and Seek Workshop map themed around anime — hiding spots, teleports, pink trees, moving anime cars, skyscrapers, and poster art. Self-taught level design with about 7.4K Workshop subscribers.',
        tags: ['CS:GO', 'Level Design', 'Steam Workshop', 'Hide and Seek', '7.4K Subs'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2258736328',
        image: null,
      },
      {
        id: 'cs-inthewoods',
        title: 'InTheWoods [HideAndSeek]',
        description:
          'A Counter-Strike Hide and Seek Workshop map with 60+ hiding spots, teleports, a secret admin room, a moving helicopter, fog, and nighttime lighting. Self-taught level design — about 4.2K Workshop subscribers.',
        tags: ['CS:GO', 'Level Design', 'Steam Workshop', 'Hide and Seek', '4.2K Subs'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2206692050',
        image: null,
      },
    ],
  },
]

const ProjectCard = ({ project, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
    className="group border-2 border-game-accent/25 rounded-lg overflow-hidden bg-game-dark hover:border-game-accent/60 transition-colors"
  >
    {project.image && (
      <div className="aspect-video overflow-hidden border-b border-game-accent/20 bg-game-dark">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
        />
      </div>
    )}
    <div className="p-6">
      <h3 className="text-xl font-bold text-game-light mb-2">{project.title}</h3>
      {project.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold px-2.5 py-1 rounded border border-game-accent/30 text-game-accent"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <p className="text-game-light/75 leading-relaxed mb-4">{project.description}</p>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-game-accent font-semibold hover:text-game-accent/80 transition-colors"
        >
          View project →
        </a>
      )}
    </div>
  </motion.article>
)

const PortfolioPage = () => {
  return (
    <>
      <Metadata
        title="Portfolio - Filip Rusiecki"
        description="Portfolio of Filip Rusiecki — founder, developer, and creator behind Filip Rusiecki Video Games."
      />
      <div className="dark bg-game-dark min-h-screen">
        <Navigation />

        {/* Intro */}
        <section className="relative border-b border-game-accent/20">
          <div className="absolute inset-0 bg-gradient-to-b from-game-accent/5 to-transparent pointer-events-none" />
          <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-game-accent font-semibold tracking-wide uppercase text-sm mb-3">
                Portfolio
              </p>
              <h1 className="text-4xl md:text-6xl font-bold text-game-light mb-4">
                Filip Rusiecki
              </h1>
              <p className="text-xl md:text-2xl text-game-accent/90 mb-6">
                Founder / Developer
              </p>
              <p className="text-game-light/75 text-lg leading-relaxed max-w-2xl mb-8">
                Building games and digital experiences with a focus on co-op play,
                creative systems, and clear craft. Work is grouped by programs,
                games, and Counter-Strike skins & maps.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  to={routes.about()}
                  className="inline-flex items-center border-2 border-game-accent/40 text-game-light px-5 py-2.5 rounded-lg font-semibold hover:border-game-accent hover:text-game-accent transition-colors"
                >
                  ← Back to About
                </Link>
                <a
                  href="https://store.steampowered.com/app/4152100/Play_With_Friends/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-game-accent text-game-dark px-5 py-2.5 rounded-lg font-bold hover:bg-game-accent/90 transition-colors"
                >
                  Play With Friends on Steam
                </a>
              </div>
              <nav className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <a
                    key={category.id}
                    href={`#${category.id}`}
                    className="text-sm font-semibold px-3 py-1.5 rounded border border-game-accent/30 text-game-light/80 hover:border-game-accent hover:text-game-accent transition-colors"
                  >
                    {category.title}
                  </a>
                ))}
              </nav>
            </motion.div>
          </div>
        </section>

        {/* Categories */}
        {categories.map((category) => (
          <section
            key={category.id}
            id={category.id}
            className="py-16 md:py-20 border-b border-game-accent/15 scroll-mt-24"
          >
            <div className="container mx-auto px-4 max-w-5xl">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="mb-10"
              >
                <h2 className="text-3xl md:text-4xl font-bold text-game-light mb-3">
                  {category.title}
                </h2>
                <p className="text-game-light/60 text-lg max-w-2xl">
                  {category.description}
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {category.projects.map((project, index) => (
                  <ProjectCard
                    key={project.id || index}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Focus areas */}
        <section className="py-16 border-t border-game-accent/20">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-game-light mb-8">Focus</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Game Development',
                    text: 'Systems, gameplay, and shipping player-facing experiences.',
                  },
                  {
                    title: 'Creative Direction',
                    text: 'Shaping tone, world, and the feel of co-op chaos done right.',
                  },
                  {
                    title: 'Building in Public',
                    text: 'Transparent updates, community feedback, and iterative craft.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="border border-game-accent/25 rounded-lg p-5 hover:border-game-accent/50 transition-colors"
                  >
                    <h3 className="text-game-accent font-bold mb-2">{item.title}</h3>
                    <p className="text-game-light/70 text-sm leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

export default PortfolioPage
