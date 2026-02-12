'use client'
import { useState, useEffect } from 'react'
import { info } from '../utils/info'

export const useGitHubRepos = (limit = 12) => {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRepos = async () => {
      // Check cache first
      const cached = localStorage.getItem('github-repos')
      const cacheTime = localStorage.getItem('github-repos-time')
      const now = Date.now()
      
      // Use cache if less than 5 minutes old
      if (cached && cacheTime && (now - parseInt(cacheTime)) < 5 * 60 * 1000) {
        const cachedRepos = JSON.parse(cached)
        setRepos(cachedRepos.slice(0, limit))
        setLoading(false)
        return
      }

      try {
        // Fetch from GitHub API for live data
        const githubResponse = await fetch(`https://api.github.com/users/${info.githubUsername}/repos?sort=updated&per_page=${Math.max(limit, 12)}`)
        if (githubResponse.ok) {
          const githubData = await githubResponse.json()
          const repoData = githubData.slice(0, Math.max(limit, 12)) // Cache tối thiểu 12 repos
          
          // Cache the data
          localStorage.setItem('github-repos', JSON.stringify(repoData))
          localStorage.setItem('github-repos-time', now.toString())
          
          setRepos(repoData.slice(0, limit))
        } else {
          console.error('GitHub API failed')
          setRepos([])
        }
      } catch (error) {
        console.error('Error fetching repos:', error)
        setRepos([])
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [limit])

  return { repos, loading }
}
