import { useQuery } from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'
import { Metadata } from '@redwoodjs/web'
import { motion } from 'framer-motion'

import Navigation from 'src/components/Navigation/Navigation'
import Footer from 'src/components/Footer/Footer'

// Bundled so update images always load (same files also in public/images/updates/)
import valentinesCarousel from '../../assets/images/updates/valentinesCarousel.png'
import updateCarousel1 from '../../assets/images/updates/UPDATECarusle1.png'

const UPDATE_IMAGE_BUNDLED = {
  'valentinesCarousel.png': valentinesCarousel,
  'UPDATECarusle1.png': updateCarousel1,
}

const UPDATES_QUERY = gql`
  query UpdatesQuery {
    updates {
      id
      title
      version
      content
      summary
      image
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
              <div className="space-y-12">
                {data.updates.map((update, index) => {
                  let imgSrc = null
                  if (update.title?.includes('Valentine')) {
                    imgSrc = valentinesCarousel || '/images/updates/valentinesCarousel.png'
                  } else if (update.title?.includes('Quests, Proximity Chat')) {
                    imgSrc = updateCarousel1 || '/images/updates/UPDATECarusle1.png'
                  } else if (update.image?.trim()) {
                    const key = update.image.trim()
                    imgSrc = UPDATE_IMAGE_BUNDLED[key] || `/images/updates/${key}`
                  }
                  return (
                    <motion.article
                      key={update.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="overflow-hidden rounded-lg border border-white/15 bg-[#1b2838] shadow-lg"
                    >
                      {/* Steam-style: full-width hero image first */}
                      {imgSrc && (
                        <div className="w-full overflow-hidden border-b border-white/10">
                          <img
                            src={imgSrc}
                            alt=""
                            className="w-full object-cover object-center"
                            style={{ maxHeight: '420px' }}
                          />
                        </div>
                      )}
                      <div className="px-6 py-6 md:px-8 md:py-8">
                        {/* Title and date below image, like Steam news */}
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {update.title}
                        </h2>
                        <p className="text-sm text-[#8f98a0] mb-6">
                          {new Date(update.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                        {/* Body content - Steam-style readable column */}
                        <div
                          className="text-[#c7d5e0] leading-relaxed space-y-4 [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:text-white"
                          style={{ fontSize: '15px' }}
                          dangerouslySetInnerHTML={{ __html: update.content }}
                        />
                      </div>
                    </motion.article>
                  )
                })}
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
