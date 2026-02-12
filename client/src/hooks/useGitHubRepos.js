'use client'
import { useQuery } from '@tanstack/react-query'
import { info } from '../utils/info'

export const useGitHubRepos = (limit = 12) => {
    const { data: repos = [], isLoading: loading } = useQuery({
        queryKey: ['github-repos', limit],
        queryFn: async () => {
            const res = await fetch(
                `https://api.github.com/users/${info.githubUsername}/repos?sort=updated&per_page=${limit}`
            )
            if (!res.ok) throw new Error('GitHub API failed')
            return res.json()
        },
        staleTime: 5 * 60 * 1000, // 5 min — replaces manual localStorage cache
    })

    return { repos, loading }
}
