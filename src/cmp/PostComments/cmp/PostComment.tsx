import { useMemo, useRef } from 'preact/hooks'
import z from 'zaftig'
import { API_URL } from '../../../constants'
import { Comment } from '../../../lib/api'
import { useRedraw } from '../../../lib/hooks'
import { decodeHTML, prettyTime, reduceCount, subURI } from '../../../lib/util'
import { useCommentCtx, useUpdate } from '../hooks'
import { ChildProps } from '../types'
import { PostCommentChild } from './PostCommentChild'

export const PostComment = ({ thing }: ChildProps<Comment>) => {
  const { ups, author, body_html, replies, collapsed, created_utc, edited, permalink } = thing.data
  const html = useMemo(() => decodeHTML(body_html), [body_html])

  const { conf } = useCommentCtx()

  const redraw = useRedraw()
  const ref = useRef<HTMLDivElement>()
  const toggle = () => {
    thing.data.collapsed = !collapsed
    redraw()

    if (ref.current.getBoundingClientRect().top < 0) {
      ref.current.scrollIntoView()
      if (conf.scrollOffset) {
        const offset =
          typeof conf.scrollOffset === 'function' ? conf.scrollOffset() : conf.scrollOffset
        window.scrollBy(0, -offset)
      }
    }
  }

  const update = useUpdate(thing.data.replies ? thing.data.replies.data.children : [])

  const createdTime = new Date(created_utc * 1000)
  const editedTime = edited && new Date(edited * 1000)
  const differentDay = editedTime && createdTime.getDate() !== editedTime.getDate()

  return (
    <div className={styles.comment}>
      <div className={styles.border} onClick={toggle} />
      <div>
        <div
          ref={ref}
          className={styles.commentInfo}
          style={{ marginBottom: collapsed ? '' : '10px' }}
        >
          <a
            className={styles.author}
            target="_blank"
            href={API_URL + subURI('/u/:author', { author })}
          >
            {author}
          </a>
          <span className={styles.ups}>{reduceCount(ups)}</span>
          <a className={styles.date} target="_blank" href={API_URL + permalink}>
            {prettyTime(createdTime, 'date-time')}
            {editedTime && (
              <> edited {prettyTime(editedTime, differentDay ? 'date-time' : 'time')}</>
            )}
          </a>
        </div>
        {!collapsed && (
          <>
            <div
              className={styles.body}
              dangerouslySetInnerHTML={{ __html: html }}
              onClick={e => {
                if (e.target instanceof HTMLAnchorElement) {
                  e.preventDefault()
                  const url = e.target.href
                  window.open(url.startsWith('/') ? API_URL + url : url)
                }
              }}
            />
            {replies && (
              <div className={styles.replies}>
                {replies.data.children.map(child => (
                  <PostCommentChild key={child.data.id} thing={child} update={update} />
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
    p:not(:last-child) { margin-bottom 18 }
    table {
      th { ta left }
      tr { border-top 1 solid $text-secondary }
      th, td { padding 10 5 }
    }
    ul, ol { margin 18 0; padding-left 30 }
  `.class,
  ups: z`color $ups;font-weight bold`.class,
  date: z`&& { color $text-subdued }`.class,
  commentInfo: z`display flex;gap 10`.class,
  author: z`font-weight bold;&& { color $text-primary }`.class
}
