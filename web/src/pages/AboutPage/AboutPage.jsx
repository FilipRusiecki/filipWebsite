import { Metadata } from '@redwoodjs/web'
import { motion } from 'framer-motion'

import Navigation from 'src/components/Navigation/Navigation'
import Footer from 'src/components/Footer/Footer'

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Filip',
      alias: 'FIFI',
      role: 'Founder / Developer',
      image: '/images/developers/Founder Developer/pp.jpg',
      description:
        'Filip is the founder and lead developer behind the project. He has been passionate about video games since a young age and sees game development as a way to escape reality, immerse himself in creative worlds, and express himself. While he deeply enjoys making games, he also loves playing them, drawing inspiration from the experiences they create.',
      flag: null,
    },
    {
      name: 'Dawid',
      alias: 'Pathfinder',
      role: 'Developer',
      image: '/images/developers/Developer/boss.jpg',
      description:
        'I like gaming and other forms of media. Love playing and watching football. I am passionate about games and writing. I hope I can combine those two for a job I\'ll love doing. In my free time I spend time doing small passion projects of mine such as small games, some writing, designing skins for Counter Strike and beyond that just spending time with my friends and family. 🙂',
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
        'MACRUA are a Carlow-based band redefining their sound through collaboration, storytelling, and genre fluidity. Originally founded in 2023 by Aaron Smith as a solo project, MACRUA has since evolved into a fully realised band co-led by Smith (vocals/guitar) and Elliott Cass (keys), alongside Lillymae O\'Brien, Marko Majerník, and Niamh O\'Loughlin.\n\nDrawing inspiration from artists such as Fleetwood Mac, The Cranberries, Toto, and Keane, MACRUA blend nostalgic textures with a contemporary edge. Their music is shaped by the contrast and chemistry between Smith\'s background in musical theatre and Cass\'s grounding in jazz, fusion, and funk—resulting in a dynamic, genre-blurring sound driven by strong narrative songwriting.\n\nFollowing the release of Smith\'s earlier EP Initiation, the project underwent a significant creative shift in late 2025, marking a move toward shared artistic direction. This transition has opened new musical possibilities, allowing the band to expand both sonically and conceptually beyond its original framework while maintaining the rocky fun that can be seen in this EP.\n\nKnown for their energetic and engaging live performances, MACRUA create an atmosphere that invites audiences to connect—whether through introspective storytelling or infectious, uplifting moments.\n\nThe band are currently developing and recording a new EP set for release in 2026, capturing this evolved sound and collaborative identity. With a clear artistic direction and a commitment to pushing their creative boundaries, MACRUA are emerging as an exciting new voice within the Irish music scene.',
      flag: null,
      credits: {
        linktree: 'https://linktr.ee/macrua_official',
        handle: '@macrua_official',
      },
    },
  ]

  return (
    <>
      <Metadata
        title="About the Team - Filip Rusiecki Video Games"
        description="Meet the team behind Play With Friends and Filip Rusiecki Video Games"
      />
      <div className="dark bg-game-dark min-h-screen">
        <Navigation />
        <div className="py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-game-light">
                About the Team
              </h1>
              <p className="text-xl text-game-light/80 max-w-2xl mx-auto">
                Meet the passionate developers behind Play With Friends
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-6 hover:border-game-accent transition-all duration-300"
                >
                  <div className="text-center mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-48 h-48 rounded-full mx-auto mb-4 object-cover border-4 border-game-accent/30"
                    />
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <h3 className="text-2xl font-bold text-game-light">{member.name}</h3>
                      {member.flag && (
                        <span className="text-2xl" title="Poland" aria-label="Polish flag">
                          {member.flag}
                        </span>
                      )}
                    </div>
                    {member.alias && (
                      <p className="text-game-light/60 text-sm mb-1">({member.alias})</p>
                    )}
                    <p className="text-game-accent font-semibold">{member.role}</p>
                    {member.credits && (
                      <div className="mt-3 text-sm text-game-light/70">
                        <p className="mb-1">Credit: {member.credits.handle}</p>
                        <div className="flex items-center justify-center gap-3 flex-wrap">
                          {member.credits.instagram && (
                            <a
                              href={member.credits.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-game-accent hover:text-game-accent/80 transition-colors"
                            >
                              Instagram
                            </a>
                          )}
                          {member.credits.tiktok && (
                            <a
                              href={member.credits.tiktok}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-game-accent hover:text-game-accent/80 transition-colors"
                            >
                              TikTok
                            </a>
                          )}
                          {member.credits.linktree && (
                            <a
                              href={member.credits.linktree}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-game-accent hover:text-game-accent/80 transition-colors"
                            >
                              Linktree
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="text-game-light/80 leading-relaxed whitespace-pre-wrap">
                    {member.description}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-16 text-center"
            >
              <div className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-8 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-game-light mb-4">Our Story</h2>
                <p className="text-game-light/80 leading-relaxed mb-4">
                  Play With Friends is being developed by a passionate team of developers and
                  artists, alongside contributors, while balancing full-time jobs. We're committed
                  to creating a game that brings friends together for chaotic, fun adventures.
                </p>
                <p className="text-game-light/80 leading-relaxed">
                  Community feedback shapes our development, and we're transparent about our
                  progress. Early Access is planned for early 2026, and we're working hard to
                  ensure the best possible experience for our players.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default AboutPage
