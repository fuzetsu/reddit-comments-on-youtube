import { searchPosts } from '../lib/api'
import { Conf } from '../type'

const getVideoIdFromUrl = (url: string) => url.match(/v=([^&]+)/i)?.[1]

export const youtube: Conf = {
  commentSelector: '#comments',
  isMatch: () => Boolean(getVideoIdFromUrl(location.href)),
  getPosts: () => {
    const id = getVideoIdFromUrl(location.href)
    if (!id) throw new Error('must be a video URL')
    return searchPosts(`(url:3D${id} OR url:${id}) (site:youtube.com OR site:youtu.be)`)
  }
}
