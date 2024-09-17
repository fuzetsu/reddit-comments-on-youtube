import { APP_ID } from 'constants'
import { PostCommentChild } from './cmp/PostCommentChild'
import { useUpdate } from './hooks'
import { useStore } from 'state'
import { LoadingAnimation } from './LoadingAnimation'
import { NoComments } from './NoComments'
import z from 'zaftig'

const styles = z`
  .loading, .no-comments {
    display flex
    justify-content center
    align-items center
    min-height 200px
  }
  .loading-text {
    margin-left 10px
    font-size 16px
  }
`

export const PostComments = () => {
  const [loading, things, activePost] = useStore([
    s => s.commentsLoading,
    s => s.comments,
    s => s.activePost
  ])
  const update = useUpdate(things || [])

  if (!activePost) return null

  return (
    <div id={APP_ID + 'PostComments'} className={styles.class}>
      {loading ? (
        <div className="loading">
          <LoadingAnimation />
          <span className="loading-text">Loading comments for {activePost.title}…</span>
        </div>
      ) : things.length <= 0 ? (
        <div className="no-comments">
          <NoComments />
        </div>
      ) : (
        things.map(thing => (
          <PostCommentChild key={thing.data.id} thing={thing} update={update} />
        ))
      )}
    </div>
  )
}
