import { useState } from 'preact/hooks'
import z from 'zaftig'
import { Icon } from 'base/Icon'
import { createStyles, reduceCount } from 'lib/util'
import { useStore } from 'state'
import { loadComments, setActivePost } from 'state/actions'

const MAX_INITIAL_VISIBLE = 7

export const PostSelect = () => {
  const [posts, activePost] = useStore([s => s.posts, s => s.activePost])
  const [showAll, setShowAll] = useState(false)

  const visiblePosts = posts.filter(post => post.num_comments > 0).slice(0, MAX_INITIAL_VISIBLE)
  const hiddenCount = posts.length - visiblePosts.length

  let list = showAll ? posts : visiblePosts

  // always show selected post
  if (activePost && list.every(post => post.id !== activePost.id)) list = [...list, activePost]

  if (list.length <= 0) return null

  return (
    <div className={styles.container}>
      {list.map(post => (
        <button
          key={post.name}
          className={z.concat(styles.item, post === activePost && styles.activeItem).class}
          onClick={() => (post === activePost ? loadComments(post) : setActivePost(post))}
        >
          <div className={styles.postInfo}>
            <div className={styles.subreddit} title={post.subreddit}>r/{post.subreddit}</div>
            <div className={styles.numComments}>
              <Icon name="message-circle" /> {reduceCount(post.num_comments)}
            </div>
          </div>
          <div className={styles.title} title={post.title}>{post.title}</div>
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

const styles = createStyles({
  container: z`
    display flex
    flex-direction column
    gap 8
    max-height 300px
    overflow-y auto
    padding 8
    background $background
    border-radius 8
  `,
  item: z`
    cursor pointer
    border none
    margin 0
    padding 12 16
    text-align left
    display flex
    flex-direction column
    gap 4
    background $button-background
    border-radius 6
    transition all 0.2s ease
    &:hover {
      opacity 0.8
    }
  `,
  activeItem: z`
    border 2px solid $ups
    &:hover {
      opacity 1
    }
  `,
  postInfo: z`
    display flex
    justify-content space-between
    align-items center
  `,
  subreddit: z`
    font-weight bold
    color $text-subdued
  `,
  numComments: z`
    display flex
    align-items center
    gap 4
    color $text-subdued
    font-size 0.9em
  `,
  title: z`
    font-size 1.1em
    color $text-normal
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  `,
  toggleEmpty: z`
    cursor pointer
    border none
    background none
    color $text-subdued
    padding 8
    text-align center
    &:hover {
      text-decoration underline
    }
  `
})
