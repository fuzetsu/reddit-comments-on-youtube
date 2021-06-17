import z from 'zaftig'
import { PostCommentChild } from './cmp/PostCommentChild'
import { useUpdate } from './hooks'
import { useStore } from 'state'

export const PostComments = () => {
  const [loading, things, activePost] = useStore([
    s => s.commentsLoading,
    s => s.comments,
    s => s.activePost
  ])
  const update = useUpdate(things || [])

  return (
    <div className={container}>
      {loading
        ? `Loading comments for ${activePost?.title ?? '???'}…`
        : things.length <= 0
        ? 'No comments yet.'
        : things.map(thing => (
            <PostCommentChild key={thing.data.id} thing={thing} update={update} />
          ))}
    </div>
  )
}

const container = z`margin-top 15`.class
