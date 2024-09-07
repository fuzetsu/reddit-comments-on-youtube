import { crunchyroll } from './crunchyroll'
import { youtube } from './youtube'
import { animepahe } from './animepahe'
import { funimation } from './funimation'
import { dramacool } from './dramacool'

const confs = {
  crunchyroll,
  youtube,
  animepahe,
  funimation,
  dramacool
} as const

const confNames = Object.keys(confs) as (keyof typeof confs)[]

export const getConf = () => {
  const host = location.hostname
  const confName = confNames.find(name => host.includes(name))
  return confName ? { conf: confs[confName], confName } : {}
}
