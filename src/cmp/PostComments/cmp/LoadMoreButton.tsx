import { useState } from 'preact/hooks'
import z from 'zaftig'

import { getMoreComments, LoadMore } from '@/lib/api'
import { sleep } from '@/lib/util'
import { useStore } from '@/state'
import { createStyles } from '@/theme'

import { ChildProps } from '../types'

export const LoadMoreButton = ({ thing, update }: ChildProps<LoadMore>) => {
  const activePost = useStore(s => s.activePost)

  const [loading, setLoading] = useState(false)
  const [failed, setFailed] = useState(false)

  const { count, children } = thing.data
  if (count <= 0) return null

  const label = failed
    ? "Can't find those dang comments"
    : `${loading ? 'Loading' : 'Load'} ${count} more comments`

  const onClick = async () => {
    setLoading(true)
    // not possible for activePost to be null if comments are loaded
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const results = await getMoreComments(activePost!.name, children)
    setLoading(false)

    if (results.length <= 0) {
      setFailed(true)
      await sleep(1200)
    }

    update.replace(thing, ...results)
  }

  return (
    <div className={styles.wrapper}>
      <button disabled={loading || failed} className={styles.button} onClick={onClick}>
        {label}
      </button>
    </div>
  )
}

const styles = createStyles({
  wrapper: z`:not(:last-child) { margin-bottom 18 }`,
  button: z`padding 5 10;border none`
})
