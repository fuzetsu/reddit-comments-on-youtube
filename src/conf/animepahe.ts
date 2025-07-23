import { logError, q } from '@/lib/util'
import { Conf } from '@/types'

const currentEpisodeSel = '#episodeMenu'

export const animepahe: Conf = {
  areaSelector: '.theatre',
  dark: true,
  mode: 'insert',
  waitFor: currentEpisodeSel,
  subredditFilters: ['anime'],

  buildSearchContext() {
    const title = q('h1 a')?.title
    if (!title) return logError({ baseQuery: '' }, 'could not find title')

    const episode = q(currentEpisodeSel)?.textContent?.match(/\d+(\.\d+)?/)?.[0]
    const baseQuery = episode ? `${title} episode ${episode}` : title

    return { title, episode, baseQuery }
  }
}
