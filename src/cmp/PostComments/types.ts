import { CommentChild, Post } from '../../lib/api'
import { Conf } from '../../type'

export interface UpdateFn {
  (fn: (parent: CommentChild[]) => void): void
}

export interface ChildProps<T extends CommentChild> {
  thing: T
  update: UpdateFn
}

export interface Props {
  post: Post
  conf: Conf
}
