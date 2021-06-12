import { useEffect, useMemo, useRef, useState } from 'preact/hooks'
import z from 'zaftig'
import { getComments, Post, Comment, LoadMore, CommentChild, getMoreComments } from '../lib/api'
import { useRedraw } from '../lib/hooks'
import { decodeHTML, prettyTime } from '../lib/util'

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
    <div className={z`margin-top 15`.class}>
      {!things ? (
        <div>Loading {post.name}...</div>
      ) : (
        things.map(thing => (
          <PostCommentChild key={thing.data.id} thing={thing} post={post} update={update} />
        ))
      )}
    </div>
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

  const { count, children } = thing.data
  if (count <= 0) return null

  return (
    <div className={styles.comment}>
      <button
        disabled={loading}
        className={z`padding 5 10;border none`.class}
        onClick={async () => {
          setLoading(true)
          const results = await getMoreComments(post.name, children)
          update(parent => {
            const currentPosition = parent.indexOf(thing)
            if (currentPosition >= 0) parent.splice(currentPosition, 1, ...results)
          })
        }}
      >
        {loading ? 'Loading' : 'Load'} {count} more comments
      </button>
    </div>
  )
}

export const PostComment = ({ thing, post }: ChildProps<Comment>) => {
  const { ups, author, body_html, replies, collapsed, created_utc, edited } = thing.data
  const html = useMemo(() => decodeHTML(body_html), [body_html])

  const redraw = useRedraw()
  const ref = useRef<HTMLDivElement>()
  const toggle = () => {
    thing.data.collapsed = !collapsed
    redraw()

    if (ref.current.getBoundingClientRect().top < 0) ref.current.scrollIntoView()
  }

  const update = useUpdate(thing.data.replies ? thing.data.replies.data.children : [])

  const createdTime = new Date(created_utc * 1000)
  const editedTime = edited && new Date(edited * 1000)
  const differentDay = editedTime && createdTime.getDate() !== editedTime.getDate()

  return (
    <div className={styles.comment}>
      <div className={styles.border} onClick={toggle} />
      <div>
        <div ref={ref} className={styles.author} style={{ marginBottom: collapsed ? '' : '5px' }}>
          <span className={styles.authorText}>{author}</span>
          <span className={styles.ups}>{ups}</span>
          <span className={styles.date}>
            {prettyTime(createdTime, 'date-time')}
            {editedTime && (
              <> edited {prettyTime(editedTime, differentDay ? 'date-time' : 'time')}</>
            )}
          </span>
        </div>
        {!collapsed && (
          <>
            <div className={styles.body} dangerouslySetInnerHTML={{ __html: html }} />
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
    </div>
  )
}

const styles = {
  comment: z`
    display grid
    grid-template-columns auto 1fr
    :not(:last-child) { margin-bottom 18 }
    gap 18
  `.class,
  replies: z`margin-top 18`.class,
  border: z`
    position relative
    padding 12
    margin -12
    user-select none
    cursor pointer
    $color $text-subdued

    :hover { $color $text-normal }
    ::after {
      display block
      content ' '
      background $color
      height 100%
      width 4
    }
  `.class,
  body: z`
    blockquote {
      border-left 3 solid $text-subdued
      padding 5 10
      margin 10 0
      color $text-subdued
    }
  `.class,
  ups: z`color orange;font-weight bold`.class,
  date: z`color $text-subdued`.class,
  author: z`display flex;gap 10`.class,
  authorText: z`font-weight bold`.class,
  collapse: z`
    font-family monospace
    font-size 90%
    user-select none
    cursor pointer
    align-self center
  `.class
}
