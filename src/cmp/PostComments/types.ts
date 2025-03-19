import { CommentChild } from '@/lib/api'
import { useUpdateComments } from './hooks'

export interface UpdateFn {
  (fn: (parent: CommentChild[]) => void): void
}

export interface ChildProps<T extends CommentChild> {
  thing: T
  update: ReturnType<typeof useUpdateComments>
}
