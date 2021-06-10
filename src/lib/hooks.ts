import { useReducer } from 'preact/hooks'

export const useRedraw = () => {
  const [, redraw] = useReducer(c => c + 1, 0)
  return redraw as () => void
}
