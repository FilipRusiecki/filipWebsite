import { useState, useEffect } from 'react'
import { useQuery } from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'
import { Metadata } from '@redwoodjs/web'
import { useParams, navigate, routes } from '@redwoodjs/router'

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
  query TicketQuery($id: Int!) {
    ticket(id: $id) {
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

const SupportPage = () => {
  const { id } = useParams()
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
          variables: { id: id ? parseInt(id, 10) : null },
          skip: !id || isNaN(parseInt(id, 10)),
          errorPolicy: 'all', // Don't throw on error
          fetchPolicy: 'cache-and-network', // Try cache first
        }
      )

  const handleTicketCreated = () => {
    setShowNewTicket(false)
    refetchTickets()
    navigate(routes.support())
  }

  const handleTicketUpdate = (updatedTicket) => {
    refetchTicket()
    refetchTickets()
  }

  return (
    <>
      <Metadata
        title="Support - FRVideoGames"
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
            {/* Main Content Area - Public users can only create tickets or view their own ticket by ID */}
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
