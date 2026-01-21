'use client'

import { Todo } from '@/app/page'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors">
      {/* Checkbox */}
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${todo.completed 
          ? 'bg-blue-500 border-blue-500' 
          : 'border-gray-300 hover:border-blue-400'}`}
        aria-label={todo.completed ? "Marquer comme non terminée" : "Marquer comme terminée"}
      >
        {todo.completed && (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* Texte */}
      <div className="flex-grow min-w-0">
        <p className={`${todo.completed 
          ? 'text-gray-400 line-through' 
          : 'text-gray-800'} font-medium truncate`}>
          {todo.text}
        </p>
        <p className="text-xs text-gray-400 mt-1">
          Ajouté le {formatDate(todo.createdAt)}
        </p>
      </div>

      {/* Bouton de suppression */}
      <button
        onClick={() => onDelete(todo.id)}
        className="flex-shrink-0 p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
        aria-label="Supprimer"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  )
}