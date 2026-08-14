import { useState } from 'react'

const getTicketUrl = () => {
  if (typeof window === 'undefined') return ''
  return window.location.href
}

const isMac = () =>
  typeof navigator !== 'undefined' &&
  /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent)

const SaveTicketAccess = ({ ticketId }) => {
  const [copied, setCopied] = useState(false)
  const [shared, setShared] = useState(false)
  const [showBookmarkHow, setShowBookmarkHow] = useState(true)
  const [downloaded, setDownloaded] = useState(false)

  const url = getTicketUrl()
  const shortcut = isMac() ? '⌘ + D' : 'Ctrl + D'
  const canShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function'

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
    } catch {
      window.prompt('Copy this ticket link:', url)
      setCopied(true)
    }
  }

  const shareLink = async () => {
    try {
      await navigator.share({
        title: `FRVG ticket #${ticketId}`,
        text: 'My support ticket — I need this link to check replies.',
        url,
      })
      setShared(true)
    } catch {
      // user cancelled
    }
  }

  const downloadShortcut = () => {
    const body = `[InternetShortcut]\r\nURL=${url}\r\n`
    const blob = new Blob([body], { type: 'application/internet-shortcut' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `FRVG-ticket-${ticketId}.url`
    a.click()
    URL.revokeObjectURL(a.href)
    setDownloaded(true)
  }

  return (
    <div className="rounded-lg border-2 border-game-accent bg-game-accent/20 p-5 md:p-6">
      <p className="text-game-accent text-xs font-bold tracking-[0.18em] uppercase mb-2">
        Keep this page
      </p>
      <h3 className="text-xl md:text-2xl font-bold text-game-light mb-2">
        Save this page or you will lose this ticket
      </h3>
      <p className="text-game-light/80 text-sm md:text-base mb-4 max-w-2xl">
        There is no login. Copying once is not enough if you close the tab. Bookmark it, download
        a shortcut, or paste the link into Notes / email.
      </p>
      <p className="text-sm font-semibold text-red-400/90 mb-4">
        Do not share this ticket link with anyone. Anyone with the link can see and reply to this
        ticket.
      </p>

      <div className="bg-game-dark/70 border border-game-accent/30 rounded-lg px-3 py-2 mb-4 break-all font-mono text-xs text-game-accent">
        {url || 'Loading link…'}
      </div>

      <div className="flex flex-col sm:flex-row flex-wrap gap-3">
        <button
          type="button"
          onClick={copyLink}
          className="bg-game-accent text-game-dark px-6 py-3.5 rounded-lg text-base font-bold hover:brightness-110"
        >
          {copied ? 'Copied — now save it somewhere' : 'Copy my ticket link'}
        </button>
        <button
          type="button"
          onClick={() => setShowBookmarkHow((open) => !open)}
          className="border-2 border-game-accent text-game-light px-6 py-3.5 rounded-lg text-base font-bold hover:bg-game-accent/10"
        >
          How to bookmark
        </button>
        {canShare && (
          <button
            type="button"
            onClick={shareLink}
            className="border-2 border-game-accent/50 text-game-light px-6 py-3.5 rounded-lg text-base font-bold hover:bg-game-accent/10"
          >
            {shared ? 'Shared — keep this page too' : 'Send to myself'}
          </button>
        )}
        <button
          type="button"
          onClick={downloadShortcut}
          className="border-2 border-game-accent/50 text-game-light px-6 py-3.5 rounded-lg text-base font-bold hover:bg-game-accent/10"
        >
          {downloaded ? 'Shortcut downloaded' : 'Download shortcut'}
        </button>
      </div>

      {copied && (
        <p className="mt-3 text-sm font-semibold text-game-accent">
          Link is on your clipboard. Paste it into Notes, email, or Discord so you can find it later.
          These buttons stay here.
        </p>
      )}

      {showBookmarkHow && (
        <div className="mt-5 rounded-lg bg-game-dark/80 border border-game-accent/40 p-4 space-y-2">
          <p className="text-game-light font-semibold">Bookmark this page now</p>
          <p className="text-2xl font-bold text-game-accent tracking-wide">{shortcut}</p>
          <p className="text-sm text-game-light/70">
            That saves this exact ticket link in your browser. Websites cannot press it for you.
          </p>
        </div>
      )}
    </div>
  )
}

export default SaveTicketAccess
