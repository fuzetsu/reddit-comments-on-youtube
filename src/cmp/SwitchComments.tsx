import z from 'zaftig'

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

const styles = {
  button: z`
    cursor pointer
    border none
    padding 10
    width 100%
    margin-bottom 10
  `.class
}
