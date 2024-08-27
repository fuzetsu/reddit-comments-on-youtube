import { searchPosts } from 'lib/api'
import { filterForEp, filterForTitle, q } from 'lib/util'
import { Conf } from 'types'

const currentEpisodeSel = '#episodeMenu'

export const animepahe: Conf = {
  areaSelector: '.theatre',
  dark: true,
  mode: 'insert',
  waitFor: currentEpisodeSel,
  async getPosts() {
    const title = q('h1 a')?.title
    if (!title) return []
    const epNum = q(currentEpisodeSel)?.textContent?.match(/[0-9]+/)?.[0]
    const query = epNum ? `${title} episode ${epNum}` : title
    let posts = await searchPosts(`subreddit:anime ${query}`)
    if (posts.length <= 0) posts = await searchPosts(query)
    return title ? filterForTitle(title, epNum ? filterForEp(epNum, posts) : posts) : posts
  }
}
