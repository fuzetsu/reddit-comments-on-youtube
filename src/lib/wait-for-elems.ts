import { qq, throttle } from './util'

interface Props {
  selector: string
  onMatch(elem: HTMLElement): void
  stopWaiting?: boolean
  container?: Element
  mutationConfig?: MutationObserverInit
}

export const waitForElemsWithTimout = ({
  timeout,
  onTimeout,
  ...rest
}: { timeout: number; onTimeout?(): void } & Omit<Props, 'stopWaiting'>) => {
  const { stop } = waitForElems({
    ...rest,
    stopWaiting: true,
    onMatch: elem => {
      clearTimeout(id)
      rest.onMatch(elem)
    }
  })
  const id = setTimeout(() => {
    stop()
    onTimeout?.()
  }, timeout)
  return {
    stop: () => {
      clearTimeout(id)
      stop()
    }
  }
}

export const waitForElems = ({
  selector,
  onMatch: onmatch,
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
