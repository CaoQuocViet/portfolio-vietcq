import { useState, useEffect } from "react";
import Link from "next/link";
import { Star, GitFork } from "lucide-react";
import { useGitHubRepos } from "../hooks/useGitHubRepos";

const RepositoriesList = ({ theme = "dark" }) => {
  const { repos, loading } = useGitHubRepos(8); // Chỉ lấy 8 repos cho modal

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <div className={`animate-spin rounded-full h-6 w-6 border-b-2 ${theme === 'dark' ? 'border-blue-400' : 'border-blue-600'}`} />
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className={`text-center py-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
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
          <div className="card-modern hover:card-glow transition-all duration-300 cursor-pointer">
            {/* Repository Header */}
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-base gradient-text truncate">
                {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
              </h4>
              <div className="flex items-center space-x-4">
                {/* Stars */}
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {repo.stargazers_count || 0}
                  </span>
                </div>
                
                {/* Forks */}
                <div className="flex items-center space-x-2">
                  <GitFork className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {repo.forks_count || 0}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Repository Description */}
            {repo.description && (
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                {repo.description}
              </p>
            )}
            
            {/* Repository Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                {repo.language && (
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                    {repo.language}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Updated {new Date(repo.updated_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RepositoriesList;
