import { JSX, render } from 'preact'
import { App } from './cmp/App'
import { SwitchComments } from './cmp/SwitchComments'
import { getConf } from './conf'
import { log, logError } from './lib/util'
import { waitForElems } from './lib/wait-for-elems'
import { waitForUrl } from './lib/wait-for-url'
import { generateTheme, theme } from './theme'
import { Conf } from './type'

log('started!')

const conf = getConf()

if (!conf) {
  logError('encountered unknown host', location.hostname)
} else {
  waitForUrl({
    matcher: 'any',
    onmatch: url => {
      log('url changed', url)
      if (!conf.isMatch()) {
        log("but it's not a match...")
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
    appWrapper.style.display = hideReddit ? 'none' : ''
  }

  const [removeSwitch] = insertBefore(comments, conf, <SwitchComments onSwitch={switchComments} />)
  const [removeApp, appWrapper] = insertBefore(
    comments,
    conf,
    <App conf={conf} switchComments={switchComments} />
  )

  // cleanup
  return () => {
    removeApp()
    removeSwitch()
  }
}

const unmount = (elem: HTMLElement) => {
  render(null, elem)
  elem.remove()
}

const insertBefore = (before: HTMLElement, conf: Conf, view: JSX.Element) => {
  const wrapper = document.createElement('div')

  wrapper.className = theme.common.concat(
    conf.dark ? theme.dark : theme.light,
    conf.theme && generateTheme(conf.theme)
  ).class

  before.parentElement!.insertBefore(wrapper, before)

  render(view, wrapper)

  return [() => unmount(wrapper), wrapper] as const
}
