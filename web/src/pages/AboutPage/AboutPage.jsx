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
  ]

  return (
    <>
      <Metadata
        title="About the Team - FRVideoGames"
        description="Meet the team behind Play With Friends and FRVideoGames"
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                  Play With Friends is being developed by three passionate developers alongside
                  contributors, while balancing full-time jobs. We're committed to creating a
                  game that brings friends together for chaotic, fun adventures.
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
