import { render } from 'preact'
import { App } from 'cmp/App'
import { getConf } from 'conf'
import { log, logError, q } from 'lib/util'
import { waitForElems } from 'lib/wait-for-elems'
import { waitForUrl } from 'lib/wait-for-url'
import { generateTheme, Themes } from 'theme'
import { Conf } from 'types'
import { APP_ID } from 'constants'

log('started!')

const { conf, confName } = getConf()

if (!conf) {
  logError('encountered unknown host', location.hostname)
} else {
  waitForUrl({
    matcher: 'any',
    onmatch: url => {
      log('url changed', url)
      if (conf.isMatch ? !conf.isMatch(url) : q(conf.areaSelector) == null) {
        log("but it's not a match...")
        return
      }
      log('its a match! looking for area')

      const cleanup: (() => void)[] = []

      const wait = waitForElems({
        selector: conf.areaSelector,
        stopWaiting: true,
        onMatch: area => {
          log('area found', area)
          cleanup.push(mountApp(conf, area))
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

function mountApp(conf: Conf, area: HTMLElement) {
  const wrapper = document.createElement(conf.mode === 'modal' ? 'span' : 'div')

  wrapper.id = APP_ID
  wrapper.className = Themes.common.concat(
    conf.dark ? Themes.dark : Themes.light,
    conf.theme && generateTheme(conf.theme)
  ).class

  switch (conf.mode) {
    case 'modal':
      area.prepend(wrapper)
      break
    case 'insert':
      area.append(wrapper)
      break
    case 'swap':
    default:
      // start with native area hidden
      area.style.display = 'none'
      // if parentElement is actually null, then just crash m8
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      area.parentElement!.insertBefore(wrapper, area)
  }

  render(
    <App
      conf={conf}
      setNativeCommentsVisible={visible => {
        area.style.display = visible ? '' : 'none'
        if (visible && confName === 'youtube') {
          // if comments container is short assume it hasn't loaded
          // trigger a slight scroll to prod it into doing so
          if (area.clientHeight < 100) {
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
