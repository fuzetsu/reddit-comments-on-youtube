import { searchPosts } from '@/lib/api'
import { filterForEp, getById, logError, q } from '@/lib/util'
import { Conf } from '@/types'

export const crunchyroll: Conf = {
  areaSelector: '.guestbook.comments',
  isMatch: () => !!getById('showmedia_about_media'),
  getPosts: async () => {
    const animeName = getById('showmedia_about_media')?.textContent?.replace(/\s+/g, ' ')
    if (!animeName) return logError({}, 'unable to find anime name')

    const epNum = q('#showmedia_about_media h4:last-child')
      ?.textContent?.split(',')
      .pop()
      ?.match(/[0-9]+/)?.[0]
    const query = animeName + ' discussion'
    const posts = await searchPosts(query)
    const filteredPosts = epNum ? filterForEp(epNum, posts) : posts
    return { posts: filteredPosts, query }
  }
}
