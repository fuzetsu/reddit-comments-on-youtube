type Cleanup = void | (() => void)

interface Props {
  onmatch(url: string): Cleanup | void
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
  let cleanup: Cleanup
  const check = () => {
    const url = location.href
    if (url === lastUrl) return
    lastUrl = url

    if (cleanup) {
      cleanup()
      cleanup = undefined
    }

    if (isMatch(url)) {
      if (stopWaiting) stop()
      cleanup = onmatch(url)
    }
  }

  const id = setInterval(check, 500)

  const stop = () => clearInterval(id)
  return { stop }
}
