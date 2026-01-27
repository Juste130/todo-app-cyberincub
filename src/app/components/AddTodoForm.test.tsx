import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import AddTodoForm from './AddTodoForm'

describe('AddTodoForm Component', () => {
  it('devrait rendre le formulaire avec un input', () => {
    const mockOnAdd = jest.fn()
    render(<AddTodoForm onAdd={mockOnAdd} />)
    
    const input = screen.getByPlaceholderText(/Ex: Configurer le pipeline CI\/CD/i)
    expect(input).toBeInTheDocument()
  })

  it('devrait afficher un bouton de soumission', () => {
    const mockOnAdd = jest.fn()
    render(<AddTodoForm onAdd={mockOnAdd} />)
    
    const button = screen.getByRole('button', { name: /^Ajouter$|^⨁$/ })
    expect(button).toBeInTheDocument()
  })

  it('devrait appeler onAdd quand le formulaire est soumis avec du texte', async () => {
    const mockOnAdd = jest.fn()
    render(<AddTodoForm onAdd={mockOnAdd} />)
    
    const input = screen.getByPlaceholderText(/Ex: Configurer le pipeline CI\/CD/i)
    const button = screen.getByRole('button')
    
    fireEvent.change(input, { target: { value: 'Nouvelle tâche' } })
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith('Nouvelle tâche')
    })
  })

  it('devrait vider l\'input après la soumission', async () => {
    const mockOnAdd = jest.fn()
    render(<AddTodoForm onAdd={mockOnAdd} />)
    
    const input = screen.getByPlaceholderText(/Ex: Configurer le pipeline CI\/CD/i) as HTMLInputElement
    const button = screen.getByRole('button')
    
    fireEvent.change(input, { target: { value: 'Nouvelle tâche' } })
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(input.value).toBe('')
    })
  })

  it('ne devrait pas appeler onAdd si l\'input est vide', () => {
    const mockOnAdd = jest.fn()
    render(<AddTodoForm onAdd={mockOnAdd} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(mockOnAdd).not.toHaveBeenCalled()
  })

  it('devrait désactiver le bouton si l\'input est vide', () => {
    const mockOnAdd = jest.fn()
    render(<AddTodoForm onAdd={mockOnAdd} />)
    
    const button = screen.getByRole('button') as HTMLButtonElement
    expect(button).toBeDisabled()
  })

  it('devrait activer le bouton quand du texte est saisi', () => {
    const mockOnAdd = jest.fn()
    render(<AddTodoForm onAdd={mockOnAdd} />)
    
    const input = screen.getByPlaceholderText(/Ex: Configurer le pipeline CI\/CD/i)
    const button = screen.getByRole('button') as HTMLButtonElement
    
    fireEvent.change(input, { target: { value: 'Texte' } })
    expect(button).not.toBeDisabled()
  })

  it('devrait respirer l\'entrée utilisateur (trim)', async () => {
    const mockOnAdd = jest.fn()
    render(<AddTodoForm onAdd={mockOnAdd} />)
    
    const input = screen.getByPlaceholderText(/Ex: Configurer le pipeline CI\/CD/i)
    const button = screen.getByRole('button')
    
    fireEvent.change(input, { target: { value: '  Nouvelle tâche  ' } })
    fireEvent.click(button)
    
    await waitFor(() => {
      expect(mockOnAdd).toHaveBeenCalledWith('Nouvelle tâche')
    })
  })
})
