import { crunchyroll } from './crunchyroll'
import { youtube } from './youtube'

export const confs = {
  crunchyroll,
  youtube
} as const

export const confNames = Object.keys(confs) as (keyof typeof confs)[]
