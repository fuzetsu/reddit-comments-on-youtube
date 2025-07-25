import { ComponentChildren } from 'preact'
import z from 'zaftig'

interface Props {
  onClick(): void
  children: ComponentChildren
  className?: string
}

export const Button = ({ onClick, children, className }: Props) => {
  return (
    <button className={button.concat(className).class} onClick={onClick}>
      {children}
    </button>
  )
}

const button = z`
  cursor pointer
  border none
  background $button-background
  text-align left
  transition all 0.2s ease
  border-radius 6
  padding 12
  &:hover {
    opacity 0.8
  }
`
