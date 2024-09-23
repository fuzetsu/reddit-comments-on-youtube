import { CommentChild } from '@/lib/api'
import { ChildProps } from '../types'
import { LoadMoreButton } from './LoadMoreButton'
import { PostComment } from './PostComment'

export function PostCommentChild({ thing, ...rest }: ChildProps<CommentChild>) {
  switch (thing.kind) {
    case 'more':
      return <LoadMoreButton {...{ thing, ...rest }} />
    case 't1':
      return <PostComment {...{ thing, ...rest }} />
    default:
      throw new Error('unknown child type')
  }
}
