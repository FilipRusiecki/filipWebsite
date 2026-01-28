import { useQuery } from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'
import { Metadata } from '@redwoodjs/web'
import { motion } from 'framer-motion'

import Navigation from 'src/components/Navigation/Navigation'
import Footer from 'src/components/Footer/Footer'

const UPDATES_QUERY = gql`
  query UpdatesQuery {
    updates {
      id
      title
      version
      content
      summary
      createdAt
      updatedAt
    }
  }
`

const UpdatesPage = () => {
  const { data, loading } = useQuery(UPDATES_QUERY)

  return (
    <>
      <Metadata
        title="Updates & Patch Notes - Filip Rusiecki Video Games"
        description="Stay up to date with the latest updates, patches, and news for Play With Friends"
      />
      <div className="dark bg-game-dark min-h-screen">
        <Navigation />
        <div className="py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-game-light">
                Updates & Patch Notes
              </h1>
              <p className="text-xl text-game-light/80 max-w-2xl mx-auto">
                Stay up to date with the latest changes, improvements, and new features
              </p>
            </motion.div>

            {loading ? (
              <div className="text-center py-12">
                <p className="text-game-light/60 text-lg">Loading updates...</p>
              </div>
            ) : data?.updates && data.updates.length > 0 ? (
              <div className="space-y-8">
                {data.updates.map((update, index) => (
                  <motion.article
                    key={update.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-6 md:p-8 hover:border-game-accent transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                      <div className="flex-1">
                        {update.version && (
                          <div className="mb-3">
                            <span className="px-3 py-1 bg-game-accent/20 text-game-accent rounded-full text-sm font-semibold">
                              {update.version}
                            </span>
                          </div>
                        )}
                        <h2 className="text-2xl md:text-3xl font-bold text-game-light mb-2">
                          {update.title}
                        </h2>
                        <div className="text-sm text-game-light/60">
                          <span>
                            Published:{' '}
                            {new Date(update.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </span>
                          {update.updatedAt !== update.createdAt && (
                            <>
                              <span className="mx-2">•</span>
                              <span>
                                Updated:{' '}
                                {new Date(update.updatedAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {update.summary && (
                      <p className="text-game-light/80 text-lg mb-4 leading-relaxed">
                        {update.summary}
                      </p>
                    )}
                    <div className="bg-game-dark border border-game-accent/20 rounded-lg p-4 mt-4">
                      <div
                        className="text-game-light whitespace-pre-wrap leading-relaxed prose prose-invert max-w-none"
                        dangerouslySetInnerHTML={{ __html: update.content }}
                      />
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-game-light/60 text-lg mb-4">
                  No updates available yet.
                </p>
                <p className="text-game-light/40 text-sm">
                  Check back soon for the latest news and updates!
                </p>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default UpdatesPage
