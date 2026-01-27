import { useState } from 'react'
import { useMutation } from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'

const CREATE_TICKET = gql`
  mutation CreateBugReportMutation($input: CreateTicketInput!) {
    createTicket(input: $input) {
      id
      title
      description
      email
      ticketType
      status
      createdAt
    }
  }
`

const BugReportForm = ({ onSuccess }) => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [email, setEmail] = useState('')
  const [gameVersion, setGameVersion] = useState('')
  const [platform, setPlatform] = useState('')
  const [stepsToReproduce, setStepsToReproduce] = useState('')
  const [expectedBehavior, setExpectedBehavior] = useState('')
  const [actualBehavior, setActualBehavior] = useState('')
  const [frequency, setFrequency] = useState('')
  const [severity, setSeverity] = useState('')
  const [message, setMessage] = useState(null)
  const [createdTicketId, setCreatedTicketId] = useState(null)

  const [createTicket, { loading }] = useMutation(CREATE_TICKET, {
    onCompleted: (data) => {
      const ticketId = data?.createTicket?.id
      if (!ticketId) {
        setMessage({ type: 'error', text: 'Bug report was created but we could not load the link. Please try again or contact support.' })
        return
      }
      setCreatedTicketId(ticketId)
      setMessage({
        type: 'success',
        text: 'Bug report submitted successfully! Save your ticket link below to track your report status.',
      })
      // Reset form
      setTitle('')
      setDescription('')
      setEmail('')
      setGameVersion('')
      setPlatform('')
      setStepsToReproduce('')
      setExpectedBehavior('')
      setActualBehavior('')
      setFrequency('')
      setSeverity('')
      if (onSuccess) onSuccess(ticketId)
    },
    onError: (error) => {
      setMessage({ type: 'error', text: 'Failed to submit bug report. Please try again.' })
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
          ticketType: 'bug_report',
          gameVersion: gameVersion.trim() || null,
          platform: platform || null,
          stepsToReproduce: stepsToReproduce.trim() || null,
          expectedBehavior: expectedBehavior.trim() || null,
          actualBehavior: actualBehavior.trim() || null,
          frequency: frequency || null,
          severity: severity || null,
        },
      },
    })
  }

  const getTicketUrl = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
    return `${baseUrl}/support/${createdTicketId}`
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getTicketUrl())
    setMessage({ type: 'success', text: 'Ticket link copied to clipboard!' })
    setTimeout(() => setMessage({ type: 'success', text: 'Bug report submitted successfully! Save your ticket link below to track your report status.' }), 2000)
  }

  // Show success screen with ticket link
  if (createdTicketId) {
    return (
      <div className="space-y-6">
        <div className="p-6 rounded-lg border-2 bg-green-500/20 border-green-500/50 text-center">
          <div className="text-green-400 text-xl font-bold mb-4">Bug Report Submitted Successfully!</div>
          <p className="text-game-light mb-4">
            Your ticket ID is <span className="text-game-accent font-mono font-bold">#{createdTicketId}</span>
          </p>
          <p className="text-game-light/80 mb-4 text-sm">
            Save this link to check your bug report status and view responses:
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
              Submit Another Bug Report
            </button>
          </div>
          <p className="text-game-light/60 text-sm mt-4">
            Thank you for helping us improve the game!
          </p>
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
          Bug Title <span className="text-game-accent">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-3 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none transition-colors"
          placeholder="Brief description of the bug"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="gameVersion" className="block text-game-light font-semibold mb-2">
            Game Version
          </label>
          <input
            type="text"
            id="gameVersion"
            value={gameVersion}
            onChange={(e) => setGameVersion(e.target.value)}
            className="w-full px-4 py-3 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none transition-colors"
            placeholder="e.g., 1.0.0, Early Access 0.5"
          />
        </div>

        <div>
          <label htmlFor="platform" className="block text-game-light font-semibold mb-2">
            Platform <span className="text-game-accent">*</span>
          </label>
          <select
            id="platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
            className="w-full px-4 py-3 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none transition-colors"
            required
          >
            <option value="">Select platform</option>
            <option value="Windows">Windows</option>
            <option value="Mac">Mac</option>
            <option value="Linux">Linux</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="frequency" className="block text-game-light font-semibold mb-2">
            How often does this occur?
          </label>
          <select
            id="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            className="w-full px-4 py-3 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none transition-colors"
          >
            <option value="">Select frequency</option>
            <option value="Always">Always - Happens every time</option>
            <option value="Sometimes">Sometimes - Happens occasionally</option>
            <option value="Once">Once - Only happened once</option>
            <option value="Unknown">Unknown - Not sure</option>
          </select>
        </div>

        <div>
          <label htmlFor="severity" className="block text-game-light font-semibold mb-2">
            Severity
          </label>
          <select
            id="severity"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            className="w-full px-4 py-3 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none transition-colors"
          >
            <option value="">Select severity</option>
            <option value="Critical">Critical - Game breaking, cannot play</option>
            <option value="High">High - Major issue, significantly impacts gameplay</option>
            <option value="Medium">Medium - Noticeable issue, minor impact</option>
            <option value="Low">Low - Minor issue, cosmetic or small annoyance</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="stepsToReproduce" className="block text-game-light font-semibold mb-2">
          Steps to Reproduce
        </label>
        <textarea
          id="stepsToReproduce"
          value={stepsToReproduce}
          onChange={(e) => setStepsToReproduce(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none transition-colors resize-none"
          placeholder="1. Start the game&#10;2. Go to...&#10;3. Do...&#10;4. Bug occurs"
        />
        <p className="text-sm text-game-light/60 mt-2">
          Please list the exact steps that lead to the bug occurring.
        </p>
      </div>

      <div>
        <label htmlFor="expectedBehavior" className="block text-game-light font-semibold mb-2">
          Expected Behavior
        </label>
        <textarea
          id="expectedBehavior"
          value={expectedBehavior}
          onChange={(e) => setExpectedBehavior(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none transition-colors resize-none"
          placeholder="What should have happened?"
        />
      </div>

      <div>
        <label htmlFor="actualBehavior" className="block text-game-light font-semibold mb-2">
          Actual Behavior <span className="text-game-accent">*</span>
        </label>
        <textarea
          id="actualBehavior"
          value={actualBehavior}
          onChange={(e) => setActualBehavior(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none transition-colors resize-none"
          placeholder="What actually happened?"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-game-light font-semibold mb-2">
          Additional Details <span className="text-game-accent">*</span>
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full px-4 py-3 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none transition-colors resize-none"
          placeholder="Any additional information about the bug, error messages, screenshots description, etc."
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
          Providing your email allows us to follow up with you about this bug report.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-game-accent text-game-dark px-6 py-3 rounded-lg font-bold text-lg hover:bg-game-accent/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Submitting Bug Report...' : 'Submit Bug Report'}
      </button>
    </form>
  )
}

export default BugReportForm
