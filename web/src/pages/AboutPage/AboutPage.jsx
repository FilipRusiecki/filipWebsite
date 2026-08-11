import { Metadata } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import { motion } from 'framer-motion'

import Navigation from 'src/components/Navigation/Navigation'
import Footer from 'src/components/Footer/Footer'
import SectionAtmosphere from 'src/components/SectionAtmosphere/SectionAtmosphere'

const teamMembers = [
  {
    name: 'Filip',
    alias: 'FIFI',
    role: 'Founder / Developer',
    image: '/images/developers/Founder Developer/pp.jpg',
    description:
      'Filip is the founder and lead developer behind the project. He has been passionate about video games since a young age and sees game development as a way to escape reality, immerse himself in creative worlds, and express himself. While he deeply enjoys making games, he also loves playing them, drawing inspiration from the experiences they create.',
    flag: null,
    portfolio: true,
  },
  {
    name: 'Dawid',
    alias: 'Pathfinder',
    role: 'Developer',
    image: '/images/developers/Developer/boss.jpg',
    description:
      "I like gaming and other forms of media. Love playing and watching football. I am passionate about games and writing. I hope I can combine those two for a job I'll love doing. In my free time I spend time doing small passion projects of mine such as small games, some writing, designing skins for Counter Strike and beyond that just spending time with my friends and family. 🙂",
    flag: '🇵🇱',
  },
  {
    name: 'Ben',
    alias: 'Bennie',
    role: '3D Model Artist',
    image: '/images/developers/3d modeling artist/content.png',
    description:
      'I love creating digitaly, both 2D and 3D. I literaly cannot stop thinking about games and cars, all i want is to play /create / own cool games and cars. I want to constantly keep learning to get better at what i do and hopefully it shows in my work. The only time you fail, is when you give up',
    flag: null,
  },
  {
    name: 'Kotrina',
    alias: 'kotrina.art',
    role: 'Digital Artist',
    image: '/images/developers/Digital Artist/ProfilePic.JPG',
    description:
      'I am an illustrator based in Carlow, Ireland. I work digitally & traditionally. My current work is focused on collaging and working with traditional mediums to create patterned, layered artworks. My digital work provides variety, I enjoy adding elements created traditionally within the digital illustrations.\n\nMy personal work consists of exploring themes surrounding motherhood, utilising my own experiences as well as others to create deeply meaningful works while also producing humour into the daily life of parenting.\n\nMy current passion is providing MAMAzine workshops to postpartum mothers to invite reflection of the first year of motherhood within the zine format. Providing community, creativity and fun within the motherhood experience.',
    flag: null,
    credits: {
      instagram: 'https://www.instagram.com/kotrina.art/',
      tiktok: 'https://www.tiktok.com/@kotrina.art',
      handle: '@kotrina.art',
    },
  },
  {
    name: 'MACRUA',
    alias: null,
    role: 'Music Artist',
    image: '/images/developers/Music Artists/macrua.PNG',
    description:
      "MACRUA are a Carlow-based band redefining their sound through collaboration, storytelling, and genre fluidity. Originally founded in 2023 by Aaron Smith as a solo project, MACRUA has since evolved into a fully realised band co-led by Smith (vocals/guitar) and Elliott Cass (keys), alongside Lillymae O'Brien, Marko Majerník, and Niamh O'Loughlin.\n\nDrawing inspiration from artists such as Fleetwood Mac, The Cranberries, Toto, and Keane, MACRUA blend nostalgic textures with a contemporary edge. Their music is shaped by the contrast and chemistry between Smith\'s background in musical theatre and Cass\'s grounding in jazz, fusion, and funk—resulting in a dynamic, genre-blurring sound driven by strong narrative songwriting.\n\nFollowing the release of Smith\'s earlier EP Initiation, the project underwent a significant creative shift in late 2025, marking a move toward shared artistic direction. This transition has opened new musical possibilities, allowing the band to expand both sonically and conceptually beyond its original framework while maintaining the rocky fun that can be seen in this EP.\n\nKnown for their energetic and engaging live performances, MACRUA create an atmosphere that invites audiences to connect—whether through introspective storytelling or infectious, uplifting moments.\n\nThe band are currently developing and recording a new EP set for release in 2026, capturing this evolved sound and collaborative identity. With a clear artistic direction and a commitment to pushing their creative boundaries, MACRUA are emerging as an exciting new voice within the Irish music scene.",
    flag: null,
    credits: {
      linktree: 'https://linktr.ee/macrua_official',
      handle: '@macrua_official',
    },
  },
]

const AboutPage = () => {
  return (
    <>
      <Metadata
        title="About the Team - Filip Rusiecki Video Games"
        description="Meet the team behind Play With Friends and Filip Rusiecki Video Games"
      />
      <div className="dark bg-game-dark min-h-screen text-game-light">
        <Navigation />

        {/* Hero */}
        <section className="relative overflow-hidden min-h-[55vh] flex items-center border-b border-game-accent/15">
          <SectionAtmosphere intensity="strong" pulse grid />
          <div className="relative container mx-auto px-4 py-20 md:py-28 text-center">
            <motion.img
              src="/images/logos/FRVGLOGOtransperant.png"
              alt="Filip Rusiecki Video Games"
              className="h-24 sm:h-32 md:h-40 w-auto object-contain mx-auto mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            />
            <motion.p
              className="text-game-accent font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm mb-4"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Filip Rusiecki Video Games
            </motion.p>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-game-light mb-5"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              About the Team
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-game-light/75 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
            >
              The people building Play With Friends — developers, artists, and music.
            </motion.p>
          </div>
        </section>

        {/* Team */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <SectionAtmosphere intensity="soft" />
          <div className="relative container mx-auto px-4 max-w-4xl">
            <div className="space-y-0 divide-y divide-game-accent/20">
              {teamMembers.map((member, index) => (
                <motion.article
                  key={member.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.16) }}
                  className="grid grid-cols-1 sm:grid-cols-[148px_minmax(0,1fr)] gap-6 sm:gap-8 py-10 md:py-12 first:pt-0 last:pb-0"
                >
                  <div className="relative mx-auto sm:mx-0 shrink-0 w-[132px] h-[132px] sm:w-[148px] sm:h-[148px]">
                    <div
                      className="absolute -inset-1 rounded-full bg-game-accent/20 blur-md"
                      aria-hidden="true"
                    />
                    <img
                      src={member.image}
                      alt={member.name}
                      className="relative w-full h-full rounded-full object-cover border-2 border-game-accent/45"
                    />
                  </div>

                  <div className="text-center sm:text-left min-w-0">
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
                      <h2 className="text-2xl md:text-3xl font-bold text-game-light">
                        {member.name}
                      </h2>
                      {member.flag && (
                        <span className="text-xl" title="Poland" aria-label="Polish flag">
                          {member.flag}
                        </span>
                      )}
                    </div>
                    {member.alias && (
                      <p className="text-game-light/45 text-sm mb-1">({member.alias})</p>
                    )}
                    <p className="text-game-accent font-semibold text-sm tracking-wide mb-4">
                      {member.role}
                    </p>

                    {(member.portfolio || member.credits) && (
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-5">
                        {member.portfolio && (
                          <Link
                            to={routes.portfolio()}
                            className="inline-flex items-center bg-game-accent text-game-dark px-4 py-2 rounded-lg text-sm font-bold hover:brightness-110 transition-all duration-300 shadow-[0_0_20px_-6px_rgba(209,173,74,0.55)]"
                          >
                            View Portfolio
                          </Link>
                        )}
                        {member.credits?.instagram && (
                          <a
                            href={member.credits.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-game-accent hover:underline"
                          >
                            Instagram
                          </a>
                        )}
                        {member.credits?.tiktok && (
                          <a
                            href={member.credits.tiktok}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-game-accent hover:underline"
                          >
                            TikTok
                          </a>
                        )}
                        {member.credits?.linktree && (
                          <a
                            href={member.credits.linktree}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-game-accent hover:underline"
                          >
                            Linktree
                          </a>
                        )}
                        {member.credits?.handle && (
                          <span className="text-xs text-game-light/40">
                            {member.credits.handle}
                          </span>
                        )}
                      </div>
                    )}

                    <p className="text-game-light/75 leading-relaxed whitespace-pre-wrap text-base md:text-[1.05rem]">
                      {member.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        {/* Our story */}
        <section className="relative overflow-hidden py-16 md:py-24 border-t border-game-accent/15">
          <SectionAtmosphere intensity="mid" grid />
          <div className="relative container mx-auto px-4 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.65 }}
            >
              <p className="text-game-accent font-semibold tracking-[0.18em] uppercase text-xs mb-3">
                Studio
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-game-light mb-6">
                Our Story
              </h2>
              <div className="space-y-5 text-game-light/75 text-lg leading-relaxed border-l-2 border-game-accent/40 pl-6 md:pl-8">
                <p>
                  Play With Friends is being developed by a passionate team of developers and
                  artists, alongside contributors, while balancing full-time jobs. We&apos;re
                  committed to creating a game that brings friends together for chaotic, fun
                  adventures.
                </p>
                <p>
                  Community feedback shapes our development, and we&apos;re transparent about our
                  progress. Early Access is planned for early 2026, and we&apos;re working hard to
                  ensure the best possible experience for our players.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

export default AboutPage
