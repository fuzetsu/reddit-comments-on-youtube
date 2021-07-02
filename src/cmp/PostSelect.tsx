import { useState } from 'preact/hooks'
import z from 'zaftig'
import { Icon } from 'base/Icon'
import { createStyles, reduceCount } from 'lib/util'
import { useStore } from 'state'
import { setActivePost } from 'state/actions'

const MAX_INITIAL_VISIBLE = 7

export const PostSelect = () => {
  const [posts, activePost] = useStore([s => s.posts, s => s.activePost])
  const [showAll, setShowAll] = useState(false)

  const visiblePosts = posts.filter(post => post.num_comments > 0).slice(0, MAX_INITIAL_VISIBLE)
  const hiddenCount = posts.length - visiblePosts.length

  let list = showAll ? posts : visiblePosts

  // always show selected post
  if (activePost && !list.includes(activePost)) list = [...list, activePost]

  if (list.length <= 0) return null

  return (
    <div className={styles.container}>
      {list.map(post => (
        <button
          key={post.name}
          className={styles.item}
          style={{ borderBottomColor: post === activePost ? 'var(--text-secondary)' : '' }}
          onClick={() => setActivePost(post)}
        >
          <div className={styles.numComments}>
            <Icon name="message-circle" /> {reduceCount(post.num_comments)}
          </div>
          <div title={post.subreddit}>/r/{post.subreddit}</div>
          <div title={post.title}>{post.title}</div>
        </button>
      ))}
      {hiddenCount > 0 && posts.length > 1 && (
        <button className={styles.toggleEmpty} onClick={() => setShowAll(!showAll)}>
          {showAll ? `Hide ${hiddenCount} posts` : `Show ${hiddenCount} hidden posts`}
        </button>
      )}
    </div>
  )
}

const buttonBase = z`
  cursor pointer
  border none
  margin 0
  padding 0
  border-bottom 4px solid $button-background
`

const styles = createStyles({
  container: z`display grid;grid-template-columns 1fr 1fr;gap 4`,
  toggleEmpty: buttonBase.concat(z`padding 10`),
  item: buttonBase.concat(z`
    text-align left
    display grid
    grid-template-columns minmax(min-content, 65px) 2fr 6fr
    > div {
      padding 10 5
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    }
  `),
  numComments: z`font-weight bold`
})
