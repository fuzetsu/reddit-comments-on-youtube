import z from 'zaftig'
import { Post } from 'lib/api'
import { Theme } from 'theme'

export interface Conf {
  areaSelector: string
  modal?: boolean
  isMatch(url: string): boolean
  getPosts(): Promise<Post[]>
  dark?: boolean
  theme?: Theme
  scrollOffset?: number | (() => number)
}

export type ZaftigStyle = ReturnType<typeof z>
