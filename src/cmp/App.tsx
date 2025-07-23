import z from 'zaftig'
import { useEffect, useState } from 'preact/hooks'

import { Conf } from '@/types'
import { useStore } from '@/state'
import { init, setPosts, setPostsLoading, setSearchQuery } from '@/state/actions'
import { subscribe } from '@/state/state'

import { Button } from '../base/Button'
import { PostSelect } from './PostSelect'
import { PostComments } from './PostComments'
import { Modal } from './Modal'
import { executeSearch } from '@/lib/search'

interface Props {
  conf: Conf
  setNativeCommentsVisible(visible: boolean): void
}

export const App = ({ conf, setNativeCommentsVisible }: Props) => {
  const [searchQuery, postsLoading, noPosts] = useStore([
    s => s.searchQuery,
    s => s.postsLoading,
    s => s.posts.length <= 0
  ])

  useEffect(() => {
    init(conf)
    return subscribe([s => s.noContent], noContent => {
      if (noContent && visible) toggleVisible()
    })
  }, [])

  const [visible, setVisible] = useState(true)
  const toggleVisible = () => {
    setNativeCommentsVisible(visible)
    setVisible(!visible)
  }

  const [showQuery, setShowQuery] = useState(false)

  const message = postsLoading ? 'Loading posts…' : noPosts ? 'No posts found…' : ''

  const [open, setOpen] = useState(false)

  if (conf.mode === 'modal') {
    return (
      <>
        <button className={modalButton} onClick={() => setOpen(true)}>
          Reddit
        </button>
        <Modal open={open} onClose={() => setOpen(false)}>
          <>
            {message || (
              <div className={container}>
                <PostSelect />
                <PostComments />
              </div>
            )}
          </>
        </Modal>
      </>
    )
  }

  const isSwap = !conf.mode || conf.mode === 'swap'

  const searchQueryControl = showQuery ? (
    <div class={queryGrid}>
      <input
        type="text"
        value={searchQuery}
        onChange={async event => {
          const newSearchQuery = event.currentTarget.value
          if (!newSearchQuery.trim()) return
          setPostsLoading(true)
          setSearchQuery(newSearchQuery)
          try {
            const result = await executeSearch(conf, newSearchQuery)
            setPosts(result.posts)
          } catch (error) {
            console.error('Search failed:', error)
            setPosts([])
          }
          setPostsLoading(false)
        }}
      />
      <Button onClick={() => setShowQuery(false)}>close</Button>
    </div>
  ) : (
    <Button onClick={() => setShowQuery(true)}>Show query</Button>
  )

  return (
    <div className={container}>
      <div className={buttons}>
        {isSwap && <Button onClick={toggleVisible}>Switch comments</Button>}
        {searchQueryControl}
      </div>
      {visible &&
        (message || (
          <>
            <PostSelect />
            <PostComments />
          </>
        ))}
    </div>
  )
}

const container = z`d flex;flex-direction column;gap 5;mt 5`.class
const modalButton = z`padding 5`.class
const buttons = z`d flex;gap 4;flex-wrap nowrap;> * { flex 1 }`.class
const queryGrid = z`d grid;gap 4;gtc 1fr auto`.class
