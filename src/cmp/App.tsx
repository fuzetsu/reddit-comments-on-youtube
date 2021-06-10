import { Post } from '../lib/api'
import { PostSelect } from './PostSelect'
import { useState } from 'preact/hooks'
import { PostComments } from './PostComments'

interface Props {
  posts: Post[]
}

export const App = ({ posts }: Props) => {
  const [post, setPost] = useState(posts[0])
  return (
    <section>
      <PostSelect posts={posts} selected={post} onSelect={setPost} />
      <PostComments post={post} />
    </section>
  )
}
