import { useState, useEffect } from 'preact/hooks'
import z from 'zaftig'
import { Icon } from 'base/Icon'
import { createStyles, reduceCount } from 'lib/util'
import { useStore } from 'state'
import { loadComments, setActivePost } from 'state/actions'

const MAX_INITIAL_VISIBLE = 7
const MIN_SHIMMER_DURATION = 700

export const PostSelect = () => {
  const [posts, activePost, commentsLoading] = useStore([
    s => s.posts,
    s => s.activePost,
    s => s.commentsLoading
  ])
  const [showAll, setShowAll] = useState(false)
  const [isShimmering, setIsShimmering] = useState(false)
  const [shimmerVisible, setShimmerVisible] = useState(false)

  useEffect(() => {
    if (commentsLoading) {
      setIsShimmering(true)
      setShimmerVisible(true)
      setTimeout(() => {
        setIsShimmering(false)
        setTimeout(() => {
          setShimmerVisible(false)
        }, 300) // Fade out duration
      }, MIN_SHIMMER_DURATION)
    }
  }, [commentsLoading])

  const visiblePosts = posts.filter(post => post.num_comments > 0).slice(0, MAX_INITIAL_VISIBLE)
  const hiddenCount = posts.length - visiblePosts.length

  let list = showAll ? posts : visiblePosts

  // always show selected post
  if (activePost && list.every(post => post.id !== activePost.id)) list = [...list, activePost]

  if (list.length <= 0) return null

  return (
    <div className={z.concat(styles.container, list.length === 1 && z`gtc 1fr`).class}>
      {list.map(post => (
        <button
          key={post.name}
          className={
            z.concat(
              styles.button,
              styles.item,
              post === activePost && styles.activeItem,
              post === activePost && (commentsLoading || shimmerVisible) && styles.shimmer,
              post === activePost && !isShimmering && shimmerVisible && styles.shimmerFadeOut
            ).class
          }
          onClick={() => (post === activePost ? loadComments(post) : setActivePost(post))}
        >
          <div className={styles.postInfo}>
            <div className={styles.subreddit} title={post.subreddit}>
              r/{post.subreddit}
            </div>
            <div className={styles.numComments}>
              <Icon name="message-circle" /> {reduceCount(post.num_comments)}
            </div>
          </div>
          <div className={styles.title} title={post.title}>
            {post.title}
          </div>
        </button>
      ))}
      {hiddenCount > 0 && posts.length > 1 && (
        <button
          className={z.concat(styles.button, styles.toggleEmpty).class}
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? `Hide ${hiddenCount} posts` : `Show ${hiddenCount} hidden posts`}
        </button>
      )}
    </div>
  )
}

const shimmer = z.anim`
  100% {
    transform translateX(100%)
  }
`

const styles = createStyles({
  container: z`
    display grid
    grid-template-columns 1fr 1fr
    gap 8
    padding 8 0
    background $background
    border-radius 8
  `,
  button: z`
    cursor pointer
    border none
    background $button-background
    overflow hidden
    margin 0
    text-align left
    transition all 0.2s ease
    border-radius 6
    padding 6 10
    &:hover {
      opacity 0.8
    }
  `,
  item: z`
    display flex
    flex-direction column
    gap 4
  `,
  activeItem: z`
    outline 2px solid $ups !important
    &:hover {
      opacity 1
    }
  `,
  postInfo: z`
    display flex
    justify-content space-between
    align-items center
  `,
  subreddit: z`font-weight 500 color;$text-subdued`,
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
  toggleEmpty: z` color $text-subdued;text-align center`,
  shimmer: z`
    position relative
    overflow hidden
    &::after {
      content ''
      position absolute
      top 0
      right 0
      bottom 0
      left 0
      transform translateX(-100%)
      background-image linear-gradient( 90deg, rgba(255, 255, 255, 0) 0, rgba(255, 255, 255, 0.2) 20%, rgba(255, 255, 255, 0.5) 60%, rgba(255, 255, 255, 0))
      animation ${shimmer} 2s infinite
      transition opacity 0.3s ease-out
    }
  `,
  shimmerFadeOut: z`
    &::after {
      opacity 0
    }
  `
})
