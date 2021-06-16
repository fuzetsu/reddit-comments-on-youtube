import { useState } from 'preact/hooks'
import z from 'zaftig'
import { Icon } from 'base/Icon'
import { Post } from 'lib/api'
import { createStyles, reduceCount } from 'lib/util'

interface Props {
  posts: Post[]
  selected: Post
  onSelect(selected: Post): void
}

export const PostSelect = ({ posts, selected, onSelect }: Props) => {
  const [showEmpty, setShowEmpty] = useState(false)

  const postsWithComments = posts.filter(post => post.num_comments > 0)
  const emptyCount = posts.length - postsWithComments.length

  const list = showEmpty ? posts : postsWithComments

  return (
    <div className={styles.container}>
      {list.map(post => (
        <button
          className={styles.item}
          style={{ borderBottomColor: post === selected ? 'var(--text-secondary)' : '' }}
          onClick={() => onSelect(post)}
        >
          <div className={styles.numComments}>
            <Icon name="message-circle" /> {reduceCount(post.num_comments)}
          </div>
          <div title={post.subreddit}>/r/{post.subreddit}</div>
          <div title={post.title}>{post.title}</div>
        </button>
      ))}
      {emptyCount > 0 && (
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
