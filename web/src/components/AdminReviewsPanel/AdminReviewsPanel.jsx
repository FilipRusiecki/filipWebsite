import { useState } from 'react'
import { useQuery, useMutation } from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'

const REVIEW_INVITES_QUERY = gql`
  query AdminReviewInvitesQuery {
    reviewInvites {
      id
      code
      label
      used
      usedAt
      createdAt
      review {
        id
        name
      }
    }
  }
`

const ADMIN_REVIEWS_QUERY = gql`
  query AdminBusinessReviewsQuery {
    adminBusinessReviews {
      id
      name
      rating
      body
      isPublished
      createdAt
    }
  }
`

const CREATE_INVITE = gql`
  mutation CreateReviewInviteMutation($input: CreateReviewInviteInput) {
    createReviewInvite(input: $input) {
      id
      code
      label
      used
      createdAt
    }
  }
`

const SET_PUBLISHED = gql`
  mutation SetBusinessReviewPublishedMutation($id: Int!, $isPublished: Boolean!) {
    setBusinessReviewPublished(id: $id, isPublished: $isPublished) {
      id
      isPublished
    }
  }
`

const DELETE_REVIEW = gql`
  mutation DeleteBusinessReviewMutation($id: Int!) {
    deleteBusinessReview(id: $id) {
      id
    }
  }
`

const DELETE_INVITE = gql`
  mutation DeleteReviewInviteMutation($id: Int!) {
    deleteReviewInvite(id: $id) {
      id
    }
  }
`

const AdminReviewsPanel = () => {
  const [label, setLabel] = useState('')
  const [lastCode, setLastCode] = useState(null)
  const [copied, setCopied] = useState(false)

  const { data: invitesData, loading: invitesLoading, refetch: refetchInvites } = useQuery(
    REVIEW_INVITES_QUERY,
    { fetchPolicy: 'network-only' }
  )
  const { data: reviewsData, loading: reviewsLoading, refetch: refetchReviews } = useQuery(
    ADMIN_REVIEWS_QUERY,
    { fetchPolicy: 'network-only' }
  )

  const [createInvite, { loading: creating }] = useMutation(CREATE_INVITE, {
    onCompleted: (res) => {
      setLastCode(res.createReviewInvite.code)
      setLabel('')
      setCopied(false)
      refetchInvites()
    },
  })

  const [setPublished] = useMutation(SET_PUBLISHED, {
    onCompleted: () => refetchReviews(),
  })
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    onCompleted: () => {
      refetchReviews()
      refetchInvites()
    },
  })
  const [deleteInvite] = useMutation(DELETE_INVITE, {
    onCompleted: () => refetchInvites(),
  })

  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // ignore
    }
  }

  const invites = invitesData?.reviewInvites || []
  const reviews = reviewsData?.adminBusinessReviews || []

  return (
    <div className="space-y-10">
      <div className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-game-light mb-2">Create review invite</h2>
        <p className="text-game-light/60 text-sm mb-4">
          Generate a one-time code and send it to a client so they can leave a review on the Business
          page.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            createInvite({
              variables: { input: { label: label.trim() || null } },
            })
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Optional note (client / project)"
            className="flex-1 px-4 py-3 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none"
            maxLength={120}
          />
          <button
            type="submit"
            disabled={creating}
            className="bg-game-accent text-game-dark px-6 py-3 rounded-lg font-bold hover:bg-game-accent/90 disabled:opacity-50"
          >
            {creating ? 'Creating…' : 'Generate code'}
          </button>
        </form>
        {lastCode && (
          <div className="mt-4 p-4 border border-game-accent/40 rounded-lg flex flex-wrap items-center gap-3">
            <span className="font-mono text-game-accent text-lg tracking-wide">{lastCode}</span>
            <button
              type="button"
              onClick={() => copyCode(lastCode)}
              className="text-sm font-bold text-game-light border border-game-accent/40 px-3 py-1.5 rounded-lg hover:border-game-accent"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-game-light mb-4">Invite codes</h3>
          {invitesLoading ? (
            <p className="text-game-light/60">Loading…</p>
          ) : invites.length === 0 ? (
            <p className="text-game-light/60 text-sm">No invites yet.</p>
          ) : (
            <ul className="space-y-3 max-h-[420px] overflow-y-auto">
              {invites.map((inv) => (
                <li
                  key={inv.id}
                  className="border border-game-accent/25 rounded-lg p-3 flex flex-wrap items-start justify-between gap-2"
                >
                  <div>
                    <p className="font-mono text-game-accent text-sm">{inv.code}</p>
                    {inv.label && (
                      <p className="text-game-light/55 text-xs mt-0.5">{inv.label}</p>
                    )}
                    <p className="text-xs text-game-light/40 mt-1">
                      {inv.used
                        ? `Used${inv.review?.name ? ` by ${inv.review.name}` : ''}`
                        : 'Unused'}{' '}
                      · {new Date(inv.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {!inv.used && (
                      <>
                        <button
                          type="button"
                          onClick={() => copyCode(inv.code)}
                          className="text-xs font-semibold text-game-accent hover:underline"
                        >
                          Copy
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm('Delete this unused invite?')) {
                              deleteInvite({ variables: { id: inv.id } })
                            }
                          }}
                          className="text-xs font-semibold text-red-400 hover:underline"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-6">
          <h3 className="text-xl font-bold text-game-light mb-4">Reviews</h3>
          {reviewsLoading ? (
            <p className="text-game-light/60">Loading…</p>
          ) : reviews.length === 0 ? (
            <p className="text-game-light/60 text-sm">No reviews yet.</p>
          ) : (
            <ul className="space-y-4 max-h-[420px] overflow-y-auto">
              {reviews.map((r) => (
                <li key={r.id} className="border border-game-accent/25 rounded-lg p-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-bold text-game-light text-sm">
                      {r.name}{' '}
                      <span className="text-game-accent font-normal">
                        {'★'.repeat(r.rating)}
                      </span>
                    </p>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wide ${
                        r.isPublished ? 'text-green-400' : 'text-game-light/40'
                      }`}
                    >
                      {r.isPublished ? 'Public' : 'Hidden'}
                    </span>
                  </div>
                  <p className="text-game-light/70 text-sm leading-relaxed line-clamp-3">{r.body}</p>
                  <div className="flex gap-3 mt-2">
                    <button
                      type="button"
                      onClick={() =>
                        setPublished({
                          variables: { id: r.id, isPublished: !r.isPublished },
                        })
                      }
                      className="text-xs font-semibold text-game-accent hover:underline"
                    >
                      {r.isPublished ? 'Hide' : 'Publish'}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Delete this review? The invite will become unused again.')) {
                          deleteReview({ variables: { id: r.id } })
                        }
                      }}
                      className="text-xs font-semibold text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminReviewsPanel
