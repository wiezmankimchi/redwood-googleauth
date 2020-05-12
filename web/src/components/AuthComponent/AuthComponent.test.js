import { render, cleanup } from '@testing-library/react'

import AuthComponent from './AuthComponent'

describe('AuthComponent', () => {
  afterEach(() => {
    cleanup()
  })
  it('renders successfully', () => {
    expect(() => {
      render(<AuthComponent />)
    }).not.toThrow()
  })
})
