import { ComponentChildren } from 'preact'
import z from 'zaftig'

interface Props {
  onClick(): void
  children: ComponentChildren
}

export const Button = ({ onClick, children }: Props) => {
  return (
    <button className={button.class} onClick={onClick}>
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
  margin-top 10
  padding 12
  width 100%
  &:hover {
    opacity 0.8
  }
`
