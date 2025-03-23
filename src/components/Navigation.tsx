import { usePrivy } from '@privy-io/react-auth';

export function Navigation() {
  const { login, ready, authenticated, user, logout } = usePrivy();
  return (
    <nav className="flex items-center space-x-4 p-4 bg-white border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <a
          href="/"
          className="px-3 py-2 rounded-lg transition-colors text-gray-600 hover:text-blue-600 hover:bg-blue-50"
        >
          Home
        </a>
        <a
          href="/messenger"
          className="px-3 py-2 rounded-lg transition-colors text-gray-600 hover:text-blue-600 hover:bg-blue-50"
        >
          Messenger
        </a>
      </div>
      <div className="flex-1" />
      {authenticated ? (
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{user?.email || 'Anonymous User'}</span>
          <button
            onClick={logout}
            className="px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={login}
          disabled={!ready}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          Login
        </button>
      )}
      <a
        href="https://discord.com/oauth2/authorize?client_id=1353133400713859262"
        target="_blank"
        rel="noopener noreferrer"
        className="px-4 py-2 rounded-lg bg-[#5865F2] text-white hover:bg-[#4752C4] transition-colors flex items-center space-x-2"
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 13.107 13.107 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
        </svg>
        <span>Install Discord Bot</span>
      </a>
    </nav>
  );
}
