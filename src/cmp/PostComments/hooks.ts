import { CommentChild } from '@/lib/api'
import { useRedraw, useUpdatingRef } from '@/lib/hooks'
import { useMemo } from 'preact/hooks'

export const useUpdateComments = (parent: CommentChild[]) => {
  const redraw = useRedraw()
  const parentRef = useUpdatingRef(parent)

  return useMemo(
    () => ({
      replace(self: CommentChild, ...replacements: CommentChild[]) {
        const currentPosition = parentRef.current.indexOf(self)
        if (currentPosition >= 0) parentRef.current.splice(currentPosition, 1, ...replacements)
        redraw()
      }
    }),
    []
  )
}
