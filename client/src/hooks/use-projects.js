import { useQuery } from '@tanstack/react-query'
import { listProjects, getProject } from '../lib/pocketbase'

export function useProjects(lang = 'en') {
  const query = useQuery({
    queryKey: ['projects', lang],
    queryFn: () => listProjects({ lang }),
  })

  return {
    projects: query.data?.projects || [],
    isLoading: query.isLoading,
    error: query.error?.message || null,
  }
}

export function useProject(slug, lang = 'en') {
  const query = useQuery({
    queryKey: ['project', slug, lang],
    queryFn: () => getProject(slug, { lang }),
    enabled: !!slug,
  })

  return {
    project: query.data || null,
    isLoading: query.isLoading,
    error: query.error?.message || null,
  }
}
