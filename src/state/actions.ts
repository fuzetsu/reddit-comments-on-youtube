import { getComments, Post } from '@/lib/api'
import { keepTrying, log, logError } from '@/lib/util'
import { waitForElemsWithTimout } from '@/lib/wait-for-elems'
import { Conf } from '@/types'
import { initialState, setState } from './state'
import { KeySetter, State } from './types'

const setter: KeySetter<State> = key => value => setState({ [key]: value })

export const setActivePost = (post: Post) => setState({ activePost: () => post })
export const setPostsLoading = setter('postsLoading')
export const setPosts = setter('posts')
export const setCommentsLoading = setter('commentsLoading')
export const setComments = setter('comments')
export const setNoContent = setter('noContent')
export const setFirstLoad = setter('firstLoad')

const loadConf = (conf: Conf) => {
  conf
    .getPosts()
    .catch(error => logError([], conf, 'conf.getPosts() threw', error))
    .then(setPosts)
    .finally(() => setPostsLoading(false))
}

const SEC_TIMEOUT = 5
export const init = (conf: Conf) => {
  setState([() => initialState, { conf: () => conf }])

  if (!conf.waitFor) return loadConf(conf)

  log('conf has waitFor configured', conf.waitFor)

  const handleDone = () => {
    loadConf(conf)
    log('finished waiting', conf.waitFor)
  }
  const handleTimeout = () => logError('timed out waiting for', conf.waitFor)

  if (typeof conf.waitFor === 'string') {
    waitForElemsWithTimout({
      selector: conf.waitFor,
      onMatch: handleDone,
      timeout: SEC_TIMEOUT * 1000,
      onTimeout: handleTimeout
    })
    return
  }

  keepTrying(conf.waitFor, SEC_TIMEOUT).then(handleDone).catch(handleTimeout)
}

export const loadComments = async (post: Post) => {
  setCommentsLoading(true)
  const comments = await getComments(post)
  setComments(comments)
  setCommentsLoading(false)
}
