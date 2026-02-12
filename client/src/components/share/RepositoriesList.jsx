import Link from "next/link";
import { useGitHubRepos } from "../../hooks/useGitHubRepos";
import { LoadingSpinner } from "../ui/loading";
import { useTranslation } from '../../hooks/useTranslation';

const RepositoriesList = ({ theme = "dark" }) => {
  const { repos, loading } = useGitHubRepos(8); // Chỉ lấy 8 repos cho modal
  const { t } = useTranslation();

  if (loading) {
    return (
      <div className="flex justify-center py-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (repos.length === 0) {
    return (
      <div className="text-center py-4 text-[var(--text-secondary)]">
        {t('common.noReposFound')}
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
                         bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)]`}>
            {/* Repository Header */}
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-lg text-[var(--text-heading)]
                            group-hover:text-[var(--text-link-hover)]
                            transition-colors duration-300">
                {repo.name.replace(/-/g, ' ').replace(/_/g, ' ')}
              </h4>
              <div className="flex items-center space-x-3">
                {/* Stars */}
                <div className="flex items-center space-x-1 bg-[var(--color-warning)]/10
                               px-2 py-1 rounded-full">
                  <span className="text-yellow-500 text-xs">⭐</span>
                  <span className="text-xs font-medium text-[var(--color-warning)]">
                    {repo.stargazers_count || 0}
                  </span>
                </div>
                {/* Forks */}
                <div className="flex items-center space-x-1 bg-[var(--color-success)]/10
                               px-2 py-1 rounded-full">
                  <span className="text-green-500 text-xs">🍴</span>
                  <span className="text-xs font-medium text-[var(--color-success)]">
                    {repo.forks_count || 0}
                  </span>
                </div>
              </div>
            </div>
            
                        {/* Description */}
            {repo.description && (
              <p className="text-sm text-[var(--text-secondary)] mb-4 leading-relaxed
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
                  <span className="text-xs bg-[var(--bg-badge)] text-[var(--text-link)]
                                   px-2 py-1 rounded-full font-medium">
                    {repo.language}
                  </span>
                )}
              </div>
              <span className="text-xs text-[var(--color-success)] font-medium
                             bg-[var(--color-success)]/10 px-3 py-1 rounded-full">
                {t('common.viewRepo')}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default RepositoriesList;
