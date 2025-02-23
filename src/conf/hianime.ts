import { searchPosts } from 'lib/api'
import { filterForEp, filterForTitle, logError, q } from 'lib/util'
import { Conf } from 'types'

const currentEpisodeSel = '.ss-list a.active'

export const hianime: Conf = {
  areaSelector: '#comment-block',
  dark: true,
  mode: 'swap',
  waitFor: currentEpisodeSel,
  async getPosts() {
    const titleElem = q('h2 a')
    const title = titleElem?.dataset.jname ?? titleElem?.title
    if (!title) return logError([], 'could not find title')
    const epNum = q(currentEpisodeSel)?.dataset.number
    const query = epNum ? `${title} episode ${epNum}` : title
    let posts = await searchPosts(`subreddit:anime ${query}`)
    if (posts.length <= 0) posts = await searchPosts(query)
    return title ? filterForTitle(title, epNum ? filterForEp(epNum, posts) : posts) : posts
  }
}
