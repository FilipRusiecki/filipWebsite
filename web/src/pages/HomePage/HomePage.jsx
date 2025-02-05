import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import AppBanner from 'src/components/AppBanner/AppBanner'
import Button from 'src/components/Button/Button'
import Contact from 'src/components/Contact/Contact'
import Projects from 'src/components/Projects/Projects'

const HomePage = () => {
  return (
    <div className="">
      <div className="container mx-auto">
        <AppBanner></AppBanner>
        <Projects></Projects>
        <Contact></Contact>

        {/* <ProjectsProvider>
				<ProjectsGrid></ProjectsGrid>
			</ProjectsProvider> */}
      </div>
    </div>
  )
}

export default HomePage
