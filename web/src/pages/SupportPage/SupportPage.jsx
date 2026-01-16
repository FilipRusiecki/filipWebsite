import { useState, useEffect } from 'react'
import { useQuery } from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'
import { Metadata } from '@redwoodjs/web'
import { useParams, navigate, routes } from '@redwoodjs/router'

import Navigation from 'src/components/Navigation/Navigation'
import Footer from 'src/components/Footer/Footer'
import TicketForm from 'src/components/TicketForm/TicketForm'
import TicketList from 'src/components/TicketList/TicketList'
import TicketView from 'src/components/TicketView/TicketView'

const TICKETS_QUERY = gql`
  query TicketsQuery {
    tickets {
      id
      title
      description
      email
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

const SupportPage = () => {
  const { id } = useParams()
  const [showNewTicket, setShowNewTicket] = useState(!id)

  useEffect(() => {
    setShowNewTicket(!id)
  }, [id])

  const { data: ticketsData, loading: ticketsLoading, refetch: refetchTickets } = useQuery(
    TICKETS_QUERY,
    { skip: !!id }
  )

  const { data: ticketData, loading: ticketLoading, refetch: refetchTicket } = useQuery(
    TICKET_QUERY,
    {
      variables: { id: id ? parseInt(id, 10) : null },
      skip: !id || isNaN(parseInt(id, 10)),
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
            <p className="text-xl text-game-light/80 max-w-2xl mx-auto">
              Found a bug? Have a question? Need help? Submit a ticket and we'll get back to you!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Sidebar - Ticket List */}
            <div className="lg:col-span-1">
              <div className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-game-light">Tickets</h2>
                  <button
                    onClick={() => {
                      setShowNewTicket(true)
                      navigate(routes.support())
                    }}
                    className="bg-game-accent text-game-dark px-4 py-2 rounded-lg font-bold hover:bg-game-accent/90 transition-all duration-300 text-sm"
                  >
                    + New
                  </button>
                </div>
                {ticketsLoading ? (
                  <p className="text-game-light/60">Loading tickets...</p>
                ) : (
                  <TicketList tickets={ticketsData?.tickets || []} />
                )}
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2">
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
                  <h2 className="text-2xl font-bold mb-6 text-game-light">Create New Ticket</h2>
                  <TicketForm onSuccess={handleTicketCreated} />
                </div>
              ) : (
                <div className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-12 text-center">
                  <p className="text-game-light/60 text-lg mb-6">
                    Select a ticket from the list to view details, or create a new ticket.
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
