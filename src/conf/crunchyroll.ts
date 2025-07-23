import { getById, logError, q } from '@/lib/util'
import { Conf } from '@/types'

export const crunchyroll: Conf = {
  areaSelector: '.guestbook.comments',
  isMatch: () => !!getById('showmedia_about_media'),

  buildSearchContext() {
    const animeName = getById('showmedia_about_media')?.textContent?.replace(/\s+/g, ' ')
    if (!animeName) return logError({ baseQuery: '' }, 'unable to find anime name')

    const episode = q('#showmedia_about_media h4:last-child')
      ?.textContent?.split(',')
      .pop()
      ?.match(/[0-9]+/)?.[0]

    const baseQuery = animeName + ' discussion'
    return { title: animeName, episode, baseQuery }
  }
}
