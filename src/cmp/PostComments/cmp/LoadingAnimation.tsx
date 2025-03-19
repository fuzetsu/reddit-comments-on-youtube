import z from 'zaftig'

const spinAnim = z.anim`
  0% { transform rotate(0deg) }
  100% { transform rotate(360deg) }
`

const styles = z`
  width 50px
  height 50px
  animation ${spinAnim} 1s linear infinite
`

export const LoadingAnimation = () => (
  <svg className={styles.class} viewBox="0 0 50 50">
    <circle
      cx="25"
      cy="25"
      r="20"
      fill="none"
      stroke="currentColor"
      stroke-width="5"
      stroke-linecap="round"
      stroke-dasharray="80,200"
    />
  </svg>
)
