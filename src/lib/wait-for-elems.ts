import { qq, throttle } from './util'

interface Props {
  selector: string
  onmatch(elem: HTMLElement): void
  stopWaiting?: boolean
  container?: Element
  mutationConfig?: MutationObserverInit
}

export const waitForElems = ({
  selector,
  onmatch,
  stopWaiting = false,
  container = document.body,
  mutationConfig
}: Props) => {
  const seen = new WeakSet<Element>()

  const check = () => {
    const found = qq(selector).filter(elem => !seen.has(elem))
    if (found.length > 0) {
      if (stopWaiting) stop()
      found.forEach(elem => {
        seen.add(elem)
        onmatch(elem)
      })
    }
  }

  const throttledCheck = throttle(300, check)
  const observer = new MutationObserver(throttledCheck)
  const start = () => {
    check()
    observer.observe(container, {
      subtree: true,
      childList: true,
      ...mutationConfig
    })
  }
  const stop = () => {
    throttledCheck.stop()
    observer.disconnect()
  }

  start()

  return { start, stop }
}
