import { createContext } from 'preact'
import { useContext } from 'preact/hooks'
import { CommentChild, Post } from 'lib/api'
import { useRedraw } from 'lib/hooks'
import { UpdateFn } from './types'
import { Conf } from 'types'

export const useUpdate = (parent: CommentChild[]) => {
  const redraw = useRedraw()
  const update: UpdateFn = fn => {
    fn(parent)
    redraw()
  }
  return update
}

export const CommentCtx = createContext({} as { post: Post; conf: Conf })
export const useCommentCtx = () => useContext(CommentCtx)
