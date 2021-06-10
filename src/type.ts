import z from 'zaftig'
import type { Post } from './lib/api'

export interface Conf {
  commentSelector: string
  isMatch(): boolean
  getPosts(): Promise<Post[]>
  dark?: boolean
  theme?: ReturnType<typeof z>
}
