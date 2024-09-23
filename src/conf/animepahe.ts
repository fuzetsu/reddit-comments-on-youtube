import { searchPosts } from '@/lib/api'
import { filterForEp, filterForTitle, logError, q } from '@/lib/util'
import { Conf } from '@/types'

const currentEpisodeSel = '#episodeMenu'

export const animepahe: Conf = {
  areaSelector: '.theatre',
  dark: true,
  mode: 'insert',
  waitFor: currentEpisodeSel,
  async getPosts() {
    const title = q('h1 a')?.title
    if (!title) return logError([], 'could not find title')
    const epNum = q(currentEpisodeSel)?.textContent?.match(/\d+(\.\d+)?/)?.[0]
    const query = epNum ? `${title} episode ${epNum}` : title
    let posts = await searchPosts(`subreddit:anime ${query}`)
    if (posts.length <= 0) posts = await searchPosts(query)
    return title ? filterForTitle(title, epNum ? filterForEp(epNum, posts) : posts) : posts
  }
}
