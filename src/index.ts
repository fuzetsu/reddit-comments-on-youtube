import { confs, confNames } from './conf'
import { log, logError } from './lib/util'
import { waitForUrl } from './lib/wait-for-url'

log('started!')

const host = location.hostname
const mode = confNames.find(name => host.includes(name))

if (!mode) {
  logError('encountered unknown host', host)
} else {
  const conf = confs[mode]
  conf.getPosts().then(log)
  // waitForUrl({ onmatch: () => {} })
}
