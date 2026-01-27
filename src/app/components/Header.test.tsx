import { render, screen } from '@testing-library/react'
import Header from './Header'

describe('Header Component', () => {
  it('devrait afficher le titre TodoApp', () => {
    render(<Header />)
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent('TodoApp')
  })

  it('devrait afficher le sous-titre', () => {
    render(<Header />)
    const subtitle = screen.getByText('Minimal, sécurisé, efficace')
    expect(subtitle).toBeInTheDocument()
  })

  it('devrait avoir une icône SVG', () => {
    const { container } = render(<Header />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('devrait afficher "App" en bleu', () => {
    render(<Header />)
    const blueText = screen.getByText('App')
    expect(blueText).toHaveClass('text-blue-600')
  })
})
