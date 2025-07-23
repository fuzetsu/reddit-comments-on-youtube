import z from 'zaftig'
import { Theme } from '@/theme'

export interface SearchContext {
  title?: string
  episode?: string
  baseQuery: string
}

export interface Conf {
  areaSelector: string
  mode?: 'modal' | 'insert' | 'swap'
  isMatch?(url: string): boolean
  dark?: boolean
  theme?: Theme
  waitFor?: string | (() => boolean)
  scrollOffset?: number | (() => number)
  subredditFilters?: string[]
  buildSearchContext(): SearchContext | Promise<SearchContext>
}

export type ZaftigStyle = ReturnType<typeof z>
