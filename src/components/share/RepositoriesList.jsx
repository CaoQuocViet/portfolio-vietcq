import Link from "next/link";
import { useGitHubRepos } from "../../hooks/useGitHubRepos";
import { LoadingSpinner } from "../ui/loading";

const RepositoriesList = ({ theme = "dark" }) => {
  const { repos, loading } = useGitHubRepos(8); // Chỉ lấy 8 repos cho modal

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="text-center py-4 text-gray-600 dark:text-gray-400">
        No repositories found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {repos.map((repo) => (
        <Link 
          key={repo.id}
          href={repo.html_url || repo.url || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <div className={`group transition-all duration-300 
                         rounded-2xl p-6 
                         hover:scale-[1.02] hover:shadow-lg
                         ${theme === 'dark' 
                             ? 'bg-gray-800/30 hover:bg-gray-800/50' 
                             : 'bg-white/50 hover:bg-white/80'
                         }`}>
            {/* Repository Header */}
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white 
                            group-hover:text-green-600 dark:group-hover:text-green-400 
                            transition-colors duration-300">
                {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
              </h4>
              <div className="flex items-center space-x-3">
                {/* Stars */}
                <div className="flex items-center space-x-1 bg-yellow-50 dark:bg-yellow-500/10 
                               px-2 py-1 rounded-full">
                  <span className="text-yellow-500 text-xs">⭐</span>
                  <span className="text-xs font-medium text-yellow-700 dark:text-yellow-400">
                    {repo.stargazers_count || 0}
                  </span>
                </div>
                {/* Forks */}
                <div className="flex items-center space-x-1 bg-green-50 dark:bg-green-500/10 
                               px-2 py-1 rounded-full">
                  <span className="text-green-500 text-xs">🍴</span>
                  <span className="text-xs font-medium text-green-700 dark:text-green-400">
                    {repo.forks_count || 0}
                  </span>
                </div>
              </div>
            </div>
            
                        {/* Description */}
            {repo.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 leading-relaxed
                            overflow-hidden"
                 style={{
                   display: '-webkit-box',
                   WebkitLineClamp: 2,
                   WebkitBoxOrient: 'vertical'
                 }}>
                {repo.description}
              </p>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {repo.language && (
                  <span className="text-xs bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 
                                   px-2 py-1 rounded-full font-medium">
                    {repo.language}
                  </span>
                )}
              </div>
              <span className="text-xs text-green-600 dark:text-green-400 font-medium 
                             bg-green-50 dark:bg-green-500/10 px-3 py-1 rounded-full">
                View Repo
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RepositoriesList;
