import { useState } from 'react'
import { Metadata } from '@redwoodjs/web'
import { motion } from 'framer-motion'

import Navigation from 'src/components/Navigation/Navigation'
import Footer from 'src/components/Footer/Footer'

const CosmeticsPage = () => {
  const [activeTab, setActiveTab] = useState('colors')

  // Generate image paths for each category
  const colors = Array.from({ length: 11 }, (_, i) => ({
    id: i + 1,
    name: `Color ${i + 1}`,
    image: `/images/cosmetics/colours/color${i + 1}.png`,
  }))

  const hats = Array.from({ length: 17 }, (_, i) => ({
    id: i + 1,
    name: `Hat ${i + 1}`,
    image: `/images/cosmetics/hats/hat${i + 1}.png`,
  }))

  const backAccessories = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: `Back Accessory ${i + 1}`,
    image: `/images/cosmetics/backaccesorries/back${i + 1}.png`,
  }))

  const auras = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Aura ${i + 1}`,
    image: `/images/cosmetics/aura/arua${i + 1}.png`,
  }))

  const tabs = [
    { id: 'colors', label: 'Colors', count: colors.length },
    { id: 'hats', label: 'Hats', count: hats.length },
    { id: 'backAccessories', label: 'Back Accessories', count: backAccessories.length },
    { id: 'auras', label: 'Auras', count: auras.length },
  ]

  const getActiveItems = () => {
    switch (activeTab) {
      case 'colors':
        return colors
      case 'hats':
        return hats
      case 'backAccessories':
        return backAccessories
      case 'auras':
        return auras
      default:
        return colors
    }
  }

  return (
    <>
      <Metadata
        title="Cosmetics - FRVideoGames"
        description="Browse all available cosmetics including colors, hats, back accessories, and auras for Play With Friends"
      />
      <div className="dark bg-game-dark min-h-screen">
        <Navigation />
        <div className="py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-game-light">
                Cosmetics
              </h1>
              <p className="text-xl text-game-light/80 max-w-2xl mx-auto">
                Customize your character with a variety of colors, hats, back accessories, and auras
              </p>
            </motion.div>

            {/* Tabs */}
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-game-accent text-game-dark'
                      : 'bg-game-dark border-2 border-game-accent/30 text-game-light hover:border-game-accent'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* Coming Soon Message */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <p className="text-game-accent text-lg md:text-xl font-semibold">
                Way more coming soon!... This is just the start 🎮
              </p>
            </motion.div>

            {/* Items Grid */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {getActiveItems().map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="bg-game-dark border-2 border-game-accent/30 rounded-lg p-8 hover:border-game-accent transition-all duration-300 group flex flex-col"
                >
                  <div className="aspect-square mb-6 bg-game-dark rounded-lg overflow-hidden flex items-center justify-center min-h-[280px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-w-full max-h-full w-auto h-auto object-contain group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.innerHTML =
                          '<div class="w-full h-full flex items-center justify-center text-game-light/40 text-sm">Image not found</div>'
                      }}
                    />
                  </div>
                  <p className="text-game-light text-lg text-center font-semibold mt-auto">
                    {item.name}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default CosmeticsPage
