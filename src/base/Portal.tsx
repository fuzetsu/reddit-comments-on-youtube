import { APP_ID } from 'constants'
import { JSX, render } from 'preact'
import { useEffect, useRef } from 'preact/hooks'

interface Props {
  children: JSX.Element
  parent?: HTMLElement
}

type RenderFn = (children: Props['children']) => void

export function Portal({ parent, children }: Props) {
  const renderFn = useRef<RenderFn | null>(null)
  const targetRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    let target = targetRef.current
    if (!target) {
      target = targetRef.current = document.createElement('div')
      target.className = document.getElementById(APP_ID)?.className ?? ''
    }
    const container = parent || document.body
    container.appendChild(target)
    renderFn.current = () => target && render(children, target)
    return () => {
      renderFn.current = null
      if (target) container.removeChild(target)
    }
  }, [parent])
  useEffect(() => renderFn.current?.(children))
  return null
}
