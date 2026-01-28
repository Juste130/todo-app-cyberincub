"use client";

import TodoItem from "@/app/components/TodoItem";
import { Todo } from "@/app/page";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: TodoListProps) {
  // Séparer les todos complétés et non-complétés
  const pendingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="divide-y divide-gray-100">
      {/* Todos en attente  */}
      {pendingTodos.length > 0 && (
        <div className="p-2">
          {pendingTodos.map((todo) => (
            <div key={todo.id} className="animate-fadeIn">
              <TodoItem todo={todo} onToggle={onToggle} onDelete={onDelete} />
            </div>
          ))}
        </div>
      )}

      {/* Todos complétés */}
      {completedTodos.length > 0 && (
        <div>
          <div className="px-6 py-3 bg-gray-50">
            <h3 className="text-sm font-medium text-gray-500">
              Terminées ({completedTodos.length})
            </h3>
          </div>
          <div className="p-2">
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
