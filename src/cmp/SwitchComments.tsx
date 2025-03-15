import z from 'zaftig'

interface Props {
  onSwitch(): void
}

export const SwitchComments = ({ onSwitch }: Props) => {
  return (
    <button className={button.class} onClick={onSwitch}>
      Switch comments
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
