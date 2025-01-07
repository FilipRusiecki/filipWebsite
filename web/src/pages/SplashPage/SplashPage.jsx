// import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const SplashPage = () => {
  return (
    <>
      <Metadata title="Splash" description="Splash page" />

      <h1>SplashPage</h1>
      <p>
        Find me in <code>./web/src/pages/SplashPage/SplashPage.jsx</code>
      </p>
      {/*
           My default route is named `splash`, link to me with:
           `<Link to={routes.splash()}>Splash</Link>`
        */}
    </>
  )
}

export default SplashPage
