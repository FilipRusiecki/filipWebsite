import { useState } from 'react'
import { useQuery, useMutation } from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'
import { motion, AnimatePresence } from 'framer-motion'

const BUSINESS_REVIEWS_QUERY = gql`
  query BusinessReviewsQuery {
    businessReviews {
      id
      name
      rating
      body
      createdAt
    }
  }
`

const CREATE_BUSINESS_REVIEW = gql`
  mutation CreateBusinessReviewMutation($input: CreateBusinessReviewInput!) {
    createBusinessReview(input: $input) {
      id
      name
      rating
      body
      createdAt
    }
  }
`

const Stars = ({ rating, size = 'md' }) => {
  const cls = size === 'sm' ? 'text-sm' : 'text-lg'
  return (
    <span className={`text-game-accent tracking-tight ${cls}`} aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(rating)}
      <span className="text-game-accent/25">{'★'.repeat(5 - rating)}</span>
    </span>
  )
}

const BusinessReviewsSection = () => {
  const { data, loading, refetch } = useQuery(BUSINESS_REVIEWS_QUERY, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  })
  const [showForm, setShowForm] = useState(false)
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [rating, setRating] = useState(5)
  const [body, setBody] = useState('')
  const [message, setMessage] = useState(null)

  const [createReview, { loading: submitting }] = useMutation(CREATE_BUSINESS_REVIEW, {
    onCompleted: () => {
      setMessage({ type: 'success', text: 'Thanks — your review is live.' })
      setCode('')
      setName('')
      setRating(5)
      setBody('')
      setShowForm(false)
      refetch()
      setTimeout(() => setMessage(null), 5000)
    },
    onError: (err) => {
      const text =
        err?.graphQLErrors?.[0]?.message ||
        err?.message ||
        'Could not submit review. Check your invite code and try again.'
      setMessage({ type: 'error', text })
    },
  })

  const reviews = data?.businessReviews || []

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage(null)
    createReview({
      variables: {
        input: {
          code: code.trim(),
          name: name.trim(),
          rating,
          body: body.trim(),
        },
      },
    })
  }

  return (
    <section
      id="reviews"
      className="relative py-16 md:py-24 border-t border-game-accent/15 scroll-mt-20"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 100%, rgba(209,173,74,0.1), transparent 55%)',
        }}
      />
      <div className="relative container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-game-accent font-semibold tracking-[0.18em] uppercase text-xs mb-3">
            Clients
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-game-light mb-3">
            Reviews
          </h2>
          <p className="text-game-light/65 text-base md:text-lg max-w-xl mx-auto">
            Verified feedback from people I&apos;ve built sites for — leave one only with an invite
            code.
          </p>
        </motion.div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg border text-sm ${
              message.type === 'success'
                ? 'bg-green-500/15 border-green-500/40 text-green-400'
                : 'bg-red-500/15 border-red-500/40 text-red-400'
            }`}
          >
            {message.text}
          </div>
        )}

        {loading && !reviews.length ? (
          <p className="text-center text-game-light/45 text-sm mb-10">Loading reviews…</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-game-light/45 text-sm mb-10">
            No public reviews yet — be the first after your project wraps.
          </p>
        ) : (
          <div className="space-y-8 mb-12">
            {reviews.map((review, index) => (
              <motion.blockquote
                key={review.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.2) }}
                className="border-l-2 border-game-accent/40 pl-5 md:pl-6"
              >
                <Stars rating={review.rating} />
                <p className="mt-2 text-game-light/80 text-base md:text-lg leading-relaxed">
                  “{review.body}”
                </p>
                <footer className="mt-3 text-sm text-game-light/50">
                  — <span className="text-game-light/75 font-semibold">{review.name}</span>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        )}

        <div className="text-center">
          {!showForm ? (
            <button
              type="button"
              onClick={() => {
                setShowForm(true)
                setMessage(null)
              }}
              className="inline-flex items-center gap-2 border border-game-accent/55 text-game-accent px-6 py-3 rounded-lg font-bold hover:bg-game-accent hover:text-game-dark transition-all duration-300"
            >
              Add a review
            </button>
          ) : null}
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="mt-8 border border-game-accent/35 bg-game-dark/80 p-6 md:p-8 rounded-lg space-y-5"
            >
              <div>
                <label htmlFor="review-code" className="block text-game-light font-semibold mb-2 text-sm">
                  Invite code <span className="text-game-accent">*</span>
                </label>
                <input
                  id="review-code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full px-4 py-3 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light font-mono tracking-wide focus:border-game-accent focus:outline-none"
                  placeholder="FRVG-XXXX-XXXX"
                  required
                  autoComplete="off"
                />
                <p className="text-xs text-game-light/45 mt-1.5">
                  Sent to you after a project — one use per code.
                </p>
              </div>

              <div>
                <label htmlFor="review-name" className="block text-game-light font-semibold mb-2 text-sm">
                  Your name <span className="text-game-accent">*</span>
                </label>
                <input
                  id="review-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none"
                  placeholder="How you want to appear"
                  required
                  maxLength={80}
                />
              </div>

              <div>
                <span className="block text-game-light font-semibold mb-2 text-sm">
                  Rating <span className="text-game-accent">*</span>
                </span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setRating(n)}
                      className={`w-10 h-10 rounded-lg border text-lg transition-all ${
                        rating >= n
                          ? 'border-game-accent bg-game-accent/20 text-game-accent'
                          : 'border-game-accent/25 text-game-light/35 hover:border-game-accent/50'
                      }`}
                      aria-label={`${n} stars`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="review-body" className="block text-game-light font-semibold mb-2 text-sm">
                  Review <span className="text-game-accent">*</span>
                </label>
                <textarea
                  id="review-body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  rows={4}
                  maxLength={1200}
                  className="w-full px-4 py-3 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none resize-none"
                  placeholder="What was it like working together?"
                  required
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 min-w-[140px] bg-game-accent text-game-dark px-6 py-3 rounded-lg font-bold hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {submitting ? 'Submitting…' : 'Submit review'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false)
                    setMessage(null)
                  }}
                  className="px-6 py-3 border border-game-accent/30 text-game-light rounded-lg font-bold hover:border-game-accent transition-all"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default BusinessReviewsSection
