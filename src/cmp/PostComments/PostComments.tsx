import { APP_ID, MIN_LOAD_TIME } from '@/constants'
import { PostCommentChild } from './cmp/PostCommentChild'
import { useUpdateComments } from './hooks'
import { useStore } from '@/state'
import { LoadingAnimation } from './cmp/LoadingAnimation'
import { NoComments } from './cmp/NoComments'
import z from 'zaftig'
import { useDelayedLoadingState } from '@/lib/hooks'
import { createStyles } from '@/theme'

export const PostComments = () => {
  const [loading, things, activePost] = useStore([
    s => s.commentsLoading,
    s => s.comments,
    s => s.activePost
  ])

  const update = useUpdateComments(things || [])

  const delayedLoading = useDelayedLoadingState(loading, MIN_LOAD_TIME)

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
