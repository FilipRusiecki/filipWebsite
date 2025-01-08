import { render } from '@redwoodjs/testing/web'

import Contact from './Contact'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Contact', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Contact />)
    }).not.toThrow()
  })
})
