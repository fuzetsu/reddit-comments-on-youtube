import z from 'zaftig'
import { createStyles } from 'lib/util'

interface Props {
  onSwitch(): void
}

export const SwitchComments = ({ onSwitch }: Props) => {
  return (
    <button className={styles.button} onClick={onSwitch}>
      Switch comments
    </button>
  )
}

const styles = createStyles({
  button: z`
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
})
