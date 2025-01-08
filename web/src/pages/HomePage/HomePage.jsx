import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

import AppBanner from 'src/components/AppBanner/AppBanner'
import Contact from 'src/components/Contact/Contact'
import Projects from 'src/components/Projects/Projects'
const HomePage = () => {
  return (
    <>
      <div className="container mx-auto">
        <AppBanner></AppBanner>
        <Projects></Projects>
        <Contact></Contact>

        {/* <ProjectsProvider>
				<ProjectsGrid></ProjectsGrid>
			</ProjectsProvider> */}
      </div>
    </>
  )
}

export default HomePage
