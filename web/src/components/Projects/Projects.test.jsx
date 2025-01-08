import { render } from '@redwoodjs/testing/web'

import Projects from './Projects'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('Projects', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Projects />)
    }).not.toThrow()
  })
})
