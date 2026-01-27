import { render, screen } from '@testing-library/react'
import TodoList from './TodoList'
import { Todo } from '@/app/page'

describe('TodoList Component', () => {
  const mockOnToggle = jest.fn()
  const mockOnDelete = jest.fn()

  const mockTodos: Todo[] = [
    {
      id: '1',
      text: 'Tâche 1',
      completed: false,
      createdAt: new Date('2026-01-27'),
    },
    {
      id: '2',
      text: 'Tâche 2',
      completed: false,
      createdAt: new Date('2026-01-27'),
    },
    {
      id: '3',
      text: 'Tâche complétée',
      completed: true,
      createdAt: new Date('2026-01-27'),
    },
  ]

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('devrait rendre une liste vide sans erreur', () => {
    render(
      <TodoList
        todos={[]}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )
    // La liste ne devrait afficher aucun todo
    expect(screen.queryByText(/Tâche/i)).not.toBeInTheDocument()
  })

  it('devrait afficher tous les todos non-complétés', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )
    expect(screen.getByText('Tâche 1')).toBeInTheDocument()
    expect(screen.getByText('Tâche 2')).toBeInTheDocument()
  })

  it('devrait afficher les todos complétés dans une section séparée', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )
    expect(screen.getByText('Tâche complétée')).toBeInTheDocument()
    expect(screen.getByText(/Terminées/i)).toBeInTheDocument()
  })

  it('devrait afficher le nombre de tâches complétées', () => {
    render(
      <TodoList
        todos={mockTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )
    expect(screen.getByText('Terminées (1)')).toBeInTheDocument()
  })

  it('devrait afficher uniquement les todos complétés', () => {
    const completedTodos: Todo[] = [
      {
        id: '1',
        text: 'Tâche complétée',
        completed: true,
        createdAt: new Date('2026-01-27'),
      },
    ]
    render(
      <TodoList
        todos={completedTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )
    expect(screen.getByText('Tâche complétée')).toBeInTheDocument()
    expect(screen.getByText('Terminées (1)')).toBeInTheDocument()
  })

  it('devrait ne pas afficher la section complétée si aucun todo complété', () => {
    const pendingTodos: Todo[] = [
      {
        id: '1',
        text: 'Tâche 1',
        completed: false,
        createdAt: new Date('2026-01-27'),
      },
    ]
    render(
      <TodoList
        todos={pendingTodos}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    )
    expect(screen.queryByText(/Terminées/i)).not.toBeInTheDocument()
  })
})
