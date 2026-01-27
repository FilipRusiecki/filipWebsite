import { useState } from 'react'
import { useMutation } from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'

const CREATE_TICKET = gql`
  mutation CreateSupportTicketMutation($input: CreateTicketInput!) {
    createTicket(input: $input) {
      id
      viewToken
      title
      description
      email
      status
      createdAt
    }
  }
`

const TicketForm = ({ onSuccess }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState(null)
  const [createdTicketId, setCreatedTicketId] = useState(null)
  const [viewToken, setViewToken] = useState(null)

  const [createTicket, { loading }] = useMutation(CREATE_TICKET, {
    onCompleted: (data) => {
      const ticket = data?.createTicket
      const ticketId = ticket?.id
      const viewToken = ticket?.viewToken
      if (!ticketId) {
        setMessage({ type: 'error', text: 'Ticket was created but we could not load the link. Please try again or contact support.' })
        return
      }
      setCreatedTicketId(ticketId)
      setViewToken(viewToken || null)
      setMessage({ 
        type: 'success', 
        text: 'Ticket submitted successfully! Save your ticket link below to track your ticket status.' 
      })
      setTitle('')
      setDescription('')
      setEmail('')
      if (onSuccess) onSuccess(ticketId, viewToken)
    },
    onError: (error) => {
      setMessage({ type: 'error', text: 'Failed to submit ticket. Please try again.' })
      console.error(error)
      setTimeout(() => setMessage(null), 5000)
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' })
      setTimeout(() => setMessage(null), 3000)
      return
    }

    createTicket({
      variables: {
        input: {
          title: title.trim(),
          description: description.trim(),
          email: email.trim() || null,
          ticketType: 'support',
        },
      },
    })
  }

  const getTicketUrl = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    const path = `${baseUrl}/support/${createdTicketId}`
    return viewToken ? `${path}?token=${encodeURIComponent(viewToken)}` : path
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getTicketUrl())
    setMessage({ type: 'success', text: 'Ticket link copied to clipboard!' })
    setTimeout(() => setMessage({ type: 'success', text: 'Ticket submitted successfully! Save your ticket link below to track your ticket status.' }), 2000)
  }

  // Show success screen with ticket link
  if (createdTicketId) {
    return (
      <div className="space-y-6">
        <div className="p-6 rounded-lg border-2 bg-green-500/20 border-green-500/50 text-center">
          <div className="text-green-400 text-xl font-bold mb-4">Ticket Submitted Successfully!</div>
          <p className="text-game-light mb-4">
            Your ticket ID is <span className="text-game-accent font-mono font-bold">#{createdTicketId}</span>
          </p>
          <p className="text-game-light/80 mb-4 text-sm">
            Save this link to check your ticket status and view responses:
          </p>
          <div className="bg-game-dark/50 p-3 rounded-lg mb-4 break-all">
            <a 
              href={getTicketUrl()} 
              className="text-game-accent hover:underline font-mono text-sm"
            >
              {getTicketUrl()}
            </a>
          </div>
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={copyToClipboard}
              className="bg-game-accent text-game-dark px-4 py-2 rounded-lg font-semibold hover:bg-game-accent/90 transition-colors"
            >
              Copy Link
            </button>
            <button
              onClick={() => setCreatedTicketId(null)}
              className="bg-game-primary text-game-light px-4 py-2 rounded-lg font-semibold hover:bg-game-primary/80 transition-colors border border-game-accent/30"
            >
              Submit Another Ticket
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded-lg border-2 ${
            message.type === 'success'
              ? 'bg-green-500/20 border-green-500/50 text-green-400'
              : 'bg-red-500/20 border-red-500/50 text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}
      <div>
        <label htmlFor="title" className="block text-game-light font-semibold mb-2">
          Title <span className="text-game-accent">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none transition-colors"
          placeholder="Brief description of your issue or question"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-game-light font-semibold mb-2">
          Description <span className="text-game-accent">*</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={6}
          className="w-full px-4 py-3 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none transition-colors resize-none"
          placeholder="Please provide as much detail as possible about your issue, bug report, or question..."
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-game-light font-semibold mb-2">
          Email (Optional)
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none transition-colors"
          placeholder="your.email@example.com"
        />
        <p className="text-sm text-game-light/60 mt-2">
          Providing your email allows us to respond directly to your ticket.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-game-accent text-game-dark px-6 py-3 rounded-lg font-bold text-lg hover:bg-game-accent/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting...' : 'Submit Ticket'}
      </button>
    </form>
  )
}

export default TicketForm
