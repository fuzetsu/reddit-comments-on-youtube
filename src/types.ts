import z from 'zaftig'
import { Post } from '@/lib/api'
import { Theme } from '@/theme'

export interface Conf {
  areaSelector: string
  mode?: 'modal' | 'insert' | 'swap'
  isMatch?(url: string): boolean
  getPosts(): Promise<{ posts?: Post[]; query?: string }>
  dark?: boolean
  theme?: Theme
  waitFor?: string | (() => boolean)
  scrollOffset?: number | (() => number)
}

export type ZaftigStyle = ReturnType<typeof z>
