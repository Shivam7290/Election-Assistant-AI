import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(document.querySelector('#root') || document.body).toBeTruthy()
  })

  it('renders main content', () => {
    render(<App />)
    expect(document.querySelector('main')).toBeTruthy()
  })

  it('renders hero section', () => {
    render(<App />)
    expect(document.querySelector('#hero')).toBeTruthy()
  })
})
