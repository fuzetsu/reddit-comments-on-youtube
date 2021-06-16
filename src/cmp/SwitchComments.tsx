import z from 'zaftig'

interface Props {
  onSwitch(): void
}

export const SwitchComments = ({ onSwitch }: Props) => {
  return (
    <button className={buttonStyle} onClick={onSwitch}>
      Switch comments
    </button>
  )
}

const buttonStyle = z`
  cursor pointer
  border none
  padding 10
  width 100%
`.class
