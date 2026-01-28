export default function Header() {
  return (
    <header className="text-center py-8">
      <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>

      <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
        Todo<span className="text-blue-600">App</span>
      </h1>
      <p className="mt-3 text-lg text-gray-600">Minimal, sécurisé, efficace</p>
    </header>
  );
}
