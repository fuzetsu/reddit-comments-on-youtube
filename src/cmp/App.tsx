import { Post } from '../lib/api'
import { PostSelect } from './PostSelect'
import { useEffect, useState } from 'preact/hooks'
import { PostComments } from './PostComments'
import { Conf } from '../type'

interface Props {
  conf: Conf
}

export const App = ({ conf }: Props) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [selected, setSelected] = useState<Post | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    conf.getPosts().then(posts => {
      setLoading(false)
      setPosts(posts)
      setSelected(posts[0])
    })
  }, [])

  if (loading) return <div>Loading posts...</div>
  if (!selected) return <div>Something went wrong :(</div>

  return (
    <>
      <PostSelect posts={posts} selected={selected} onSelect={setSelected} />
      <PostComments post={selected} />
    </>
  )
}
