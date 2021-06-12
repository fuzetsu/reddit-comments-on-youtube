import { JSX, render } from 'preact'
import { App } from './cmp/App'
import { SwitchComments } from './cmp/SwitchComments'
import { confs, confNames } from './conf'
import { log, logError } from './lib/util'
import { waitForElems } from './lib/wait-for-elems'
import { waitForUrl } from './lib/wait-for-url'
import { theme } from './theme'
import { Conf } from './type'

log('started!')

const host = location.hostname
const mode = confNames.find(name => host.includes(name))

if (!mode) {
  logError('encountered unknown host', host)
} else {
  const conf = confs[mode]
  waitForUrl({
    matcher: 'any',
    onmatch: url => {
      log('url changed', url)
      if (!conf.isMatch()) {
        log('but its not a match...')
        return
      }
      log('its a match! looking for comments area')

      const cleanup: (() => void)[] = []

      const wait = waitForElems({
        selector: conf.commentSelector,
        stopWaiting: true,
        onmatch: comments => {
          log('comments area found', comments)
          cleanup.push(mount(conf, comments))
        }
      })

      cleanup.push(wait.stop)

      return () => {
        log('leaving page cleaning up', cleanup)
        cleanup.forEach(fn => fn())
      }
    }
  })
}

const mount = (conf: Conf, comments: HTMLElement) => {
  // hide comments
  comments.style.display = 'none'

  // render switch comments
  let hideReddit = false
  const switchComments = () => {
    hideReddit = !hideReddit
    comments.style.display = hideReddit ? '' : 'none'
    app.style.display = hideReddit ? 'none' : ''
  }

  const [, removeSwitch] = insertBefore(
    comments,
    conf,
    <SwitchComments onSwitch={switchComments} />
  )
  const [app, removeApp] = insertBefore(comments, conf, <App conf={conf} />)

  // cleanup
  return () => {
    removeApp()
    removeSwitch()
  }
}

const insertBefore = (before: HTMLElement, conf: Conf, view: JSX.Element) => {
  const className = theme.common.concat(conf.dark ? theme.dark : theme.light).class
  const wrapper = document.createElement('div')
  wrapper.className = className
  if (conf.theme) {
    const themeLayer = document.createElement('div')
    themeLayer.className = conf.theme.class
    wrapper.appendChild(themeLayer)
  }
  before.parentElement!.insertBefore(wrapper, before)

  const target = wrapper.firstElementChild || wrapper
  render(view, target)
  return [
    wrapper,
    () => {
      render(null, target)
      target.remove()
    }
  ] as const
}
