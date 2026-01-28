import { useEffect } from 'react'
import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'
import { AuthProvider } from 'src/auth'

import FatalErrorPage from 'src/pages/FatalErrorPage'

import './index.css'

const App = ({ children }) => {
  // Ensure dark mode is always enabled
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  return (
    <FatalErrorBoundary page={FatalErrorPage}>
      <RedwoodProvider titleTemplate="Filip Rusiecki Video Games">
        <AuthProvider>
          <RedwoodApolloProvider>{children}</RedwoodApolloProvider>
        </AuthProvider>
      </RedwoodProvider>
    </FatalErrorBoundary>
  )
}

export default App
