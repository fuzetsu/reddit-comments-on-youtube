import { crunchyroll } from './crunchyroll'
import { youtube } from './youtube'

const confs = {
  crunchyroll,
  youtube
} as const

const confNames = Object.keys(confs) as (keyof typeof confs)[]

export const getConf = () => {
  const host = location.hostname
  const mode = confNames.find(name => host.includes(name))
  return mode ? confs[mode] : null
}
