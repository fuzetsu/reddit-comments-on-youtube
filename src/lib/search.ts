import { searchPosts } from './api'
import { filterForEp, filterForTitle } from './util'
import { Conf, SearchContext } from '@/types'
import { Post } from './api'

export interface SearchResult {
  posts: Post[]
  query: string
  context: SearchContext
}

export const executeSearch = async (conf: Conf, userQuery?: string): Promise<SearchResult> => {
  const context = await Promise.resolve(conf.buildSearchContext())

  const query = userQuery ?? context.baseQuery

  const subredditQueries = conf.subredditFilters
    ? conf.subredditFilters.map(sub => `subreddit:${sub} ${query}`)
    : []

  const queries = [...subredditQueries, context.baseQuery]

  let posts: Post[] = []
  let usedQuery = ''

  // Try each query in sequence until we get results
  for (const query of queries) {
    posts = await searchPosts(query)
    usedQuery = query
    if (posts.length > 0) break
  }

  let filteredPosts = posts

  if (context.episode) {
    filteredPosts = filterForEp(context.episode, filteredPosts)
  }

  if (context.title) {
    filteredPosts = filterForTitle(context.title, filteredPosts)
  }

  return {
    posts: filteredPosts,
    query: usedQuery,
    context
  }
}
