import { render } from '@redwoodjs/testing/web'

import SplashPage from './SplashPage'

//   Improve this test with help from the Redwood Testing Doc:
//   https://redwoodjs.com/docs/testing#testing-pages-layouts

describe('SplashPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SplashPage />)
    }).not.toThrow()
  })
})
