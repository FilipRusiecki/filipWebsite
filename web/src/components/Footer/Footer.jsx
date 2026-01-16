import { Link, routes } from '@redwoodjs/router'

const Footer = () => {
  return (
    <footer className="bg-game-dark border-t-2 border-game-accent/30 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-game-light/60 text-sm">
            © {new Date().getFullYear()} FRVideoGames. All rights reserved.
          </div>
          <div className="flex items-center gap-4 md:gap-6 flex-wrap justify-center">
            <a
              href="https://discord.gg/QgUmqpKvWJ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-game-light/60 hover:text-game-accent transition-colors text-sm"
              title="Discord"
            >
              Discord
            </a>
            <a
              href="https://www.instagram.com/fr_videogames/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-game-light/60 hover:text-game-accent transition-colors text-sm"
              title="Instagram"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@filip.r.videogames"
              target="_blank"
              rel="noopener noreferrer"
              className="text-game-light/60 hover:text-game-accent transition-colors text-sm"
              title="TikTok"
            >
              TikTok
            </a>
            <a
              href="#"
              className="text-game-light/40 hover:text-game-light/60 transition-colors text-sm cursor-not-allowed"
              title="X (Twitter) - Coming Soon"
              onClick={(e) => e.preventDefault()}
            >
              X (Twitter)
            </a>
            <a
              href="#"
              className="text-game-light/40 hover:text-game-light/60 transition-colors text-sm cursor-not-allowed"
              title="Reddit - Coming Soon"
              onClick={(e) => e.preventDefault()}
            >
              Reddit
            </a>
            <a
              href="https://store.steampowered.com/app/4152100/Play_With_Friends/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-game-light/60 hover:text-game-accent transition-colors text-sm"
            >
              Steam
            </a>
            <Link
              to={routes.support()}
              className="text-game-light/60 hover:text-game-accent transition-colors text-sm"
            >
              Support
            </Link>
          </div>
        </div>
        <div className="mt-4 text-center text-game-light/40 text-xs">
          Early Access planned for early 2026
        </div>
      </div>
    </footer>
  )
}

export default Footer
