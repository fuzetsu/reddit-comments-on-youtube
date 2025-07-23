import { logError, q } from '@/lib/util'
import { Conf } from '@/types'

export const dramacool: Conf = {
  areaSelector: '.note',

  buildSearchContext() {
    const title = q('h1')?.textContent
    if (!title) return logError({ baseQuery: '' }, 'unable to find title')

    const baseQuery = title.slice(0, title.toLowerCase().lastIndexOf('english'))
    const episode = baseQuery.match(/episode ([0-9]+)/i)?.[1]

    return { title, episode, baseQuery }
  }
}
