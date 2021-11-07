import { searchPosts } from 'lib/api'
import { filterForEp, getById, logError, q } from 'lib/util'
import { Conf } from 'types'

export const crunchyroll: Conf = {
  areaSelector: '.guestbook.comments',
  isMatch: () => !!getById('showmedia_about_media'),
  getPosts: async () => {
    const animeName = getById('showmedia_about_media')?.textContent?.replace(/\s+/g, ' ')
    if (!animeName) {
      logError('unable to find anime name')
      return []
    }

    const epNum = q('#showmedia_about_media h4:last-child')
      ?.textContent?.split(',')
      .pop()
      ?.match(/[0-9]+/)?.[0]
    const posts = await searchPosts(animeName + ' discussion')
    return epNum ? filterForEp(posts, epNum) : posts
  }
}
