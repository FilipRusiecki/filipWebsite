import { Metadata } from '@redwoodjs/web'
import { motion } from 'framer-motion'

import Navigation from 'src/components/Navigation/Navigation'
import Footer from 'src/components/Footer/Footer'

const AboutPage = () => {
  // Placeholder team members - easily expandable
  const teamMembers = [
    {
      name: 'Team Member 1',
      role: 'Developer & Co-Founder',
      image: 'https://via.placeholder.com/300x300/252325/D1AD4A?text=Team+Member+1',
      description:
        'Placeholder description for team member 1. This section will be updated with actual team member information, including their background, role in the project, and personal message to the community.',
    },
    {
      name: 'Team Member 2',
      role: 'Developer & Co-Founder',
      image: 'https://via.placeholder.com/300x300/252325/D1AD4A?text=Team+Member+2',
      description:
        'Placeholder description for team member 2. This section will be updated with actual team member information, including their background, role in the project, and personal message to the community.',
    },
    {
      name: 'Team Member 3',
      role: 'Contributor',
      image: 'https://via.placeholder.com/300x300/252325/D1AD4A?text=Team+Member+3',
      description:
        'Placeholder description for team member 3. This section will be updated with actual team member information, including their background, role in the project, and personal message to the community.',
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
                    <h3 className="text-2xl font-bold text-game-light mb-2">{member.name}</h3>
                    <p className="text-game-accent font-semibold">{member.role}</p>
                  </div>
                  <p className="text-game-light/80 leading-relaxed">{member.description}</p>
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
                  Play With Friends is being developed by two passionate developers alongside
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
