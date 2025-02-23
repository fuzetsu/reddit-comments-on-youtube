import { Portal } from '@/base/Portal'
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
    <Portal>
      <div
        className={overlay}
        onClick={e => {
          if (e.target === e.currentTarget) onClose?.()
        }}
      >
        <div className={card}>{children}</div>
      </div>
    </Portal>
  )
}

const overlay = z`
  z-index 99999999
  position fixed
  top 0;right 0;left 0;bottom 0
  background rgba(0,0,0,0.8)
  d flex;jc center;ai center
`.class
const card = z`
  bc $background
  p 10
  width 90%
  max-width 1400
  max-height 95vh
  min-height 30vh
  overflow-y auto
`.class
