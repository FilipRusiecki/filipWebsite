import { useState, useEffect, useRef } from 'react'
import { useAuth } from 'src/auth'
import { useQuery, useMutation } from '@redwoodjs/web'
import { gql } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import { motion } from 'framer-motion'

import Navigation from 'src/components/Navigation/Navigation'
import Footer from 'src/components/Footer/Footer'

const TICKETS_QUERY = gql`
  query AdminTicketsQuery {
    tickets {
      id
      title
      description
      email
      ticketType
      status
      gameVersion
      platform
      severity
      frequency
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

const UPDATE_TICKET_STATUS = gql`
  mutation UpdateTicketStatusMutation($input: UpdateTicketStatusInput!) {
    updateTicketStatus(input: $input) {
      id
      status
      replies {
        id
        content
        isAdmin
        createdAt
      }
    }
  }
`

const ADMIN_REPLY = gql`
  mutation AdminReplyMutation($input: AdminReplyInput!) {
    adminReply(input: $input) {
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

const AdminDashboardPage = () => {
  const { isAuthenticated, currentUser, logOut, hasRole, loading: authLoading } = useAuth()
  const [selectedTicket, setSelectedTicket] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [replyContent, setReplyContent] = useState('')
  const [showReplyForm, setShowReplyForm] = useState(false)
  const hasNavigated = useRef(false)

  // Redirect if not authenticated or not admin (using useEffect to avoid render-time navigation)
  useEffect(() => {
    if (!authLoading && (!isAuthenticated || !hasRole('admin')) && !hasNavigated.current) {
      hasNavigated.current = true
      navigate(routes.adminLogin())
    }
  }, [isAuthenticated, authLoading])

  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div className="dark bg-game-dark min-h-screen flex items-center justify-center">
        <div className="text-game-light">Loading...</div>
      </div>
    )
  }

  // Don't render dashboard if not authenticated or not admin (will redirect)
  if (!isAuthenticated || !hasRole('admin')) {
    return null
  }

  const { data, loading, refetch } = useQuery(TICKETS_QUERY, {
    fetchPolicy: 'network-only', // Always fetch fresh list when viewing dashboard
  })
  const [updateStatus] = useMutation(UPDATE_TICKET_STATUS, {
    onCompleted: () => {
      refetch()
    },
  })
  const [adminReply] = useMutation(ADMIN_REPLY, {
    onCompleted: () => {
      setReplyContent('')
      setShowReplyForm(false)
      refetch()
    },
  })

  const handleStatusChange = (ticketId, newStatus) => {
    updateStatus({
      variables: {
        input: {
          id: ticketId,
          status: newStatus,
        },
      },
    })
  }

  const handleReplySubmit = (e) => {
    e.preventDefault()
    if (!replyContent.trim() || !selectedTicket) return

    adminReply({
      variables: {
        input: {
          ticketId: selectedTicket.id,
          content: replyContent.trim(),
        },
      },
    })
  }

  const filteredTickets = data?.tickets?.filter((ticket) => {
    if (statusFilter !== 'all' && ticket.status !== statusFilter) return false
    if (typeFilter !== 'all' && ticket.ticketType !== typeFilter) return false
    return true
  }) || []

  const openTickets = data?.tickets?.filter((t) => t.status === 'open').length || 0
  const bugReports = data?.tickets?.filter((t) => t.ticketType === 'bug_report').length || 0
  const supportTickets = data?.tickets?.filter((t) => t.ticketType === 'support').length || 0

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
    <>
      <Metadata title="Admin Dashboard - Filip Rusiecki Video Games" />
      <div className="dark bg-game-dark min-h-screen">
        <Navigation />
        <div className="py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-2 text-game-light">
                  Admin Dashboard
                </h1>
                <p className="text-game-light/60">Logged in as: {currentUser?.email}</p>
              </div>
              <button
                onClick={() => logOut()}
                className="bg-red-500/20 border-2 border-red-500/50 text-red-400 px-4 py-2 rounded-lg font-bold hover:bg-red-500/30 transition-all"
              >
                Logout
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-6">
                <div className="text-game-light/60 text-sm mb-1">Total Tickets</div>
                <div className="text-3xl font-bold text-game-light">
                  {data?.tickets?.length || 0}
                </div>
              </div>
              <div className="bg-game-dark border-2 border-green-500/30 rounded-lg p-6">
                <div className="text-game-light/60 text-sm mb-1">Open Tickets</div>
                <div className="text-3xl font-bold text-green-400">{openTickets}</div>
              </div>
              <div className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-6">
                <div className="text-game-light/60 text-sm mb-1">Bug Reports</div>
                <div className="text-3xl font-bold text-game-light">{bugReports}</div>
              </div>
              <div className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-6">
                <div className="text-game-light/60 text-sm mb-1">Support Tickets</div>
                <div className="text-3xl font-bold text-game-light">{supportTickets}</div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="support">Support</option>
                <option value="bug_report">Bug Reports</option>
              </select>
            </div>

            {/* Tickets List */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Ticket List */}
              <div className="lg:col-span-1">
                <div className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-6">
                  <h2 className="text-2xl font-bold text-game-light mb-4">Tickets</h2>
                  {loading ? (
                    <p className="text-game-light/60">Loading...</p>
                  ) : filteredTickets.length === 0 ? (
                    <p className="text-game-light/60">No tickets found.</p>
                  ) : (
                    <div className="space-y-3 max-h-[600px] overflow-y-auto">
                      {filteredTickets.map((ticket) => (
                        <button
                          key={ticket.id}
                          onClick={() => {
                            setSelectedTicket(ticket)
                            setShowReplyForm(false)
                          }}
                          className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                            selectedTicket?.id === ticket.id
                              ? 'border-game-accent bg-game-accent/10'
                              : 'border-game-accent/30 hover:border-game-accent/50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs">
                                  {ticket.ticketType === 'bug_report' ? '🐛' : '💬'}
                                </span>
                                <span className="text-sm font-bold text-game-light line-clamp-1">
                                  {ticket.title}
                                </span>
                              </div>
                            </div>
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold border ${getStatusColor(
                                ticket.status
                              )}`}
                            >
                              {ticket.status.replace('_', ' ')}
                            </span>
                          </div>
                          <div className="text-xs text-game-light/60">
                            #{ticket.id} • {new Date(ticket.createdAt).toLocaleDateString()}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Ticket Detail */}
              <div className="lg:col-span-2">
                {selectedTicket ? (
                  <div className="space-y-6">
                    {/* Ticket Info */}
                    <div className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-game-accent/20 text-game-accent border border-game-accent/50">
                              {selectedTicket.ticketType === 'bug_report' ? '🐛 Bug Report' : '💬 Support'}
                            </span>
                            <h2 className="text-2xl font-bold text-game-light">
                              {selectedTicket.title}
                            </h2>
                          </div>
                          <div className="text-sm text-game-light/60 mb-4">
                            <span>ID: #{selectedTicket.id}</span>
                            <span className="mx-2">•</span>
                            <span>Created: {new Date(selectedTicket.createdAt).toLocaleString()}</span>
                            {selectedTicket.email && (
                              <>
                                <span className="mx-2">•</span>
                                <span>Email: {selectedTicket.email}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <select
                          value={selectedTicket.status}
                          onChange={(e) =>
                            handleStatusChange(selectedTicket.id, e.target.value)
                          }
                          className={`px-4 py-2 rounded-lg text-sm font-semibold border-2 ${getStatusColor(
                            selectedTicket.status
                          )} bg-transparent`}
                        >
                          <option value="open">Open</option>
                          <option value="in_progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>

                      {/* Bug Report Details */}
                      {selectedTicket.ticketType === 'bug_report' &&
                        (selectedTicket.platform ||
                          selectedTicket.gameVersion ||
                          selectedTicket.severity ||
                          selectedTicket.frequency) && (
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                            {selectedTicket.platform && (
                              <div>
                                <span className="text-game-light/60">Platform:</span>
                                <span className="text-game-light ml-2 font-semibold">
                                  {selectedTicket.platform}
                                </span>
                              </div>
                            )}
                            {selectedTicket.gameVersion && (
                              <div>
                                <span className="text-game-light/60">Version:</span>
                                <span className="text-game-light ml-2 font-semibold">
                                  {selectedTicket.gameVersion}
                                </span>
                              </div>
                            )}
                            {selectedTicket.severity && (
                              <div>
                                <span className="text-game-light/60">Severity:</span>
                                <span className="text-game-light ml-2 font-semibold">
                                  {selectedTicket.severity}
                                </span>
                              </div>
                            )}
                            {selectedTicket.frequency && (
                              <div>
                                <span className="text-game-light/60">Frequency:</span>
                                <span className="text-game-light ml-2 font-semibold">
                                  {selectedTicket.frequency}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                      <div className="bg-game-dark border border-game-accent/20 rounded-lg p-4 mb-4">
                        <p className="text-game-light whitespace-pre-wrap leading-relaxed">
                          {selectedTicket.description}
                        </p>
                      </div>
                    </div>

                    {/* Replies */}
                    <div className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-6">
                      <h3 className="text-xl font-bold text-game-light mb-4">
                        Replies ({selectedTicket.replies?.length || 0})
                      </h3>
                      <div className="space-y-4 mb-6">
                        {selectedTicket.replies && selectedTicket.replies.length > 0 ? (
                          selectedTicket.replies.map((reply) => (
                            <div
                              key={reply.id}
                              className={`border-2 rounded-lg p-4 ${
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
                                  {reply.isAdmin ? '👤 Admin' : '👤 User'}
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
                          <p className="text-game-light/60 text-center py-4">No replies yet.</p>
                        )}
                      </div>

                      {/* Admin Reply Form */}
                      {!showReplyForm ? (
                        <button
                          onClick={() => setShowReplyForm(true)}
                          className="w-full bg-game-accent text-game-dark px-6 py-3 rounded-lg font-bold hover:bg-game-accent/90 transition-all duration-300"
                        >
                          Add Admin Reply
                        </button>
                      ) : (
                        <form onSubmit={handleReplySubmit} className="space-y-4">
                          <div>
                            <label
                              htmlFor="adminReply"
                              className="block text-game-light font-semibold mb-2"
                            >
                              Your Reply
                            </label>
                            <textarea
                              id="adminReply"
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              rows={4}
                              className="w-full px-4 py-3 bg-game-dark border-2 border-game-accent/30 rounded-lg text-game-light focus:border-game-accent focus:outline-none transition-colors resize-none"
                              placeholder="Type your response here..."
                              required
                            />
                          </div>
                          <div className="flex gap-4">
                            <button
                              type="submit"
                              className="flex-1 bg-game-accent text-game-dark px-6 py-3 rounded-lg font-bold hover:bg-game-accent/90 transition-all duration-300"
                            >
                              Send Reply
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
                ) : (
                  <div className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-12 text-center">
                    <p className="text-game-light/60 text-lg">
                      Select a ticket from the list to view details and respond.
                    </p>
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

export default AdminDashboardPage
