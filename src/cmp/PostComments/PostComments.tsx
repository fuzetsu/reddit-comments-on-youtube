import { useEffect, useState } from 'preact/hooks'
import z from 'zaftig'
import { getComments, CommentChild, Post } from 'lib/api'
import { PostCommentChild } from './cmp/PostCommentChild'
import { CommentCtx, useUpdate } from './hooks'
import { Conf } from 'types'

interface Props {
  post: Post
  conf: Conf
  onLoad?(comments: CommentChild[]): void
}

export const PostComments = ({ post, conf, onLoad }: Props) => {
  const [things, setThings] = useState<CommentChild[] | null>(null)
  useEffect(() => {
    setThings(null)
    const handle = (things: CommentChild[]) => {
      setThings(things)
      onLoad?.(things)
    }
    getComments(post)
      .then(handle)
      .catch(() => handle([]))
  }, [post])

  const update = useUpdate(things || [])

  if (!things) return <div className={container}>Loading comments for "{post.title}"…</div>
  if (things.length <= 0) return <div className={container}>No comments yet.</div>

  return (
    <CommentCtx.Provider value={{ post, conf }}>
      <div className={container}>
        {things.map(thing => (
          <PostCommentChild key={thing.data.id} thing={thing} update={update} />
        ))}
      </div>
    </CommentCtx.Provider>
  )
}

const container = z`margin-top 15`.class
