import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'


import AppBanner from 'src/components/AppBanner/AppBanner';



const HomePage = () => {
  return (
    <>
	  <div className="container mx-auto ">
			<AppBanner></AppBanner>

			{/* <ProjectsProvider>
				<ProjectsGrid></ProjectsGrid>
			</ProjectsProvider> */}

			<div className="mt-8 sm:mt-10 flex justify-center">
				<Link
					to="/projects"
					className="font-general-medium flex items-center px-6 py-3 rounded-lg shadow-lg hover:shadow-xl bg-indigo-500 hover:bg-indigo-600 focus:ring-1 focus:ring-indigo-900 text-white text-lg sm:text-xl duration-300"
					aria-label="More Projects"
				>
					{/* <Button title="More Projects" /> */}
				</Link>
			</div>
		</div>
    </>
  )
}

export default HomePage

