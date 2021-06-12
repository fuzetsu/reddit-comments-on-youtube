import { useState } from 'preact/hooks'
import z from 'zaftig'
import { Post } from '../lib/api'

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
          <div className={styles.numComments}>{post.num_comments}</div>
          <div title={post.subreddit} className={styles.subreddit}>
            /r/{post.subreddit}
          </div>
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

const styles = {
  container: z`display grid;grid-template-columns 1fr 1fr;gap 4`.class,
  toggleEmpty: buttonBase.class,
  item: buttonBase.concat(z`
    text-align left
    display grid
    grid-template-columns minmax(min-content, 1fr) 2fr 7fr
    > div {
      padding 10
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
    }
  `).class,
  numComments: z`
    && { padding 10 3 }
    font-weight bold
    text-align center
  `.class,
  subreddit: z``.class
}
