import { logError, q } from '@/lib/util'
import { Conf } from '@/types'

const getVideoIdFromUrl = (url: string) => url.match(/v=([^&]+)/i)?.[1]

export const youtube: Conf = {
  areaSelector: '#comments',
  scrollOffset: () => q('.ytd-masthead')?.clientHeight || 60,
  isMatch: () => Boolean(getVideoIdFromUrl(location.href)),
  theme: {
    background: 'var(--yt-spec-general-background-a)',
    text: { normal: 'var(--yt-spec-text-primary)', subdued: 'var(--yt-spec-text-secondary)' },
    link: { color: 'var(--yt-spec-call-to-action)' },
    button: { background: 'var(--yt-spec-badge-chip-background)' },
    ups: '#ffa500'
  },

  buildSearchContext() {
    const id = getVideoIdFromUrl(location.href)
    if (!id) return logError({ baseQuery: '' }, 'failed to parse video id', location.href)

    const baseQuery = `(url:3D${id} OR url:${id}) (site:youtube.com OR site:youtu.be)`
    return { baseQuery }
  }
}
