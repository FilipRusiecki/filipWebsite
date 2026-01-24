import { Link } from '@redwoodjs/router'
import { routes } from '@redwoodjs/router'

const TicketList = ({ tickets }) => {
  if (!tickets || tickets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-game-light/60 text-lg">No tickets found.</p>
      </div>
    )
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
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <Link
          key={ticket.id}
          to={routes.support({ id: ticket.id })}
          className="block bg-game-dark border-2 border-game-accent/30 rounded-lg p-6 hover:border-game-accent transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-semibold text-game-accent">
                  {ticket.ticketType === 'bug_report' ? '🐛' : '💬'}
                </span>
                <h3 className="text-xl font-bold text-game-light">{ticket.title}</h3>
              </div>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${getStatusColor(
                ticket.status
              )}`}
            >
              {ticket.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>
          <p className="text-game-light/70 mb-3 line-clamp-2">{ticket.description}</p>
          <div className="flex items-center justify-between text-sm text-game-light/60">
            <span>ID: #{ticket.id}</span>
            <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
          </div>
          {ticket.replies && ticket.replies.length > 0 && (
            <div className="mt-3 text-sm text-game-accent">
              {ticket.replies.length} {ticket.replies.length === 1 ? 'reply' : 'replies'}
            </div>
          )}
        </Link>
      ))}
    </div>
  )
}

export default TicketList
