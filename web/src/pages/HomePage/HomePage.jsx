import { Metadata } from '@redwoodjs/web'

import Navigation from 'src/components/Navigation/Navigation'
import Footer from 'src/components/Footer/Footer'
import Hero from 'src/components/Hero/Hero'
import StorySection from 'src/components/StorySection/StorySection'
import FeaturesSection from 'src/components/FeaturesSection/FeaturesSection'
import ScreenshotGallery from 'src/components/ScreenshotGallery/ScreenshotGallery'
import RecentUpdateSummary from 'src/components/RecentUpdateSummary/RecentUpdateSummary'
import WishlistCTA from 'src/components/WishlistCTA/WishlistCTA'
import EarlyAccessInfo from 'src/components/EarlyAccessInfo/EarlyAccessInfo'
import MatureContentNotice from 'src/components/MatureContentNotice/MatureContentNotice'

const HomePage = () => {
  return (
    <>
      <Metadata
        title="Filip Rusiecki Video Games - Play With Friends"
        description="A retro-style, co-op rogue-like where death matters. Play with up to 5 players, laugh through disasters, and survive the apocalypse together."
        ogUrl="https://store.steampowered.com/app/4152100/Play_With_Friends/"
      />
      <div className="dark bg-game-dark min-h-screen">
        <Navigation />
        <Hero />
        <RecentUpdateSummary />
        <StorySection />
        <FeaturesSection />
        <ScreenshotGallery />
        <WishlistCTA />
        <EarlyAccessInfo />
        <MatureContentNotice />
        <Footer />
      </div>
    </>
  )
}

export default HomePage
