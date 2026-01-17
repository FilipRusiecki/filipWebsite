import { Link, routes } from '@redwoodjs/router'

const Navigation = () => {
  return (
    <nav className="bg-game-dark border-b-2 border-game-accent/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to={routes.home()} className="text-2xl font-bold text-game-accent hover:text-game-accent/80 transition-colors">
            FRVideoGames
          </Link>
          <div className="flex items-center gap-4 md:gap-6">
            <Link
              to={routes.home()}
              className="text-game-light hover:text-game-accent transition-colors font-semibold"
            >
              Home
            </Link>
            <Link
              to={routes.updates()}
              className="text-game-light hover:text-game-accent transition-colors font-semibold"
            >
              Updates
            </Link>
            <Link
              to={routes.faq()}
              className="text-game-light hover:text-game-accent transition-colors font-semibold"
            >
              FAQ
            </Link>
            <Link
              to={routes.about()}
              className="text-game-light hover:text-game-accent transition-colors font-semibold"
            >
              About
            </Link>
            <Link
              to={routes.cosmetics()}
              className="text-game-light hover:text-game-accent transition-colors font-semibold"
            >
              Cosmetics
            </Link>
            <Link
              to={routes.achievements()}
              className="text-game-light hover:text-game-accent transition-colors font-semibold"
            >
              Achievements
            </Link>
            <Link
              to={routes.support()}
              className="text-game-light hover:text-game-accent transition-colors font-semibold"
            >
              Support
            </Link>
            <a
              href="https://store.steampowered.com/app/4152100/Play_With_Friends/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-game-accent text-game-dark px-4 py-2 rounded-lg font-bold hover:bg-game-accent/90 transition-all duration-300"
            >
              Steam
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
