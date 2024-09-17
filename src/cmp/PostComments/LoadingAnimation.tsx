import { h } from 'preact'
import z from 'zaftig'

const styles = z`
  width 50px
  height 50px
  animation spin 1s linear infinite
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
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
