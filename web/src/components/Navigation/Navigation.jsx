import { useState } from 'react'
import { Link, routes } from '@redwoodjs/router'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-game-dark border-b-2 border-game-accent/30 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to={routes.home()}
            className="text-xl md:text-2xl font-bold text-game-accent hover:text-game-accent/80 transition-colors"
          >
            Filip Rusiecki Video Games
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            <Link
              to={routes.home()}
              className="text-game-light hover:text-game-accent transition-colors font-semibold text-sm xl:text-base"
            >
              Home
            </Link>
            <Link
              to={routes.updates()}
              className="text-game-light hover:text-game-accent transition-colors font-semibold text-sm xl:text-base"
            >
              Updates
            </Link>
            <Link
              to={routes.faq()}
              className="text-game-light hover:text-game-accent transition-colors font-semibold text-sm xl:text-base"
            >
              FAQ
            </Link>
            <Link
              to={routes.about()}
              className="text-game-light hover:text-game-accent transition-colors font-semibold text-sm xl:text-base"
            >
              About
            </Link>
            <Link
              to={routes.cosmetics()}
              className="text-game-light hover:text-game-accent transition-colors font-semibold text-sm xl:text-base"
            >
              Cosmetics
            </Link>
            <Link
              to={routes.achievements()}
              className="text-game-light hover:text-game-accent transition-colors font-semibold text-sm xl:text-base"
            >
              Achievements
            </Link>
            <Link
              to={routes.support()}
              className="text-game-light hover:text-game-accent transition-colors font-semibold text-sm xl:text-base"
            >
              Support
            </Link>
            <a
              href="https://store.steampowered.com/app/4152100/Play_With_Friends/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-game-accent text-game-dark px-3 xl:px-4 py-2 rounded-lg font-bold hover:bg-game-accent/90 transition-all duration-300 text-sm xl:text-base"
            >
              Steam
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-game-light hover:text-game-accent transition-colors p-2"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t-2 border-game-accent/30 py-4">
            <div className="flex flex-col gap-3">
              <Link
                to={routes.home()}
                onClick={() => setIsMenuOpen(false)}
                className="text-game-light hover:text-game-accent transition-colors font-semibold py-2 px-4"
              >
                Home
              </Link>
              <Link
                to={routes.updates()}
                onClick={() => setIsMenuOpen(false)}
                className="text-game-light hover:text-game-accent transition-colors font-semibold py-2 px-4"
              >
                Updates
              </Link>
              <Link
                to={routes.faq()}
                onClick={() => setIsMenuOpen(false)}
                className="text-game-light hover:text-game-accent transition-colors font-semibold py-2 px-4"
              >
                FAQ
              </Link>
              <Link
                to={routes.about()}
                onClick={() => setIsMenuOpen(false)}
                className="text-game-light hover:text-game-accent transition-colors font-semibold py-2 px-4"
              >
                About
              </Link>
              <Link
                to={routes.cosmetics()}
                onClick={() => setIsMenuOpen(false)}
                className="text-game-light hover:text-game-accent transition-colors font-semibold py-2 px-4"
              >
                Cosmetics
              </Link>
              <Link
                to={routes.achievements()}
                onClick={() => setIsMenuOpen(false)}
                className="text-game-light hover:text-game-accent transition-colors font-semibold py-2 px-4"
              >
                Achievements
              </Link>
              <Link
                to={routes.support()}
                onClick={() => setIsMenuOpen(false)}
                className="text-game-light hover:text-game-accent transition-colors font-semibold py-2 px-4"
              >
                Support
              </Link>
              <a
                href="https://store.steampowered.com/app/4152100/Play_With_Friends/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-game-accent text-game-dark px-4 py-2 rounded-lg font-bold hover:bg-game-accent/90 transition-all duration-300 text-center mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Steam
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
