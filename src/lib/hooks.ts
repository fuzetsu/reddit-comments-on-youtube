import { Inputs, useEffect, useReducer, useRef } from 'preact/hooks'

export const useRedraw = () => {
  const [, redraw] = useReducer(c => c + 1, 0)
  return redraw as () => void
}

export const useTimeout = (ms: number, callback: () => void, deps: Inputs = []) => {
  useEffect(() => {
    const id = setTimeout(callback, ms)
    return () => clearTimeout(id)
  }, [ms, ...deps])
}

export const useInterval = (ms: number, callback: () => void, deps: Inputs = []) => {
  useEffect(() => {
    const id = setInterval(callback, ms)
    return () => clearInterval(id)
  }, [ms, ...deps])
}

export const useUpdatingRef = <T>(value: T) => {
  const ref = useRef(value)
  ref.current = value
  return ref
}
