import z from 'zaftig'

const styles = z`
  text-align center
  padding 20px
  svg {
    width 100px
    height 100px
    margin-bottom 10px
  }
`

export const NoComments = () => (
  <div className={styles.class}>
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 15s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
    <p>No comments found.</p>
  </div>
)
