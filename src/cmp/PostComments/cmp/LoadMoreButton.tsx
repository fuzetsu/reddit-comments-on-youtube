import { useState } from 'preact/hooks'
import z from 'zaftig'
import { getMoreComments, LoadMore } from 'lib/api'
import { sleep } from 'lib/util'
import { useCommentCtx } from '../hooks'
import { ChildProps } from '../types'

export const LoadMoreButton = ({ thing, update }: ChildProps<LoadMore>) => {
  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)

  const { post } = useCommentCtx()

  const { count, children } = thing.data
  if (count <= 0) return null

  const label = failed
    ? "Can't find those dang comments"
    : `${loading ? 'Loading' : 'Load'} ${count} more comments`

  return (
    <div className={z`:not(:last-child) { margin-bottom 18 }`.class}>
      <button
        disabled={loading || failed}
        className={z`padding 5 10;border none`.class}
        onClick={async () => {
          setLoading(true)
          const results = await getMoreComments(post.name, children)
          setLoading(false)
          if (results.length <= 0) {
            setFailed(true)
            await sleep(1200)
          }
          update(parent => {
            const currentPosition = parent.indexOf(thing)
            if (currentPosition >= 0) parent.splice(currentPosition, 1, ...results)
          })
        }}
      >
        {label}
      </button>
    </div>
  )
}
