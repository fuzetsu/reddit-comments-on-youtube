interface Props {
  onmatch(): void
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
    if (!isMatch(url)) return
    if (stopWaiting) stop()
    onmatch()
  }

  const id = setInterval(check, 500)

  const stop = () => clearInterval(id)
  return { stop }
}
