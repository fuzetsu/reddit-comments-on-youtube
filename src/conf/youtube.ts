import z from 'zaftig'
import { searchPosts } from '../lib/api'
import { logError } from '../lib/util'
import { Conf } from '../type'

const getVideoIdFromUrl = (url: string) => url.match(/v=([^&]+)/i)?.[1]

export const youtube: Conf = {
  commentSelector: '#comments',
  isMatch: () => Boolean(getVideoIdFromUrl(location.href)),
  theme: z`
    $text-primary var(--yt-spec-text-primary, black)
    $text-secondary var(--yt-spec-text-secondary, #666)
    $link-color var(--yt-spec-call-to-action, #1b3e92)
    $button-bg var(--yt-spec-badge-chip-background, #555)
  `,
  getPosts: async () => {
    const url = location.href
    const id = getVideoIdFromUrl(url)
    if (!id) {
      logError('failed to parse video id', url)
      return []
    }
    return searchPosts(`(url:3D${id} OR url:${id}) (site:youtube.com OR site:youtu.be)`)
  }
}
