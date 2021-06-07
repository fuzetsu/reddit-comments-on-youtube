import type { Post } from './lib/api'

export interface Conf {
  commentSelector: string
  isMatch(): boolean
  getPosts(): Promise<Post[]>
  theme?: string
}
