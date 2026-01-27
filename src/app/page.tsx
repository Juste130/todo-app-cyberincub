'use client'

import { useState, useEffect } from 'react'
import Header from './components/Header'
import AddTodoForm from './components/AddTodoForm'
import TodoList from '@/app/components/TodoList'

export type Todo = {
  id: string
  text: string
  completed: boolean
  createdAt: Date
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])

  // Charger depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('todos')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        // Convertir les dates string en objets Date
        const todosWithDates = parsed.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt)
        }))
        setTodos(todosWithDates)
      } catch (error) {
        console.error('Erreur de chargement:', error)
      }
    }
  }, [])

  // Sauvegarder dans localStorage
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  }, [todos])

  // Ajouter un todo
  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date()
    }
    setTodos([newTodo, ...todos])
  }

  // Basculer l'état complété
  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // Supprimer un todo
  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Nettoyer les complétés
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed))
  }

  // Stats
  const totalTodos = todos.length
  const completedTodos = todos.filter(t => t.completed).length
  const pendingTodos = totalTodos - completedTodos

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <Header />
      
      <main className="mt-12 space-y-8">
        {/* Section d'ajout */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Nouvelle tâche
          </h2>
          <AddTodoForm onAdd={addTodo} />
        </div>

        {/* Section liste */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Vos tâches
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {pendingTodos} en attente • {completedTodos} terminées
              </p>
            </div>
            
            {completedTodos > 0 && (
              <button
                onClick={clearCompleted}
                className="px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
              >
                Nettoyer terminées
              </button>
            )}
          </div>

          {todos.length > 0 ? (
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ) : (
            <div className="px-6 py-16 text-center">
              <div className="text-gray-300 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">
                Aucune tâche pour le moment
              </p>
              <p className="text-gray-400 mt-2">
                Ajoutez votre première tâche ci-dessus
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
          <div className="flex items-start">
            <div className="flex-shrink-0 text-blue-600">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Projet DevSecOps
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Cette application est versionnée avec Git, dispose d'un pipeline CI/CD automatisé et de contrôles de sécurité intégrés.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}