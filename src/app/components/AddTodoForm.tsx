'use client'

import { useState } from 'react'

interface AddTodoFormProps {
  onAdd: (text: string) => void
}

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const trimmedText = text.trim()
    if (!trimmedText) return
    
    setIsSubmitting(true)
    
    // Simule un petit délai pour l'UX
    setTimeout(() => {
      onAdd(trimmedText)
      setText('')
      setIsSubmitting(false)
    }, 150)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Ex: Configurer le pipeline CI/CD..."
          className="flex-grow px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition placeholder:text-gray-400"
          disabled={isSubmitting}
          maxLength={120}
        />
        <button
          type="submit"
          disabled={isSubmitting || !text.trim()}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-xl hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Ajout...
            </span>
          ) : 'Ajouter'}
        </button>
      </div>
      
      {text.length > 0 && (
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-500">
            Appuyez sur Entrée ou cliquez sur "Ajouter"
          </span>
          <span className={`font-medium ${text.length > 100 ? 'text-orange-600' : 'text-gray-500'}`}>
            {text.length}/120
          </span>
        </div>
      )}
    </form>
  )
}