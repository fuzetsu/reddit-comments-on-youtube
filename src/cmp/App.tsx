import { PostSelect } from './PostSelect'
import { useEffect } from 'preact/hooks'
import { PostComments } from './PostComments'
import { Conf } from 'types'
import { useStore } from 'state'
import { init } from 'state/actions'
import { subscribe } from 'state/state'

interface Props {
  conf: Conf
  onNoContent(): void
}

export const App = ({ conf, onNoContent }: Props) => {
  const [postsLoading, noPosts] = useStore([s => s.postsLoading, s => s.posts.length <= 0])

  useEffect(() => {
    init(conf)
    return subscribe([s => s.noContent], noContent => {
      if (noContent) onNoContent()
    })
  }, [])

  if (postsLoading) return <div>Loading posts…</div>
  if (noPosts) return <div>No posts found…</div>

  return (
    <>
      <PostSelect />
      <PostComments />
    </>
  )
}
