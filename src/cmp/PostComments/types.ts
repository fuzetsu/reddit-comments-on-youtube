import { CommentChild } from '@/lib/api'
import { useUpdateComments } from './hooks'

export type UpdateFn = (fn: (parent: CommentChild[]) => void) => void

export interface ChildProps<T extends CommentChild> {
  thing: T
  update: ReturnType<typeof useUpdateComments>
}
