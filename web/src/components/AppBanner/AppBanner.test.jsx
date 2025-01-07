import { render } from '@redwoodjs/testing/web'

import AppBanner from './AppBanner'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('AppBanner', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AppBanner />)
    }).not.toThrow()
  })
})
