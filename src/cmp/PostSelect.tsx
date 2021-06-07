import { Post } from '../lib/api'

interface Props {
  posts: Post[]
}

export const PostSelect = ({ posts }: Props) => {
  return (
    <div>
      {posts.map(post => (
        <div>{post.title}</div>
      ))}
    </div>
  )
}
