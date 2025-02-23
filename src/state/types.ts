import { FunctionPatch } from 'mergerino'
import { CommentChild, Post } from '@/lib/api'
import { Conf } from '@/types'

export interface State {
  conf: Conf
  firstLoad: boolean
  commentsLoading: boolean
  comments: CommentChild[]
  postsLoading: boolean
  posts: Post[]
  activePost?: Post
  noContent: boolean
}

export type KeySetter<T> = <K extends keyof T>(
  key: K
) => (value: T[K] | FunctionPatch<T[K]>) => void
