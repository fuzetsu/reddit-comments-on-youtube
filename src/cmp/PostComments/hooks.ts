import { CommentChild } from 'lib/api'
import { useRedraw } from 'lib/hooks'
import { UpdateFn } from './types'

export const useUpdate = (parent: CommentChild[]) => {
  const redraw = useRedraw()
  const update: UpdateFn = fn => {
    fn(parent)
    redraw()
  }
  return update
}
