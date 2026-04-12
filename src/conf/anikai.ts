import { logError, q } from '@/lib/util'
import { Conf } from '@/types'

const currentEpisodeSel = '.range .active'

export const anikai: Conf = {
  areaSelector: '#comment',
  dark: true,
  mode: 'swap',
  waitFor: currentEpisodeSel,
  subredditFilters: ['anime'],

  buildSearchContext() {
    const title = q('.al-title')?.textContent?.split(';')[0]
    if (!title) return logError({ baseQuery: '' }, 'could not find title')

    const episode = q(currentEpisodeSel)?.textContent?.trim().match(/\d+/)?.[0]
    const baseQuery = episode ? `${title} episode ${episode}` : title

    return { title, episode, baseQuery }
  }
}
