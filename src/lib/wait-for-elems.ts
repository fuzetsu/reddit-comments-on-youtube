import { qq } from './util'

interface Props {
  selector: string
  onmatch(elem: Element): void
  stopWaiting?: boolean
  container?: Element
  mutationConfig?: MutationObserverInit
}

export const waitForElems = ({ selector, stopWaiting = false, onmatch, container }: Props) => {
  let lastCall = 0
  let id = -1
  const seen = new WeakSet<Element>()

  const check = () => {
    clearTimeout(id)
    const now = Date.now()
    const delta = now - lastCall
    if (delta > 300) {
      id = setTimeout(check, delta + 5)
      return
    }
    lastCall = now

    const found = qq(selector).filter(elem => !seen.has(elem))
    if (found.length > 0) {
      if (stopWaiting) stop()
      found.forEach(elem => {
        seen.add(elem)
        onmatch(elem)
      })
    }
  }

  const observer = new MutationObserver(check)
  observer.observe(container || document.body, { subtree: true, attributes: true })

  const stop = () => observer.disconnect()
  return { stop }
}
