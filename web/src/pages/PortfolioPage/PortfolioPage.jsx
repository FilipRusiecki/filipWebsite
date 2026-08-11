import { Metadata } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import { motion } from 'framer-motion'

import Navigation from 'src/components/Navigation/Navigation'
import Footer from 'src/components/Footer/Footer'

const experience = [
  {
    role: 'Software Engineer Intern',
    org: 'UNUM',
    points: [
      'Worked on the PureJava team delivering sprint tasks in an Agile environment.',
      'Contributed to UI changes, translation testing, and the Take5 behavioural app intern project.',
      'Shipped an extension to an existing product end-to-end as an intern team challenge.',
    ],
  },
  {
    role: 'Main Mixologist',
    org: "Barrack's Bar",
    points: [
      'Create and develop new cocktail recipes for the bar menu.',
      'Mix drinks to a high standard and lead cocktail service on busy nights.',
      'Train staff on recipes, presentation, and consistent quality behind the bar.',
    ],
  },
  {
    role: 'Digital Marketing (Course Placement)',
    org: 'Busimind',
    points: [
      'Video production and promotional ads for local businesses.',
      'Photo editing, posters, and website promotion support.',
    ],
  },
]

const education = [
  {
    title: 'BSc (Hons) Computer Games Development — QQI Level 8',
    org: 'South East Technological University (SETU)',
    detail:
      'Formerly Institute of Technology Carlow. Modules across AI for games, gameplay programming, 3D graphics, web & databases, online gaming technologies, and final-year project work.',
  },
  {
    title: 'Games & Apps Development — QQI Level 5',
    org: 'Institute of Further Education & Training',
    detail: 'Graduated with Honours. Class president.',
  },
]

const skillGroups = [
  {
    title: 'Engines & Worlds',
    skills: [
      'Unity',
      'Unreal Engine',
      'VR Systems',
      'Multiplayer',
      'Hammer World Editor',
      'Level Design',
      'CS:GO / CS2 Mapping',
      'Minecraft Forge',
    ],
  },
  {
    title: 'Programming',
    skills: [
      'C++',
      'C#',
      'JavaScript',
      'Python',
      'Java',
      'Lua',
      'Flask',
      'RedwoodJS',
      'HTML / CSS',
      'YAML',
      'SFML',
      'OpenGL',
      'Shaders',
    ],
  },
  {
    title: 'Game Systems & AI',
    skills: [
      'Game AI',
      'Pathfinding',
      'Steering Behaviours',
      'Fuzzy Logic',
      'Flow Fields / Heat Maps',
      'Collision Systems',
      'Object Pooling',
      'Roguelike Systems',
      'Top-Down Shooters',
      'Endless Runners',
    ],
  },
  {
    title: '3D & Art',
    skills: [
      '3D Modelling',
      'Blender',
      'BlockBench',
      'UV / Texturing',
      'Weapon Skins',
      'Tile sets & Sprites',
      'Adobe Photoshop',
      'GIMP',
      'Paint.NET',
    ],
  },
  {
    title: 'Audio & Video',
    skills: [
      'Sound FX',
      'FL Studio',
      'Audacity',
      'Sony Vegas',
      'After Effects',
      'Premiere Pro',
    ],
  },
  {
    title: 'Tools & Pipeline',
    skills: [
      'Git / GitHub',
      'Visual Studio',
      'VS Code',
      'Jira',
      'Agile',
      'MCreator',
      'Steam Workshop',
      'Steam Publishing',
      'CurseForge',
      'Game Jams',
    ],
  },
]

const mapReachTotal = '77K+'

const categories = [
  {
    id: 'programs-algorithms',
    title: 'Systems & Tools',
    description:
      'Labs, algorithms, and software — AI, pathfinding, web apps, and systems work. Room to grow with more tools and experiments.',
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
        image: '/images/portfolio/FlowAlgorithmWithHeatmap.png',
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
        image: '/images/portfolio/SimpleAIBehaviours.png',
      },
      {
        id: 'tank-game',
        title: 'Tank Game',
        description:
          'A C++ / SFML tank combat game with player and AI-controlled tanks, projectile pooling, oriented bounding-box collision, YAML-driven level loading, HUD, and win/lose game states. Built as a Visual Studio SFML project with Thor and yaml-cpp.',
        tags: ['C++', 'SFML', 'Game Dev', 'AI', 'Level Loading', '2D'],
        link: 'https://github.com/FilipRusiecki/ProjectsToShow/tree/main/TankGame',
        image: '/images/portfolio/TankGame.png',
      },
    ],
  },
  {
    id: 'games',
    title: 'Games & Experiences',
    description:
      'Shipped titles, client websites, jam games, VR, mods, and prototypes — work across engines and the web.',
    projects: [
      {
        id: 'winter-wonder-vr',
        title: 'Winter Wonder (VR Multiplayer)',
        description:
          'Final-year Unity VR multiplayer survival project — explore a large winter environment, scavenge plane parts, survive cold and threats, and fly a buildable plane. Features VR interaction, day/night cycle, multiplayer, and shelter/base play. Fourth-year Computer Games Development thesis project.',
        tags: ['Unity', 'VR', 'Multiplayer', 'C#', 'Final Year Project'],
        link: 'https://github.com/FilipRusiecki/FinalYearProject',
        video: 'https://youtu.be/jDkfWm-pjDg',
        image: '/images/portfolio/WinterWonder.png',
      },
      {
        id: 'kotrina-art-website',
        title: 'kotrina.art',
        description:
          'Custom artist website for Kotrina Cioladis — portfolio gallery, workshops, Art Club, and about/contact. Built with RedwoodJS, React, and Tailwind; designed around her brand (typography, parchment UI, coral accents) and shipped to Vercel at kotrina.art.',
        tags: ['RedwoodJS', 'React', 'Tailwind', 'Client Site', 'Vercel'],
        link: 'https://kotrina.art',
        image: '/images/portfolio/KotrinaArt.jpg',
      },
      {
        id: 'frvg-website',
        title: 'FRVG / Play With Friends Site',
        description:
          'Full-stack marketing and support platform for Filip Rusiecki Video Games — updates feed, FAQ, cosmetics, achievements, ticket support, and dbAuth admin. Built with RedwoodJS, React, GraphQL, Prisma/PostgreSQL, and Tailwind; deployed on Vercel at frvg.net.',
        tags: ['RedwoodJS', 'React', 'GraphQL', 'Prisma', 'Vercel'],
        link: 'https://www.frvg.net',
        image: '/images/logos/FRVGLOGOtransperant.png',
        imageFit: 'contain',
      },
      {
        id: 'cube-slayer',
        title: 'Cube Slayer',
        description:
          'A commercial Steam release by FRVG — a fast-paced top-down 2D endless survival shooter. Fight zombie waves, pick random weapons, level up for upgrades, unlock maps, and buy permanent buffs between runs. Built and shipped to learn the full Steam publishing pipeline (released Jun 14, 2025).',
        tags: ['Steam', 'Game Dev', 'Roguelike', 'Top-Down Shooter', 'Published'],
        link: 'https://store.steampowered.com/app/3775870/Cube_Slayer/',
        image: '/images/portfolio/CubeSlayer.png',
        imageFit: 'contain',
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
        image: '/images/portfolio/AnyWhereYouGoMinecraftMod.png',
      },
      {
        id: 'ggj-team-cermit',
        title: 'Cermit (Global Game Jam)',
        description:
          'A Unity game jam project with Team Cermit (“C stands for Cracked”) — built under Global Game Jam time pressure with C#, custom shaders, and a full Unity project pipeline. A collaborative prototype focused on shipping a playable experience in a short jam window.',
        tags: ['Unity', 'C#', 'Game Jam', 'Shaders', 'Team Project'],
        link: 'https://github.com/FilipRusiecki/GGJ-Team-Cermit',
        image: '/images/portfolio/Kermit.png',
      },
      {
        id: 'cube-field',
        title: 'Cube Field',
        description:
          'A C++ game built with SFML and OpenGL (GLEW) where the world is made of cubes. Explores 3D math (vectors, matrices), cube rendering, game objects, and easing — a graphics-focused project blending SFML with OpenGL.',
        tags: ['C++', 'SFML', 'OpenGL', '3D Graphics', 'Game Dev'],
        link: 'https://github.com/FilipRusiecki/ProjectsToShow/tree/main/CubeField',
        image: '/images/portfolio/CubeField.png',
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
        id: 'zombie-shooter',
        title: 'Zombie Shooter',
        description:
          'A C++ / SFML top-down zombie survival shooter with round-based waves and grid pathfinding so zombies chase the player around the map. Also includes combat, pickups, menus, and character customization — built with a structured OOP design covering player, zombies, bullets, collision, consumables, and UI.',
        tags: ['C++', 'SFML', 'Game Dev', 'Pathfinding', 'AI', '2D'],
        link: 'https://github.com/FilipRusiecki/ProjectsToShow/tree/main/Zombie%20Game',
        image: '/images/portfolio/ZombieShooter.jpg',
      },
    ],
  },
  {
    id: 'skins-maps',
    title: 'Workshop & Level Design',
    description:
      'Steam Workshop maps, weapon finishes, and player-facing content with real community reach. Easy home for more published levels and cosmetics.',
    highlight: {
      value: mapReachTotal,
      label: 'combined Workshop subscribers across published maps',
    },
    projects: [
      {
        id: 'cs-zombie-hill',
        title: 'Zombie Hill Gamemode',
        description:
          'A Counter-Strike 2 Workshop map/gamemode where you fight up a hill against zombie terrorists, buying weapons to survive longer.',
        tags: ['CS2', 'Level Design', 'Steam Workshop', 'Zombie'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3171183590',
        image: '/images/portfolio/Zombie%20Hill%20Gamemode.gif',
        stat: { value: '35.9K', label: 'Subscribers' },
      },
      {
        id: 'cs-hide-seek-frugo',
        title: 'Hide and Seek Frugo',
        description:
          'A Counter-Strike 2 Hide and Seek Workshop map exploring CS2 mapping tools — hiding spots, teleports, and no fall damage.',
        tags: ['CS2', 'Level Design', 'Steam Workshop', 'Hide and Seek'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3169731504',
        image: '/images/portfolio/Hide%20and%20Seek%20Frugo.jfif',
        stat: { value: '20.4K', label: 'Subscribers' },
      },
      {
        id: 'cs-christmas-chaos',
        title: 'Christmas Chaos [Hide and Seek]',
        description:
          'A festive Counter-Strike Hide and Seek Workshop map with 76+ hiding spots, teleports, custom models, snow, snowballs, and a flying sleigh.',
        tags: ['CS:GO', 'Level Design', 'Steam Workshop', 'Hide and Seek'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2303607674',
        image: '/images/portfolio/Christmas%20Chaos%20%5BHide%20and%20Seek%5D.jfif',
        stat: { value: '9.5K', label: 'Subscribers' },
      },
      {
        id: 'cs-anime-city',
        title: 'Anime City [Hide and Seek]',
        description:
          'A large Counter-Strike Hide and Seek Workshop map themed around anime — hiding spots, teleports, pink trees, moving anime cars, skyscrapers, and poster art.',
        tags: ['CS:GO', 'Level Design', 'Steam Workshop', 'Hide and Seek'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2258736328',
        image: '/images/portfolio/Anime%20City%20%5BHide%20and%20Seek%5D.jfif',
        stat: { value: '7.4K', label: 'Subscribers' },
      },
      {
        id: 'cs-inthewoods',
        title: 'InTheWoods [HideAndSeek]',
        description:
          'A Counter-Strike Hide and Seek Workshop map with 60+ hiding spots, teleports, a secret admin room, a moving helicopter, fog, and nighttime lighting.',
        tags: ['CS:GO', 'Level Design', 'Steam Workshop', 'Hide and Seek'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=2206692050',
        image: '/images/portfolio/InTheWoods.png',
        stat: { value: '4.2K', label: 'Subscribers' },
      },
      {
        id: 'cs-skin-p250-watcher',
        title: 'P250 | The Watcher',
        description:
          'A Counter-Strike 2 Workshop weapon finish in The Watcher series — engraved detailing with a dark, ominous theme. Self-taught CS2 skin art; about 8 favorites and ~600 Workshop views.',
        tags: ['CS2', 'Weapon Skin', 'Steam Workshop', 'P250'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3225420810',
        image: '/images/portfolio/P250%20The%20Watcher.jfif',
      },
      {
        id: 'cs-skin-m4a4-watcher-purple',
        title: 'M4A4 | The Watcher (Purple)',
        description:
          'Purple colourway of The Watcher M4A4 finish — engraved detailing pitched as mysterious or “devil’s work.” Self-taught CS2 skin art; about 10 favorites and ~600 Workshop views.',
        tags: ['CS2', 'Weapon Skin', 'Steam Workshop', 'M4A4'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3223735520',
        image: '/images/portfolio/M4A4%20The%20Watcher%20(Purple).png',
      },
      {
        id: 'cs-skin-m4a4-watcher-aristocracy',
        title: 'M4A4 | The Watcher (Aristocracy)',
        description:
          'Aristocracy colourway of The Watcher M4A4 finish — engraved detailing with a refined colour scheme. Self-taught CS2 skin art; about 11 favorites and ~650 Workshop views.',
        tags: ['CS2', 'Weapon Skin', 'Steam Workshop', 'M4A4'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3223735173',
        image: '/images/portfolio/M4A4%20The%20Watcher%20(Aristocracy).png',
      },
      {
        id: 'cs-skin-m4a4-watcher-gold-black',
        title: 'M4A4 | The Watcher (Gold Black)',
        description:
          'Gold and black colourway of The Watcher M4A4 finish — engraved detailing with a high-contrast look. Self-taught CS2 skin art; about 6 favorites and ~200 Workshop views.',
        tags: ['CS2', 'Weapon Skin', 'Steam Workshop', 'M4A4'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3223734762',
        image: '/images/portfolio/M4A4%20The%20Watcher%20(Gold%20Black).png',
      },
      {
        id: 'cs-skin-m4a4-watcher-green-white',
        title: 'M4A4 | The Watcher (Green White)',
        description:
          'Green and white colourway of The Watcher M4A4 finish — engraved detailing across alternate schemes. Self-taught CS2 skin art; about 12 favorites and ~430 Workshop views.',
        tags: ['CS2', 'Weapon Skin', 'Steam Workshop', 'M4A4'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3223734266',
        image: '/images/portfolio/M4A4%20The%20Watcher%20(Green%20White).png',
      },
      {
        id: 'cs-skin-m4a4-watcher-green-black',
        title: 'M4A4 | The Watcher (Green Black)',
        description:
          'Green and black colourway of The Watcher M4A4 finish — engraved detailing with a sharp contrast palette. Self-taught CS2 skin art; about 6 favorites and ~110 Workshop views.',
        tags: ['CS2', 'Weapon Skin', 'Steam Workshop', 'M4A4'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3223733526',
        image: '/images/portfolio/M4A4%20The%20Watcher%20(Green%20Black).png',
      },
      {
        id: 'cs-skin-aug-midnight-mantle',
        title: 'AUG | Midnight Mantle',
        description:
          'A Counter-Strike 2 Workshop AUG finish — a kitty-themed midnight skin. Self-taught CS2 weapon art with about 26 favorites and ~980 Workshop views.',
        tags: ['CS2', 'Weapon Skin', 'Steam Workshop', 'AUG'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3204406599',
        image: '/images/portfolio/AUG%20Midnight%20Mantle.jfif',
      },
      {
        id: 'cs-skin-famas-pearl-princess',
        title: 'FAMAS | Pearl Princess',
        description:
          'A Counter-Strike 2 Workshop FAMAS finish — pearly pastel metal plated onto a white base (“Save The Princess”). Self-taught CS2 weapon skin design submitted to the Steam Workshop.',
        tags: ['CS2', 'Weapon Skin', 'Steam Workshop', 'FAMAS'],
        link: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3211563073',
        image: '/images/portfolio/FAMAS%20%20Pearl%20Princess.jfif',
      },
    ],
  },
]

const featuredIds = ['cs-zombie-hill', 'cube-slayer', 'winter-wonder-vr']

const allProjectsFlat = categories.flatMap((category) =>
  category.projects.map((project) => ({
    ...project,
    categoryTitle: category.title,
  }))
)

const featuredProjects = featuredIds
  .map((id) => allProjectsFlat.find((project) => project.id === id))
  .filter(Boolean)

const categoryOrder = ['skins-maps', 'games', 'programs-algorithms']

const orderedCategories = categoryOrder
  .map((id) => categories.find((category) => category.id === id))
  .filter(Boolean)
  .map((category) => ({
    ...category,
    projects: category.projects.filter(
      (project) => !featuredIds.includes(project.id)
    ),
  }))

const impactStats = [
  { value: mapReachTotal, label: 'Workshop subscribers' },
  { value: '1', label: 'Steam game shipped' },
  { value: 'VR', label: 'Multiplayer thesis' },
]

const navSections = [
  { id: 'featured', title: 'Featured' },
  ...orderedCategories.map((c) => ({ id: c.id, title: c.title })),
  { id: 'skills', title: 'Skills' },
  { id: 'experience', title: 'Experience' },
]

const shellClass = 'container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl'
const projectGridClass = 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8'

const projectInitials = (title) => {
  const words = title.replace(/[|[\]]/g, ' ').split(/\s+/).filter(Boolean)
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()
  return (words[0][0] + words[1][0]).toUpperCase()
}

const ProjectCard = ({ project, index, categoryTitle }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.3) }}
    className="group flex flex-col border-2 border-game-accent/25 rounded-lg overflow-hidden bg-game-dark hover:border-game-accent/60 transition-colors"
  >
    <div className="aspect-video overflow-hidden border-b border-game-accent/20 bg-gradient-to-br from-game-accent/15 via-game-dark to-game-dark relative">
      {project.image ? (
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full group-hover:scale-[1.02] transition-transform duration-500 ${
            project.imageFit === 'contain' ? 'object-contain bg-black/50' : 'object-cover'
          }`}
        />
      ) : (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-game-accent/10 blur-2xl" />
          <div className="absolute -bottom-12 -left-8 w-48 h-48 rounded-full bg-game-accent/5 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(135deg,transparent_40%,#fff_50%,transparent_60%)]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full border border-game-accent/35 bg-game-accent/10 text-game-accent text-xl font-bold tracking-wide group-hover:border-game-accent/60 transition-colors">
              {projectInitials(project.title)}
            </div>
            <p className="text-game-light/85 font-semibold text-base leading-snug max-w-[90%]">
              {project.title}
            </p>
            {categoryTitle && (
              <p className="mt-2 text-game-accent/55 text-xs font-semibold uppercase tracking-widest">
                {categoryTitle}
              </p>
            )}
          </div>
        </div>
      )}
      {project.stat && (
        <div className="absolute bottom-3 left-3 right-3 flex justify-start pointer-events-none">
          <div className="bg-game-dark/90 border border-game-accent/50 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg shadow-black/40">
            <p className="text-2xl md:text-3xl font-black text-game-accent leading-none tracking-tight">
              {project.stat.value}
            </p>
            <p className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-game-light/70 mt-0.5">
              {project.stat.label}
            </p>
          </div>
        </div>
      )}
    </div>
    <div className="p-6 flex flex-col flex-1">
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="text-xl font-bold text-game-light group-hover:text-game-accent transition-colors">
          {project.title}
        </h3>
        {project.stat && (
          <span className="shrink-0 text-sm font-black text-game-accent bg-game-accent/10 border border-game-accent/35 px-2.5 py-1 rounded">
            {project.stat.value}
          </span>
        )}
      </div>
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
      <p className="text-game-light/75 leading-relaxed mb-4 flex-1">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-4">
        {project.link && (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-game-accent font-semibold hover:text-game-accent/80 transition-colors"
          >
            View project →
          </a>
        )}
        {project.video && (
          <a
            href={project.video}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-game-light/80 font-semibold hover:text-game-accent transition-colors"
          >
            Watch video →
          </a>
        )}
      </div>
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

        {/* Hero */}
        <section className="relative border-b border-game-accent/20">
          <div className="absolute inset-0 bg-gradient-to-b from-game-accent/5 to-transparent pointer-events-none" />
          <div className={`${shellClass} py-16 md:py-24 relative`}>
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
              <p className="text-game-light/75 text-lg leading-relaxed max-w-3xl mb-8">
                Computer Games Development graduate building games, systems, and
                Workshop content — from a shipped Steam title and VR multiplayer
                thesis work to maps with {mapReachTotal} combined subscribers.
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

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {impactStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="border-2 border-game-accent/35 bg-game-accent/10 rounded-xl px-5 py-4"
                  >
                    <p className="text-3xl md:text-4xl font-black text-game-accent leading-none tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-game-light/70 text-sm font-medium mt-2">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <nav className="flex flex-wrap gap-2">
                {navSections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="text-sm font-semibold px-3 py-1.5 rounded border border-game-accent/30 text-game-light/80 hover:border-game-accent hover:text-game-accent transition-colors"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>
            </motion.div>
          </div>
        </section>

        {/* Featured */}
        <section
          id="featured"
          className="py-16 md:py-20 border-b border-game-accent/15 scroll-mt-24"
        >
          <div className={shellClass}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-game-light mb-3">
                Featured
              </h2>
              <p className="text-game-light/60 text-lg max-w-3xl">
                Highlights that land first — community reach, a shipped Steam
                title, and final-year VR multiplayer work.
              </p>
            </motion.div>

            <div className={projectGridClass}>
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  categoryTitle={project.categoryTitle}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Categories: Maps → Games → Programs */}
        {orderedCategories.map((category) => (
          <section
            key={category.id}
            id={category.id}
            className="py-16 md:py-20 border-b border-game-accent/15 scroll-mt-24"
          >
            <div className={shellClass}>
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
                <p className="text-game-light/60 text-lg max-w-3xl mb-6">
                  {category.description}
                </p>
                {category.highlight && (
                  <div className="inline-flex flex-col sm:flex-row sm:items-end gap-1 sm:gap-4 border-2 border-game-accent/40 bg-game-accent/10 rounded-xl px-5 py-4">
                    <span className="text-4xl md:text-5xl font-black text-game-accent leading-none tracking-tight">
                      {category.highlight.value}
                    </span>
                    <span className="text-game-light/75 text-sm md:text-base font-medium max-w-xs leading-snug pb-1">
                      {category.highlight.label}
                    </span>
                  </div>
                )}
              </motion.div>

              <div className={projectGridClass}>
                {category.projects.map((project, index) => (
                  <ProjectCard
                    key={project.id || index}
                    project={project}
                    index={index}
                    categoryTitle={category.title}
                  />
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Skills */}
        <section
          id="skills"
          className="py-16 md:py-20 border-b border-game-accent/15 scroll-mt-24"
        >
          <div className={shellClass}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-game-light mb-3">
                Skills & Tools
              </h2>
              <p className="text-game-light/60 text-lg max-w-3xl">
                Engines, code, 3D, and production tools I use to ship games and
                Workshop content.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {skillGroups.map((group, index) => (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.05 }}
                  className="border border-game-accent/25 rounded-lg p-5 hover:border-game-accent/50 transition-colors"
                >
                  <h3 className="text-game-accent font-bold mb-3">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="text-xs font-semibold px-2.5 py-1 rounded border border-game-accent/30 text-game-light/85"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience */}
        <section
          id="experience"
          className="py-16 md:py-20 border-b border-game-accent/15 scroll-mt-24"
        >
          <div className={shellClass}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-game-light mb-3">
                Experience
              </h2>
              <p className="text-game-light/60 text-lg max-w-3xl">
                Industry placement, leadership, and education behind the work.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
              {experience.map((job, index) => (
                <motion.div
                  key={job.role}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="border border-game-accent/25 rounded-lg p-5 md:p-6 hover:border-game-accent/50 transition-colors"
                >
                  <div className="mb-3">
                    <h3 className="text-xl font-bold text-game-light">{job.role}</h3>
                  </div>
                  <p className="text-game-accent/80 font-medium mb-3">{job.org}</p>
                  <ul className="space-y-1.5">
                    {job.points.map((point) => (
                      <li
                        key={point}
                        className="text-game-light/70 text-sm leading-relaxed pl-3 border-l border-game-accent/25"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-game-light mb-5">Education</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {education.map((edu) => (
                <div
                  key={edu.title}
                  className="border border-game-accent/25 rounded-lg p-5 hover:border-game-accent/50 transition-colors"
                >
                  <h4 className="text-game-light font-bold mb-1">{edu.title}</h4>
                  <p className="text-game-light/60 text-sm mb-2">{edu.org}</p>
                  <p className="text-game-light/70 text-sm leading-relaxed">
                    {edu.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Focus areas */}
        <section className="py-16 border-t border-game-accent/20">
          <div className={shellClass}>
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
