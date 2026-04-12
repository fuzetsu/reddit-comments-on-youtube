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

  const baseQuery = userQuery ?? context.baseQuery

  const subredditQueries = conf.subredditFilters
    ? conf.subredditFilters.map(sub => `subreddit:${sub} ${baseQuery}`)
    : []

  const queries = [...subredditQueries, baseQuery]

  let posts: Post[] = []

  // Try each query in sequence until we get results
  for (const query of queries) {
    posts = await searchPosts(query)
    if (posts.length > 0) break
  }

  let filteredPosts = posts

  // issues, the user can now change the search query, but if episode and title are misdetected
  // changing the query isn't super helpful, we should allow the user to update the title/episode
  // match as well in the search controls UI to properly narrow in the search. In fact if
  // episode/title are present in the context we should favor showing controls for that over
  // allowing editing the search query, instead we can override the context we pass when generating
  // the base search query.
  if (context.episode) {
    filteredPosts = filterForEp(context.episode, filteredPosts)
  }

  if (context.title) {
    filteredPosts = filterForTitle(context.title, filteredPosts)
  }

  return {
    posts: filteredPosts,
    query: baseQuery,
    context
  }
}
