import { render, cleanup } from '@testing-library/react'

import BaseLayout from './BaseLayout'

describe('BaseLayout', () => {
  afterEach(() => {
    cleanup()
  })
  it('renders successfully', () => {
    expect(() => {
      render(<BaseLayout />)
    }).not.toThrow()
  })
})
