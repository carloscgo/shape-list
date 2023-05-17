import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import App from '../src/App'
import { describe, test, expect } from 'vitest'

describe('', () => {
  test('renders', () => {
    render(<App />)

    const alertText = screen.getByText('Vite + React')

    expect(alertText).toBeInTheDocument()

    cleanup()
  })
})
