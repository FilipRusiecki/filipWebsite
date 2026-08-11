import { useState } from 'react'
import { Link, routes } from '@redwoodjs/router'

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-game-dark/90 backdrop-blur-md border-b border-game-accent/30 sticky top-0 z-50">
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
              to={routes.support()}
              className="text-game-light hover:text-game-accent transition-colors font-semibold text-sm xl:text-base"
            >
              Support
            </Link>
            <Link
              to={routes.businessEnquiry()}
              className="relative group overflow-hidden border border-game-accent/60 text-game-accent px-3.5 xl:px-4 py-1.5 rounded-lg font-bold text-sm xl:text-base transition-all duration-300 hover:border-game-accent hover:text-game-dark hover:scale-[1.03] hover:shadow-[0_0_24px_-4px_rgba(209,173,74,0.55)]"
            >
              <span
                className="pointer-events-none absolute inset-0 -translate-x-full bg-game-accent transition-transform duration-300 ease-out group-hover:translate-x-0"
                aria-hidden="true"
              />
              <span className="relative z-10">Business</span>
            </Link>
            <a
              href="https://store.steampowered.com/app/4152100/Play_With_Friends/"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden bg-game-accent text-game-dark px-3.5 xl:px-5 py-1.5 rounded-lg font-bold text-sm xl:text-base transition-all duration-300 hover:scale-[1.04] shadow-[0_0_20px_-4px_rgba(209,173,74,0.45)] hover:shadow-[0_0_32px_-2px_rgba(209,173,74,0.7)] hover:brightness-110"
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
                to={routes.support()}
                onClick={() => setIsMenuOpen(false)}
                className="text-game-light hover:text-game-accent transition-colors font-semibold py-2 px-4"
              >
                Support
              </Link>
              <Link
                to={routes.businessEnquiry()}
                onClick={() => setIsMenuOpen(false)}
                className="relative group overflow-hidden mx-4 mt-1 border border-game-accent/60 text-game-accent text-center py-2.5 rounded-lg font-bold transition-all duration-300 hover:border-game-accent hover:text-game-dark"
              >
                <span
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-game-accent transition-transform duration-300 ease-out group-hover:translate-x-0"
                  aria-hidden="true"
                />
                <span className="relative z-10">Business</span>
              </Link>
              <a
                href="https://store.steampowered.com/app/4152100/Play_With_Friends/"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-4 bg-game-accent text-game-dark py-2.5 rounded-lg font-bold text-center transition-all duration-300 shadow-[0_0_20px_-4px_rgba(209,173,74,0.45)] hover:shadow-[0_0_28px_-2px_rgba(209,173,74,0.65)] hover:brightness-110"
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
