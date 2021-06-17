import { useState } from 'preact/hooks'
import z from 'zaftig'
import { Icon } from 'base/Icon'
import { createStyles, reduceCount } from 'lib/util'
import { useStore } from 'state'
import { setActivePost } from 'state/actions'

export const PostSelect = () => {
  const [posts, activePost] = useStore([s => s.posts, s => s.activePost])
  const [showEmpty, setShowEmpty] = useState(false)

  const postsWithComments = posts.filter(post => post.num_comments > 0)
  const emptyCount = posts.length - postsWithComments.length

  let list = showEmpty ? posts : postsWithComments

  // always show selected post
  if (activePost && !list.includes(activePost)) list = [...list, activePost]

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
      {emptyCount > 0 && posts.length > 1 && (
        <button className={styles.toggleEmpty} onClick={() => setShowEmpty(!showEmpty)}>
          {showEmpty ? 'Hide' : `Show`} {emptyCount} posts without comments
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
