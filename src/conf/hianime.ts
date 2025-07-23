import { logError, q } from 'lib/util'
import { Conf } from 'types'

const currentEpisodeSel = '.ss-list a.active'

export const hianime: Conf = {
  areaSelector: '#comment-block',
  dark: true,
  mode: 'swap',
  waitFor: currentEpisodeSel,
  subredditFilters: ['anime'],

  buildSearchContext() {
    const titleElem = q('h2 a')
    const title = titleElem?.dataset.jname ?? titleElem?.title
    if (!title) return logError({ baseQuery: '' }, 'could not find title')

    const episode = q(currentEpisodeSel)?.dataset.number
    const baseQuery = episode ? `${title} episode ${episode}` : title

    return { title, episode, baseQuery }
  }
}
