import { searchPosts } from 'lib/api'
import { filterForEp, q } from 'lib/util'
import { Conf } from 'types'

export const animixplay: Conf = {
  commentSelector: '#disqus_thread',
  isMatch: () => Boolean(q('.playerpage')),
  dark: true,
  async getPosts() {
    const title = q('.animetitle')?.textContent
    const epNum = q('#epslistplace button[disabled]')?.textContent
    const posts = await searchPosts(`${title} episode ${epNum}`)
    return epNum ? filterForEp(posts, epNum) : posts
  }
}
