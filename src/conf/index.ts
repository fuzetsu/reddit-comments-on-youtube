import { crunchyroll } from './crunchyroll'
import { youtube } from './youtube'
import { aniwave } from './aniwave'
import { funimation } from './funimation'

const confs = {
  crunchyroll,
  youtube,
  aniwave,
  funimation
} as const

const confNames = Object.keys(confs) as (keyof typeof confs)[]

export const getConf = () => {
  const host = location.hostname
  const confName = confNames.find(name => host.includes(name))
  return confName ? { conf: confs[confName], confName } : {}
}
