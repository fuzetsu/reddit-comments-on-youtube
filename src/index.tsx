import { JSX, render } from 'preact'
import { App } from 'cmp/App'
import { SwitchComments } from 'cmp/SwitchComments'
import { getConf } from 'conf'
import { log, logError } from 'lib/util'
import { waitForElems } from 'lib/wait-for-elems'
import { waitForUrl } from 'lib/wait-for-url'
import { generateTheme, themes } from 'theme'
import { Conf } from 'types'

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
    <App conf={conf} onNoContent={() => !hideReddit && switchComments()} />
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

  wrapper.className = themes.common.concat(
    conf.dark ? themes.dark : themes.light,
    conf.theme && generateTheme(conf.theme)
  ).class

  // if parentElement is actually null, then just crash m8
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  before.parentElement!.insertBefore(wrapper, before)

  render(view, wrapper)

  return [() => unmount(wrapper), wrapper] as const
}
