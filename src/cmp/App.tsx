import { Post } from 'lib/api'
import { PostSelect } from './PostSelect'
import { useEffect, useState } from 'preact/hooks'
import { PostComments } from './PostComments'
import { Conf } from 'types'
import { sleep } from 'lib/util'

interface Props {
  conf: Conf
  onNoContent(): void
}

export const App = ({ conf, onNoContent }: Props) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [selected, setSelected] = useState<Post | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const [first, setFirst] = useState(true)

  useEffect(() => {
    setLoading(true)
    conf.getPosts().then(posts => {
      setLoading(false)
      setPosts(posts)
      if (posts[0]) setSelected(posts[0])
      else sleep(1500).then(onNoContent)
    })
  }, [])

  if (loading) return <div>Loading posts…</div>
  if (posts.length <= 0) return <div>No posts found…</div>
  if (!selected) return <div>Something went wrong :(</div>

  const handleFirst = (arr: unknown[]) => {
    if (first) {
      setFirst(false)
      if (arr.length <= 0) onNoContent()
    }
  }

  return (
    <>
      <PostSelect posts={posts} selected={selected} onSelect={setSelected} />
      <PostComments conf={conf} post={selected} onLoad={handleFirst} />
    </>
  )
}
