import { Post } from 'lib/api'
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

export const init = async (conf: Conf) => {
  setState([() => initialState, { conf }])

  conf
    .getPosts()
    .then(setPosts)
    .finally(() => setPostsLoading(false))
}
