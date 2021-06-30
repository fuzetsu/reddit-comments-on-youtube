import { CommentChild } from 'lib/api'
import { useRedraw, useUpdatingRef } from 'lib/hooks'
import { useCallback } from 'preact/hooks'
import { UpdateFn } from './types'

export const useUpdate = (parent: CommentChild[]) => {
  const redraw = useRedraw()
  const parentRef = useUpdatingRef(parent)
  const update: UpdateFn = useCallback(fn => {
    fn(parentRef.current)
    redraw()
  }, [])
  return update
}
