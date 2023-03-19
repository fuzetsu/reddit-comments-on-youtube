import { searchPosts } from 'lib/api'
import { filterForEp, filterForTitle, q } from 'lib/util'
import { Conf } from 'types'

export const nineAnime: Conf = {
  areaSelector: '#disqus_thread',
  isMatch: () => Boolean(q('#player')),
  dark: true,
  waitFor: '.ep-range .active',
  async getPosts() {
    const title = q('.info > .title')?.textContent
    if (!title) return []
    const epNum = q('.ep-range .active')?.textContent?.match(/[0-9]+/)?.[0]
    const query = epNum ? `${title} episode ${epNum}` : title
    let posts = await searchPosts(`subreddit:anime ${query}`)
    if (posts.length <= 0) posts = await searchPosts(query)
    return title ? filterForTitle(title, epNum ? filterForEp(epNum, posts) : posts) : posts
  }
}
