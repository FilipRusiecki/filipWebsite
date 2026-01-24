// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route, PrivateSet } from '@redwoodjs/router'
import { useAuth } from 'src/auth'

const Routes = () => {
  return (
    <Router useAuth={useAuth}>
      <Route path="/" page={HomePage} name="home" />
      <Route path="/updates" page={UpdatesPage} name="updates" />
      <Route path="/faq" page={FAQPage} name="faq" />
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/cosmetics" page={CosmeticsPage} name="cosmetics" />
      <Route path="/achievements" page={AchievementsPage} name="achievements" />
      <Route path="/support" page={SupportPage} name="support" />
      <Route path="/support/{id:Int}" page={SupportPage} name="supportTicket" />
      <Route path="/verify-email" page={VerifyEmailPage} name="verifyEmail" />
      <Route path="/admin/login" page={AdminLoginPage} name="adminLogin" />
      <PrivateSet unauthenticated="adminLogin" whileLoadingAuth={() => <div className="dark bg-game-dark min-h-screen flex items-center justify-center"><div className="text-game-light">Loading...</div></div>} role="admin">
        <Route path="/admin/dashboard" page={AdminDashboardPage} name="adminDashboard" />
      </PrivateSet>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
