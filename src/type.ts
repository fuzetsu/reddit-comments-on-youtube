import { Post } from './lib/api'
import { Theme } from './theme'

export interface Conf {
  commentSelector: string
  isMatch(): boolean
  getPosts(): Promise<Post[]>
  dark?: boolean
  theme?: Theme
  scrollOffset?: number | (() => number)
}
