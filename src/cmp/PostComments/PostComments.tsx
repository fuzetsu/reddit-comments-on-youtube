import { APP_ID } from 'constants'
import { PostCommentChild } from './cmp/PostCommentChild'
import { useUpdate } from './hooks'
import { useStore } from 'state'
import { LoadingAnimation } from './LoadingAnimation'
import { NoComments } from './NoComments'
import z from 'zaftig'
import { createStyles } from 'lib/util'
import { useState, useEffect } from 'preact/hooks'

export const PostComments = () => {
  const [loading, things, activePost] = useStore([
    s => s.commentsLoading,
    s => s.comments,
    s => s.activePost
  ])
  const [delayedLoading, setDelayedLoading] = useState(loading)
  const update = useUpdate(things || [])

  useEffect(() => {
    if (loading) {
      setDelayedLoading(true)
      const timer = setTimeout(() => {
        setDelayedLoading(loading)
      }, 500)
      return () => clearTimeout(timer)
    } else {
      setDelayedLoading(false)
    }
  }, [loading])

  if (!activePost) return null

  return (
    <div id={APP_ID + 'PostComments'}>
      {delayedLoading ? (
        <div className={styles.centerNotice}>
          <LoadingAnimation />
          <span className={styles.loadingText}>
            Loading comments for {activePost.title.slice(0, 20)}…
          </span>
        </div>
      ) : things.length <= 0 ? (
        <div className={styles.centerNotice}>
          <NoComments />
        </div>
      ) : (
        things.map(thing => <PostCommentChild key={thing.data.id} thing={thing} update={update} />)
      )}
    </div>
  )
}

const styles = createStyles({
  centerNotice: z`
    display flex
    justify-content center
    align-items center
    min-height 200px
  `,
  loadingText: z`margin-left 10px;font-size 16px`
})
