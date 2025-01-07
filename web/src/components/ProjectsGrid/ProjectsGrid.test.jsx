import { render } from '@redwoodjs/testing/web'

import ProjectsGrid from './ProjectsGrid'

//   Improve this test with help from the Redwood Testing Doc:
//    https://redwoodjs.com/docs/testing#testing-components

describe('ProjectsGrid', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ProjectsGrid />)
    }).not.toThrow()
  })
})
