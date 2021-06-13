import { createContext } from 'preact'
import { useContext } from 'preact/hooks'
import { CommentChild } from 'lib/api'
import { useRedraw } from 'lib/hooks'
import { Props, UpdateFn } from './types'

export const useUpdate = (parent: CommentChild[]) => {
  const redraw = useRedraw()
  const update: UpdateFn = fn => {
    fn(parent)
    redraw()
  }
  return update
}

export const CommentCtx = createContext({} as Props)
export const useCommentCtx = () => useContext(CommentCtx)
