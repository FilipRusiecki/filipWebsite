import { useState, useEffect } from 'react'
import { useQuery } from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'
import { Metadata } from '@redwoodjs/web'
import { useParams, useLocation, navigate, routes } from '@redwoodjs/router'

import Navigation from 'src/components/Navigation/Navigation'
import Footer from 'src/components/Footer/Footer'
import TicketForm from 'src/components/TicketForm/TicketForm'
import BugReportForm from 'src/components/BugReportForm/BugReportForm'
import TicketList from 'src/components/TicketList/TicketList'
import TicketView from 'src/components/TicketView/TicketView'

const TICKETS_QUERY = gql`
  query SupportTicketsQuery {
    tickets {
      id
      title
      description
      email
      ticketType
      status
      createdAt
      updatedAt
      replies {
        id
        content
        isAdmin
        createdAt
      }
    }
  }
`

const TICKET_QUERY = gql`
  query TicketQuery($id: Int!, $token: String) {
    ticket(id: $id, token: $token) {
      id
      title
      description
      email
      ticketType
      status
      gameVersion
      platform
      stepsToReproduce
      expectedBehavior
      actualBehavior
      frequency
      severity
      createdAt
      updatedAt
      replies {
        id
        content
        isAdmin
        createdAt
      }
    }
  }
`

// Parse ticket id from path (/support/123) or query (?id=123)
const useTicketId = () => {
  const { id: pathId } = useParams()
  const { search } = useLocation()
  const queryId = typeof window !== 'undefined' && search
    ? new URLSearchParams(search).get('id')
    : null
  const raw = pathId || queryId
  const parsed = raw ? parseInt(raw, 10) : null
  return parsed != null && !isNaN(parsed) ? parsed : null
}

// Parse view token from query (?token=...). Required for anonymous tickets.
const useViewToken = () => {
  const { search } = useLocation()
  if (typeof window === 'undefined' || !search) return null
  return new URLSearchParams(search).get('token')
}

const SupportPage = () => {
  const id = useTicketId()
  const token = useViewToken()
  const [showNewTicket, setShowNewTicket] = useState(!id)
  const [ticketType, setTicketType] = useState('support') // 'support' or 'bug_report'

  useEffect(() => {
    setShowNewTicket(!id)
  }, [id])

  // Remove tickets list query - users should only see their own ticket by ID
  // Admins can see all tickets in the admin dashboard
  const ticketsData = null
  const ticketsLoading = false
  const refetchTickets = () => {}

      const { data: ticketData, loading: ticketLoading, refetch: refetchTicket } = useQuery(
        TICKET_QUERY,
        {
          variables: { id, token: token || null },
          skip: !id || isNaN(id),
          errorPolicy: 'all',
          fetchPolicy: 'cache-and-network',
        }
      )

  const handleTicketCreated = (ticketId, viewToken) => {
    setShowNewTicket(false)
    refetchTickets()
    if (ticketId) {
      const path = routes.supportTicket({ id: ticketId })
      if (viewToken) {
        navigate(`${path}?token=${encodeURIComponent(viewToken)}`)
      } else {
        navigate(path)
      }
    } else {
      navigate(routes.support())
    }
  }

  const handleTicketUpdate = (updatedTicket) => {
    refetchTicket()
    refetchTickets()
  }

  return (
    <>
      <Metadata
        title="Support - Filip Rusiecki Video Games"
        description="Submit bug reports, ask questions, or get help with Play With Friends"
      />
      <div className="dark bg-game-dark min-h-screen">
        <Navigation />
        <div className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-game-light">
              Support & Bug Reports
            </h1>
            <p className="text-xl text-game-light/80 max-w-2xl mx-auto mb-6">
              Found a bug? Have a question? Need help? Submit a ticket and we'll get back to you!
            </p>
            {showNewTicket && !id && (
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <button
                  onClick={() => setTicketType('support')}
                  className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                    ticketType === 'support'
                      ? 'bg-game-accent text-game-dark'
                      : 'bg-game-dark border-2 border-game-accent/30 text-game-light hover:border-game-accent'
                  }`}
                >
                  Support Request
                </button>
                <button
                  onClick={() => setTicketType('bug_report')}
                  className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                    ticketType === 'bug_report'
                      ? 'bg-game-accent text-game-dark'
                      : 'bg-game-dark border-2 border-game-accent/30 text-game-light hover:border-game-accent'
                  }`}
                >
                  Bug Report
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-8">
            {/* Main Content Area - Only admins, owners, or link-with-token can view a ticket */}
            <div>
              {id && ticketData?.ticket ? (
                <div>
                  {ticketLoading ? (
                    <p className="text-game-light/60">Loading ticket...</p>
                  ) : (
                    <TicketView
                      ticket={ticketData.ticket}
                      onUpdate={handleTicketUpdate}
                    />
                  )}
                </div>
              ) : id && !ticketLoading && ticketData?.ticket == null ? (
                <div className="bg-game-dark border-2 border-red-500/30 rounded-lg p-8 text-center">
                  <p className="text-red-400 font-semibold mb-2">You don't have access to this ticket.</p>
                  <p className="text-game-light/80 text-sm mb-4">
                    Use the exact link you received when you created the ticket (it includes a secret token). 
                    If you're the ticket owner, make sure you're using that link or are logged in.
                  </p>
                  <button
                    onClick={() => { setShowNewTicket(true); navigate(routes.support()) }}
                    className="bg-game-accent text-game-dark px-4 py-2 rounded-lg font-semibold hover:bg-game-accent/90"
                  >
                    Back to Support
                  </button>
                </div>
              ) : showNewTicket ? (
                <div className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-6">
                  <h2 className="text-2xl font-bold mb-6 text-game-light">
                    {ticketType === 'bug_report' ? 'Report a Bug' : 'Create Support Ticket'}
                  </h2>
                  {ticketType === 'bug_report' ? (
                    <BugReportForm onSuccess={handleTicketCreated} />
                  ) : (
                    <TicketForm onSuccess={handleTicketCreated} />
                  )}
                </div>
              ) : (
                <div className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-12 text-center">
                  <p className="text-game-light/60 text-lg mb-6">
                    Create a new support ticket or bug report. You'll receive a link to track your ticket.
                  </p>
                  <button
                    onClick={() => {
                      setShowNewTicket(true)
                      navigate(routes.support())
                    }}
                    className="bg-game-accent text-game-dark px-6 py-3 rounded-lg font-bold hover:bg-game-accent/90 transition-all duration-300"
                  >
                    Create New Ticket
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default SupportPage
