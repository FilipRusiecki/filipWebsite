import { useQuery } from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'
import { Metadata } from '@redwoodjs/web'
import { motion } from 'framer-motion'

import Navigation from 'src/components/Navigation/Navigation'
import Footer from 'src/components/Footer/Footer'
import SectionAtmosphere from 'src/components/SectionAtmosphere/SectionAtmosphere'

import valentinesCarousel from '../../assets/images/updates/valentinesCarousel.png'
import updateCarousel1 from '../../assets/images/updates/UpdateCarusle1.png'

const UPDATE_IMAGE_BUNDLED = {
  'valentinesCarousel.png': valentinesCarousel,
  'UpdateCarusle1.png': updateCarousel1,
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

const resolveImage = (update) => {
  if (update.title?.includes('Valentine')) {
    return valentinesCarousel || '/images/updates/valentinesCarousel.png'
  }
  if (update.title?.includes('Quests, Proximity Chat')) {
    return updateCarousel1 || '/images/updates/UpdateCarusle1.png'
  }
  if (update.image?.trim()) {
    const key = update.image.trim()
    return UPDATE_IMAGE_BUNDLED[key] || `/images/updates/${key}`
  }
  return null
}

const UpdatesPage = () => {
  const { data, loading } = useQuery(UPDATES_QUERY)

  return (
    <>
      <Metadata
        title="Updates & Patch Notes - Filip Rusiecki Video Games"
        description="Stay up to date with the latest updates, patches, and news for Play With Friends"
      />
      <div className="dark bg-game-dark min-h-screen text-game-light">
        <Navigation />

        <section className="relative overflow-hidden min-h-[48vh] flex items-center border-b border-game-accent/15">
          <SectionAtmosphere intensity="strong" pulse grid />
          <div className="relative container mx-auto px-4 py-16 md:py-24 text-center">
            <motion.img
              src="/images/logos/FRVGLOGOtransperant.png"
              alt="Filip Rusiecki Video Games"
              className="h-20 sm:h-28 md:h-32 w-auto object-contain mx-auto mb-5"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
            />
            <motion.p
              className="text-game-accent font-semibold tracking-[0.2em] uppercase text-xs sm:text-sm mb-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              Patch notes
            </motion.p>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-game-light mb-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.12 }}
            >
              Updates
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-game-light/70 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.22 }}
            >
              Latest changes, improvements, and news for Play With Friends.
            </motion.p>
          </div>
        </section>

        <section className="relative overflow-hidden py-14 md:py-20">
          <SectionAtmosphere intensity="soft" />
          <div className="relative container mx-auto px-4 max-w-3xl">
            {loading ? (
              <p className="text-center text-game-light/55 text-lg py-12">
                Loading updates...
              </p>
            ) : data?.updates?.length > 0 ? (
              <div className="space-y-14 md:space-y-16">
                {data.updates.map((update, index) => {
                  const imgSrc = resolveImage(update)
                  return (
                    <motion.article
                      key={update.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.2) }}
                      className="border-l-2 border-game-accent/40 pl-5 md:pl-8"
                    >
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                        {update.version && (
                          <span className="text-game-accent font-mono text-xs tracking-wide">
                            {update.version}
                          </span>
                        )}
                        <time className="text-game-light/45 text-sm">
                          {new Date(update.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      </div>

                      <h2 className="text-2xl md:text-3xl font-bold text-game-light mb-4 leading-snug">
                        {update.title}
                      </h2>

                      {imgSrc && (
                        <div className="overflow-hidden border border-game-accent/25 mb-5 shadow-[0_0_40px_-18px_rgba(209,173,74,0.35)]">
                          <img
                            src={imgSrc}
                            alt=""
                            className="w-full object-cover object-center max-h-72"
                          />
                        </div>
                      )}

                      {update.summary && (
                        <p className="text-game-light/65 text-base md:text-lg mb-5 leading-relaxed">
                          {update.summary}
                        </p>
                      )}

                      <div
                        className="text-game-light/75 leading-relaxed space-y-4 text-[15px] md:text-base [&_p]:mb-4 [&_p:last-child]:mb-0 [&_strong]:text-game-light [&_a]:text-game-accent [&_a]:hover:underline"
                        dangerouslySetInnerHTML={{ __html: update.content }}
                      />
                    </motion.article>
                  )
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-game-light/60 text-lg mb-2">No updates available yet.</p>
                <p className="text-game-light/40 text-sm">
                  Check back soon for the latest news.
                </p>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}

export default UpdatesPage
