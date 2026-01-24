import { useState } from 'react'
import { useMutation } from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'

const CREATE_REPLY = gql`
  mutation CreateReplyMutation($input: CreateReplyInput!) {
    createReply(input: $input) {
      id
      content
      isAdmin
      createdAt
      ticket {
        id
        replies {
          id
          content
          isAdmin
          createdAt
        }
      }
    }
  }
`

const TicketView = ({ ticket, onUpdate }) => {
  const [replyContent, setReplyContent] = useState('')
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [message, setMessage] = useState(null)

  const [createReply, { loading }] = useMutation(CREATE_REPLY, {
    onCompleted: (data) => {
      setMessage({ type: 'success', text: 'Reply submitted!' })
      setReplyContent('')
      setShowReplyForm(false)
      setTimeout(() => setMessage(null), 3000)
      if (onUpdate) onUpdate(data.createReply.ticket)
    },
    onError: (error) => {
      setMessage({ type: 'error', text: 'Failed to submit reply. Please try again.' })
      console.error(error)
      setTimeout(() => setMessage(null), 3000)
    },
  })

  const handleReplySubmit = (e) => {
    e.preventDefault()
    if (!replyContent.trim()) {
      setMessage({ type: 'error', text: 'Please enter a reply.' })
      setTimeout(() => setMessage(null), 3000)
      return
    }

    createReply({
      variables: {
        input: {
          ticketId: ticket.id,
          content: replyContent.trim(),
          isAdmin: false,
        },
      },
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'bg-green-500/20 text-green-400 border-green-500/50'
      case 'in_progress':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50'
      case 'resolved':
        return 'bg-game-accent/20 text-game-accent border-game-accent/50'
      case 'closed':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50'
      default:
        return 'bg-game-accent/20 text-game-accent border-game-accent/50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Ticket Header */}
      <div className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-3xl font-bold text-game-light">{ticket.title}</h2>
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(
              ticket.status
            )}`}
          >
            {ticket.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-game-accent/20 text-game-accent border border-game-accent/50">
            {ticket.ticketType === 'bug_report' ? '🐛 Bug Report' : '💬 Support'}
          </span>
        </div>
        <div className="text-sm text-game-light/60 mb-4">
          <span>Ticket ID: #{ticket.id}</span>
          <span className="mx-2">•</span>
          <span>Created: {new Date(ticket.createdAt).toLocaleString()}</span>
          {ticket.email && (
            <>
              <span className="mx-2">•</span>
              <span>Email: {ticket.email}</span>
            </>
          )}
        </div>

        {/* Bug Report Specific Information */}
        {ticket.ticketType === 'bug_report' && (
          <div className="bg-game-dark border border-game-accent/20 rounded-lg p-4 mb-4 space-y-3">
            {(ticket.platform || ticket.gameVersion || ticket.severity || ticket.frequency) && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                {ticket.platform && (
                  <div>
                    <span className="text-game-light/60">Platform:</span>
                    <span className="text-game-light ml-2 font-semibold">{ticket.platform}</span>
                  </div>
                )}
                {ticket.gameVersion && (
                  <div>
                    <span className="text-game-light/60">Version:</span>
                    <span className="text-game-light ml-2 font-semibold">{ticket.gameVersion}</span>
                  </div>
                )}
                {ticket.severity && (
                  <div>
                    <span className="text-game-light/60">Severity:</span>
                    <span className="text-game-light ml-2 font-semibold">{ticket.severity}</span>
                  </div>
                )}
                {ticket.frequency && (
                  <div>
                    <span className="text-game-light/60">Frequency:</span>
                    <span className="text-game-light ml-2 font-semibold">{ticket.frequency}</span>
                  </div>
                )}
              </div>
            )}
            {ticket.stepsToReproduce && (
              <div>
                <h4 className="text-game-accent font-semibold mb-2">Steps to Reproduce:</h4>
                <p className="text-game-light whitespace-pre-wrap leading-relaxed">
                  {ticket.stepsToReproduce}
                </p>
              </div>
            )}
            {ticket.expectedBehavior && (
              <div>
                <h4 className="text-game-accent font-semibold mb-2">Expected Behavior:</h4>
                <p className="text-game-light whitespace-pre-wrap leading-relaxed">
                  {ticket.expectedBehavior}
                </p>
              </div>
            )}
            {ticket.actualBehavior && (
              <div>
                <h4 className="text-game-accent font-semibold mb-2">Actual Behavior:</h4>
                <p className="text-game-light whitespace-pre-wrap leading-relaxed">
                  {ticket.actualBehavior}
                </p>
              </div>
            )}
          </div>
        )}

        <div className="bg-game-dark border border-game-accent/20 rounded-lg p-4">
          <h4 className="text-game-accent font-semibold mb-2">
            {ticket.ticketType === 'bug_report' ? 'Additional Details:' : 'Description:'}
          </h4>
          <p className="text-game-light whitespace-pre-wrap leading-relaxed">
            {ticket.description}
          </p>
        </div>
      </div>

      {/* Replies Section */}
      <div>
        <h3 className="text-2xl font-bold text-game-light mb-4">
          Replies ({ticket.replies?.length || 0})
        </h3>
        <div className="space-y-4">
          {ticket.replies && ticket.replies.length > 0 ? (
            ticket.replies.map((reply) => (
              <div
                key={reply.id}
                className={`bg-game-dark border-2 rounded-lg p-4 ${
                  reply.isAdmin
                    ? 'border-game-accent/50 bg-game-accent/5'
                    : 'border-game-accent/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      reply.isAdmin
                        ? 'bg-game-accent/20 text-game-accent'
                        : 'bg-game-light/10 text-game-light/70'
                    }`}
                  >
                    {reply.isAdmin ? 'Developer' : 'User'}
                  </span>
                  <span className="text-sm text-game-light/60">
                    {new Date(reply.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-game-light whitespace-pre-wrap leading-relaxed">
                  {reply.content}
                </p>
              </div>
            ))
          ) : (
            <p className="text-game-light/60 text-center py-8">
              No replies yet. Be the first to add a reply!
            </p>
          )}
        </div>
      </div>

      {/* Reply Form */}
      <div className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-6">
        {message && (
          <div
            className={`p-4 rounded-lg border-2 mb-4 ${
              message.type === 'success'
                ? 'bg-green-500/20 border-green-500/50 text-green-400'
                : 'bg-red-500/20 border-red-500/50 text-red-400'
            }`}
          >
            {message.text}
          </div>
        )}
        {!showReplyForm ? (
          <button
            onClick={() => setShowReplyForm(true)}
            className="w-full bg-game-accent text-game-dark px-6 py-3 rounded-lg font-bold hover:bg-game-accent/90 transition-all duration-300"
          >
            Add Reply
          </button>
        ) : (
          <form onSubmit={handleReplySubmit} className="space-y-4">
            <div>
              <label htmlFor="reply" className="block text-game-light font-semibold mb-2">
                Your Reply
              </label>
              <textarea
                id="reply"
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none transition-colors resize-none"
                placeholder="Type your reply here..."
                required
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-game-accent text-game-dark px-6 py-3 rounded-lg font-bold hover:bg-game-accent/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Reply'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowReplyForm(false)
                  setReplyContent('')
                }}
                className="px-6 py-3 border-2 border-game-accent/30 text-game-light rounded-lg font-bold hover:border-game-accent transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default TicketView
