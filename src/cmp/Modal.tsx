import { JSX } from 'preact'
import z from 'zaftig'

interface Props {
  open?: boolean
  onClose?(): void
  children: JSX.Element
}

export function Modal({ children, open, onClose }: Props) {
  if (!open) return null

  return (
    <div
      className={overlay}
      onClick={e => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      <div className={card}>{children}</div>
    </div>
  )
}

const overlay = z`
  position fixed
  top 0;right 0;left 0;bottom 0
  background rgba(0,0,0,0.8)
  d flex;jc center;ai center
`.class
const card = z`
  bc $background
  p 35
  width 90%
  max-width 1200
  max-height 95vh
  min-height 30vh
  overflow-y auto
`.class
