import z from 'zaftig'
import { useMemo, useRef, useEffect, useState } from 'preact/hooks'
import { API_URL } from 'constants'
import { Comment } from 'lib/api'
import { useRedraw } from 'lib/hooks'
import { createStyles, decodeHTML, prettyTime, reduceCount, subURI } from 'lib/util'
import { useUpdate } from '../hooks'
import { ChildProps } from '../types'
import { PostCommentChild } from './PostCommentChild'
import { useStore } from 'state'
import { CustomButton } from 'base/CustomButton'
import { CommentBorderColors } from 'theme'

export const PostComment = ({ thing }: ChildProps<Comment>) => {
  const { ups, author, body_html, replies, collapsed, created_utc, edited, permalink, depth } =
    thing.data
  const html = useMemo(() => decodeHTML(body_html), [body_html])

  const spoilerState = useMemo(() => new WeakSet<HTMLElement>(), [])

  const conf = useStore(s => s.conf)

  const redraw = useRedraw()
  const ref = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight)
    }
  }, [html, replies])

  const toggle = () => {
    thing.data.collapsed = !collapsed
    redraw()

    const offset = typeof conf.scrollOffset === 'function' ? conf.scrollOffset() : conf.scrollOffset
    if (ref.current && ref.current.getBoundingClientRect().top < (offset ?? 0)) {
      ref.current.scrollIntoView()
      if (offset) window.scrollBy(0, -offset)
    }
  }

  const update = useUpdate(thing.data.replies ? thing.data.replies.data.children : [])

  const createdTime = new Date(created_utc * 1000)
  const editedTime = edited && new Date(edited * 1000)
  const differentDay = editedTime && createdTime.getDate() !== editedTime.getDate()

  const ariaLabel = (collapsed ? 'expand' : 'collapse') + ' comment'

  const borderColors = CommentBorderColors[conf.dark ? 'night' : 'day']
  const borderClassName = z.concat(
    styles.border,
    z`$color ${borderColors[depth % borderColors.length]}`
  ).class

  return (
    <div className={styles.comment}>
      <CustomButton tag="div" aria-label={ariaLabel} className={borderClassName} onClick={toggle} />
      <div>
        <div ref={ref} className={styles.commentInfo}>
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
        <div
          className={styles.commentContent}
          ref={contentRef}
          style={{
            marginTop: collapsed ? '' : '10px',
            maxHeight: collapsed ? '0' : contentHeight ? `${contentHeight}px` : 'none',
            opacity: collapsed ? 0 : 1
          }}
        >
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: html }}
            onClick={e => {
              if (e.target instanceof HTMLAnchorElement) {
                e.preventDefault()
                const url = e.target.href
                window.open(url.startsWith('/') ? API_URL + url : url)
              } else if (e.target instanceof HTMLElement) {
                if (e.target.classList.contains('md-spoiler-text')) {
                  if (spoilerState.has(e.target)) {
                    e.target.dataset.open = 'false'
                    spoilerState.delete(e.target)
                  } else {
                    e.target.dataset.open = 'true'
                    spoilerState.add(e.target)
                  }
                }
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
        </div>
      </div>
    </div>
  )
}

const styles = createStyles({
  comment: z`
    display grid
    grid-template-columns auto 1fr
    :not(:last-child) { margin-bottom 18 }
    gap 18
  `,
  commentContent: z`
    overflow hidden
    transition max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out, margin 0.3s ease-out
  `,
  replies: z`margin-top 18`,
  border: z`
    position relative
    padding 9
    margin -9
    user-select none
    cursor pointer

    :hover,:focus { opacity 0.5 }
    ::after {
      display block
      content ' '
      background $color
      height 100%
      width 4
    }
  `,
  body: z`
    blockquote {
      border-left 3 solid $text-subdued
      padding 5 10
      margin 10 0
      color $text-subdued
    }
    p { margin 0;padding 0 }
    p:not(:last-child) { margin-bottom 18 }
    table {
      th { ta left }
      tr { border-top 1 solid $text-secondary }
      th, td { padding 10 5 }
    }
    ul, ol { margin 18 0; padding-left 30 }
    a { color $link-color !important }
  `,
  ups: z`color $ups;font-weight bold`,
  date: z`&& { color $text-subdued }`,
  commentInfo: z`display flex;gap 10`,
  author: z`font-weight bold;&& { color $text-primary }`
})
