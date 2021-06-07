import { render } from 'preact'
import { PostSelect } from './cmp/PostSelect'
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
  waitForUrl({
    onmatch: async () => {
      const posts = await conf.getPosts()
      log('loaded', posts)
      render(<PostSelect posts={posts} />, document.body)
    }
  })
}
