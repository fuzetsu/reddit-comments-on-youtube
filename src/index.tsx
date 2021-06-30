import { render } from 'preact'
import { App } from 'cmp/App'
import { getConf } from 'conf'
import { log, logError } from 'lib/util'
import { waitForElems } from 'lib/wait-for-elems'
import { waitForUrl } from 'lib/wait-for-url'
import { generateTheme, themes } from 'theme'
import { Conf } from 'types'

log('started!')

const { conf, confName } = getConf()

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
          cleanup.push(mountApp(conf, comments))
        }
      })

      cleanup.push(wait.stop)

      return () => {
        log('leaving page cleaning up')
        cleanup.forEach(fn => fn())
      }
    }
  })
}

function mountApp(conf: Conf, comments: HTMLElement) {
  // start with native comments hidden
  comments.style.display = 'none'

  const wrapper = document.createElement('div')

  wrapper.className = themes.common.concat(
    conf.dark ? themes.dark : themes.light,
    conf.theme && generateTheme(conf.theme)
  ).class

  // if parentElement is actually null, then just crash m8
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  comments.parentElement!.insertBefore(wrapper, comments)

  render(
    <App
      conf={conf}
      setNativeCommentsVisible={visible => {
        comments.style.display = visible ? '' : 'none'
        if (visible && confName === 'youtube') {
          // if comments container is short assume it hasn't loaded
          // trigger a slight scroll to prod it into doing so
          if (comments.clientHeight < 100) {
            window.scrollBy(0, 1)
            window.scrollBy(0, -1)
          }
        }
      }}
    />,
    wrapper
  )

  return () => {
    render(null, wrapper)
    wrapper.remove()
  }
}
