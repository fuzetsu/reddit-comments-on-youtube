import z from 'zaftig'
import { useEffect, useMemo, useRef, useState } from 'preact/hooks'

import { API_URL } from '@/constants'
import { Comment } from '@/lib/api'
import { createStyles, decodeHTML, prettyTime, reduceCount, subURI } from '@/lib/util'
import { useStore } from '@/state'
import { CustomButton } from '@/base/CustomButton'
import { CommentBorderColors } from '@/theme'

import { ChildProps } from '../types'
import { useUpdate } from '../hooks'
import { PostCommentChild } from './PostCommentChild'
import { Icon } from '@/base/Icon'

export const PostComment = ({ thing }: ChildProps<Comment>) => {
  const {
    ups,
    author,
    body_html,
    replies,
    collapsed: dataCollapsed,
    created_utc,
    edited,
    permalink,
    depth
  } = thing.data
  const html = useMemo(() => decodeHTML(body_html), [body_html])

  const spoilerState = useMemo(() => new WeakSet<HTMLElement>(), [])

  const conf = useStore(s => s.conf)

  const ref = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const lastHeight = useRef(0)
  useEffect(() => {
    if (contentRef.current && dataCollapsed) {
      lastHeight.current = contentRef.current.scrollHeight
      contentRef.current.style.maxHeight = '0'
    }
  }, [dataCollapsed])

  const [collapsed, setCollapsed] = useState(dataCollapsed)
  const toggle = () => {
    const contentElem = contentRef.current
    if (!contentElem) return
    if (collapsed) {
      contentElem.addEventListener('transitionend', () => (contentElem.style.maxHeight = 'none'), {
        once: true
      })
    } else {
      lastHeight.current = contentElem.scrollHeight
      requestAnimationFrame(() => (contentElem.style.maxHeight = '0'))
    }
    contentElem.style.maxHeight = lastHeight.current + 'px'
    setCollapsed(!collapsed)

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
          <span className={styles.ups}>
            <Icon name="arrow-up" themeColor="ups" />
            {reduceCount(ups)}
          </span>
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
          style={{ opacity: collapsed ? 0 : 1 }}
        >
          <div style={{ paddingTop: '10px' }} />
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
    transition max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease-out
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
