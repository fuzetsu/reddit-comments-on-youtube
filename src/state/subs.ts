import { getComments } from 'lib/api'
import {
  setActivePost,
  setComments,
  setCommentsLoading,
  setFirstLoad,
  setNoContent
} from './actions'
import { subscribe } from './state'

// set no content flag based on first load
subscribe(
  [s => s.firstLoad, s => s.commentsLoading, s => s.comments],
  (first, loading, comments) => {
    if (loading || !first) return
    setFirstLoad(false)
    if (comments.length <= 0) setNoContent(true)
  }
)
subscribe([s => s.firstLoad, s => s.postsLoading, s => s.posts], (first, loading, posts) => {
  if (loading || !first) return
  if (posts.length > 0) {
    setActivePost(posts[0])
  } else {
    setFirstLoad(false)
    setNoContent(true)
  }
})

// fetch comments whenever active post changes
subscribe(
  s => s.activePost,
  activePost => {
    if (!activePost) return
    setCommentsLoading(true)
    getComments(activePost)
      .then(setComments)
      .finally(() => setCommentsLoading(false))
  }
)
