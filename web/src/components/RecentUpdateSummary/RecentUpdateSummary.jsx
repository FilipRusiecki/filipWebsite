import { useQuery } from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'
import { Link, routes } from '@redwoodjs/router'
import { motion } from 'framer-motion'

const RECENT_UPDATES_QUERY = gql`
  query RecentUpdatesQuery($limit: Int) {
    recentUpdates(limit: $limit) {
      id
      title
      version
      summary
      createdAt
    }
  }
`

const RecentUpdateSummary = () => {
  const { data, loading } = useQuery(RECENT_UPDATES_QUERY, {
    variables: { limit: 1 },
  })

  if (loading) {
    return null
  }

  const latestUpdate = data?.recentUpdates?.[0]

  if (!latestUpdate) {
    return null
  }

  return (
    <section className="py-20 bg-game-dark border-t-2 border-game-accent/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-3xl md:text-4xl font-bold text-game-accent">
              Latest Update
            </h2>
            <Link
              to={routes.updates()}
              className="text-game-accent hover:text-game-accent/80 transition-colors font-semibold text-sm md:text-base"
            >
              View All Updates →
            </Link>
          </div>
          {latestUpdate.version && (
            <div className="mb-3">
              <span className="px-3 py-1 bg-game-accent/20 text-game-accent rounded-full text-sm font-semibold">
                {latestUpdate.version}
              </span>
            </div>
          )}
          <h3 className="text-2xl md:text-3xl font-bold text-game-light mb-4">
            {latestUpdate.title}
          </h3>
          {latestUpdate.summary && (
            <p className="text-game-light/80 text-lg mb-6 leading-relaxed">
              {latestUpdate.summary}
            </p>
          )}
          <div className="flex items-center justify-between">
            <span className="text-game-light/60 text-sm">
              {new Date(latestUpdate.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <Link
              to={routes.updates()}
              className="bg-game-accent text-game-dark px-6 py-3 rounded-lg font-bold hover:bg-game-accent/90 transition-all duration-300"
            >
              Read Full Patch Notes
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default RecentUpdateSummary
