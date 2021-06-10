import { useEffect, useMemo, useState } from 'preact/hooks'
import z from 'zaftig'
import { getComments, Post, Comment, LoadMore, CommentChild, getMoreComments } from '../lib/api'
import { useRedraw } from '../lib/hooks'
import { decodeHTML } from '../lib/util'

interface Props {
  post: Post
}
interface UpdateFn {
  (fn: (parent: CommentChild[]) => void): void
}
interface ChildProps<T extends CommentChild> {
  thing: T
  post: Post
  update: UpdateFn
}

const useUpdate = (parent: CommentChild[]) => {
  const redraw = useRedraw()
  const update: UpdateFn = fn => {
    fn(parent)
    redraw()
  }
  return update
}

export const PostComments = ({ post }: Props) => {
  const [things, setThings] = useState<CommentChild[] | null>(null)
  useEffect(() => {
    setThings(null)
    getComments(post).then(setThings)
  }, [post.name])

  const update = useUpdate(things || [])

  return (
    <section className={z`mt 10`.class}>
      {!things ? (
        <div>Loading {post.name}...</div>
      ) : (
        things.map(thing => (
          <PostCommentChild key={thing.data.id} thing={thing} post={post} update={update} />
        ))
      )}
    </section>
  )
}

export function PostCommentChild({ thing, ...rest }: ChildProps<CommentChild>) {
  switch (thing.kind) {
    case 'more':
      return <LoadMoreButton {...{ thing, ...rest }} />
    case 't1':
      return <PostComment {...{ thing, ...rest }} />
    default:
      throw new Error('unknown child type')
  }
}

export const LoadMoreButton = ({ thing, update, post }: ChildProps<LoadMore>) => {
  const [loading, setLoading] = useState(false)
  return (
    <button
      disabled={loading}
      className={z`mt 10`.class}
      onClick={async () => {
        setLoading(true)
        const results = await getMoreComments(post.name, thing.data.children)
        update(parent => {
          const currentPosition = parent.indexOf(thing)
          if (currentPosition >= 0) parent.splice(currentPosition, 1, ...results)
        })
      }}
    >
      {loading ? 'Loading' : 'Load'} {thing.data.count} more comments
    </button>
  )
}

export const PostComment = ({ thing, post }: ChildProps<Comment>) => {
  const { ups, author, body_html, replies, collapsed } = thing.data
  const html = useMemo(() => decodeHTML(body_html), [body_html])

  const redraw = useRedraw()
  const toggle = () => {
    thing.data.collapsed = !collapsed
    redraw()
  }
  const collapseButton = (
    <code
      role="button"
      aria-label="toggle collapse comment"
      tabIndex={0}
      onKeyPress={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggle()
        }
      }}
      className={styles.collapse}
      onClick={toggle}
    >
      [{collapsed ? '+' : '-'}]
    </code>
  )

  const update = useUpdate(thing.data.replies ? thing.data.replies.data.children : [])

  return (
    <div className={styles.comment}>
      <div className={styles.author} style={{ marginBottom: collapsed ? '' : '5px' }}>
        {collapseButton} {author} {ups}
      </div>
      {!collapsed && (
        <>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          {replies && (
            <div className={styles.replies}>
              {replies.data.children.map(child => (
                <PostCommentChild key={child.data.id} thing={child} post={post} update={update} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

const styles = {
  comment: z`
    color $text-primary
    padding 10
    border-left 1 solid #999
    border-bottom 1 solid #999
    border-right 1 solid #999
    :first-child { border-top 1 solid #999 }
  `.class,
  author: z`font-weight bold`.class,
  replies: z`margin-top 10`.class,
  collapse: z`cursor pointer;user-select none`.class
}
