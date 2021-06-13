import { Post, searchPosts } from 'lib/api'
import { getById, logError, q } from 'lib/util'
import { Conf } from 'types'

const filterForEp = (posts: Post[], episode: string) => {
  const epRegex = new RegExp(`\\bepisode ${episode}\\b`, 'i')
  return posts.filter(post => epRegex.test(post.title))
}

export const crunchyroll: Conf = {
  commentSelector: '.guestbook.comments',
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
