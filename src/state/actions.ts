import { Post } from 'lib/api'
import { logError } from 'lib/util'
import { Conf } from 'types'
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

export const init = (conf: Conf) => {
  setState([() => initialState, { conf }])

  return conf
    .getPosts()
    .catch(error => logError([], conf, 'conf.getPosts() threw', error))
    .then(setPosts)
    .finally(() => setPostsLoading(false))
}
