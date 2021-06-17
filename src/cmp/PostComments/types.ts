import { CommentChild } from 'lib/api'

export interface UpdateFn {
  (fn: (parent: CommentChild[]) => void): void
}

export interface ChildProps<T extends CommentChild> {
  thing: T
  update: UpdateFn
}
