import { logError, qq, subURI } from '@/lib/util'
import { Conf } from '@/types'

export const funimation: Conf = {
  areaSelector: '.video-player-controls__aux-controls',
  mode: 'modal',
  dark: true,
  isMatch: url => url.includes('/v/'),

  async buildSearchContext() {
    const [titleElem, epInfoElem] = qq<HTMLLIElement>('.meta-overlay__data-block li')
    const animeName = titleElem.textContent
    if (!animeName) return logError({ baseQuery: '' }, 'unable to find anime name')

    const url = subURI('https://kitsu.io/api/edge/anime?filter[text]=:animeName', { animeName })
    const data = await fetch(url).then(res => res.json())
    const goodTitle = data.data[0].attributes.canonicalTitle

    const epInfo = epInfoElem.textContent?.replace(/\s+/g, ' ').match(/Episode [0-9]+/)?.[0]
    const episode = epInfo?.match(/[0-9]+/)?.[0]
    const baseQuery = goodTitle + ' ' + epInfo + ' discussion'

    return { title: goodTitle, episode, baseQuery }
  }
}
