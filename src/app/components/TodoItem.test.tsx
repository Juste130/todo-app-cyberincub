import { render, screen, fireEvent } from '@testing-library/react'
import TodoItem from './TodoItem'
import { Todo } from '@/app/page'

describe('TodoItem Component', () => {
  const mockTodo: Todo = {
    id: '1',
    text: 'Tâche test',
    completed: false,
    createdAt: new Date('2026-01-27'),
  }

  const mockOnToggle = jest.fn()
  const mockOnDelete = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('devrait afficher le texte du todo', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )
    expect(screen.getByText('Tâche test')).toBeInTheDocument()
  })

  it('devrait afficher la date au format français', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )
    expect(screen.getByText(/Ajouté le/i)).toBeInTheDocument()
  })

  it('devrait appeler onToggle quand on clique sur le checkbox', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )
    const checkbox = screen.getByRole('button', { name: /Marquer comme terminée/i })
    fireEvent.click(checkbox)
    expect(mockOnToggle).toHaveBeenCalledWith('1')
  })

  it('devrait appeler onDelete quand on clique sur le bouton supprimer', () => {
    render(
      <TodoItem
        todo={mockTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )
    const deleteButton = screen.getByLabelText('Supprimer')
    fireEvent.click(deleteButton)
    expect(mockOnDelete).toHaveBeenCalledWith('1')
  })

  it('devrait montrer le texte barré quand le todo est complété', () => {
    const completedTodo: Todo = { ...mockTodo, completed: true }
    render(
      <TodoItem
        todo={completedTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )
    const text = screen.getByText('Tâche test')
    expect(text).toHaveClass('line-through')
  })

  it('devrait afficher une icône de validation quand le todo est complété', () => {
    const completedTodo: Todo = { ...mockTodo, completed: true }
    const { container } = render(
      <TodoItem
        todo={completedTodo}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )
    const checkmark = container.querySelector('.text-white')
    expect(checkmark).toBeInTheDocument()
  })
})
