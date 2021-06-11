import { render } from 'preact'
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

  const main = comments.parentElement!

  // const isNight =
  const className = theme.common.concat(conf.dark ? theme.dark : theme.light).class
  const elem = () => {
    const wrapper = document.createElement('div')
    wrapper.className = className
    if (conf.theme) {
      const themeLayer = document.createElement('div')
      themeLayer.className = conf.theme.class
      wrapper.appendChild(themeLayer)
    }
    return wrapper
  }

  // render app
  const appContainer = elem()
  main.insertBefore(appContainer, comments)

  render(<App conf={conf} />, appContainer.firstElementChild || appContainer)

  // render switch comments
  const switchContainer = elem()
  main.insertBefore(switchContainer, appContainer)

  let hideReddit = false
  const switchComments = () => {
    hideReddit = !hideReddit
    comments.style.display = hideReddit ? '' : 'none'
    appContainer.style.display = hideReddit ? 'none' : ''
  }
  render(
    <SwitchComments onSwitch={switchComments} />,
    switchContainer.firstElementChild || switchContainer
  )

  // cleanup
  return () => {
    appContainer.remove()
    switchContainer.remove()
  }
}
