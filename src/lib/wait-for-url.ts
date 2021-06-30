type Cleanup = void | (() => void)

interface Props {
  onmatch(url: string): Cleanup
  stopWaiting?: boolean
  matcher?: 'any' | RegExp | ((url: string) => boolean)
}

export const waitForUrl = ({ matcher = 'any', stopWaiting = false, onmatch }: Props) => {
  const isMatch =
    matcher === 'any'
      ? () => true
      : typeof matcher === 'function'
      ? matcher
      : (url: string) => matcher.test(url)

  let lastUrl = ''
  const check = () => {
    const url = location.href
    if (url === lastUrl) return
    lastUrl = url

    if (cleanup) {
      runCleanup()
      if (stopWaiting) return stop()
    }

    if (isMatch(url)) {
      try {
        cleanup = onmatch(url)
      } finally {
        // don't stop until next url change to run cleanup
        if (stopWaiting && !cleanup) stop()
      }
    }
  }

  let cleanup: Cleanup
  const runCleanup = () => {
    if (!cleanup) return
    cleanup()
    cleanup = undefined
  }

  let id: number
  const start = () => {
    stop()
    id = setInterval(check, 500)
    check()
  }

  const stop = () => {
    clearInterval(id)
    runCleanup()
  }

  start()

  return { stop, start }
}
