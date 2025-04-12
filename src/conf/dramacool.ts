import { searchPosts } from '@/lib/api'
import { logError, q } from '@/lib/util'
import { Conf } from '@/types'

export const dramacool: Conf = {
  areaSelector: '.note',
  getPosts: async () => {
    const title = q('h1')?.textContent
    if (!title) return logError({}, 'unable to find title')
    const query = title.slice(0, title.toLowerCase().lastIndexOf('english'))
    const posts = await searchPosts(query)
    const epNum = query.match(/episode ([0-9]+)/i)?.[1]
    if (!epNum) return { posts, query }
    const regex = new RegExp(`\\b${epNum}\\b`)
    const found = posts.filter(x => regex.test(x.title))
    const finalPosts = found.length > 0 ? found : posts
    return { posts: finalPosts, query }
  }
}
