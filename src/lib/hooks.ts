import { Inputs, useEffect, useReducer, useRef, useState } from 'preact/hooks'

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

export const useDelayedLoadingState = (loading: boolean, minLoadTime: number) => {
  const [delayedLoading, setDelayedLoading] = useState(loading)
  const loadingStartTime = useRef(0)

  useEffect(() => {
    if (loading) {
      setDelayedLoading(true)
      loadingStartTime.current = Date.now()
    } else {
      const elapsedTime = Date.now() - loadingStartTime.current
      if (elapsedTime < minLoadTime) {
        const remainingTime = Math.max(minLoadTime - elapsedTime, 0)
        const id = setTimeout(() => {
          setDelayedLoading(false)
          loadingStartTime.current = 0
        }, remainingTime)
        return () => clearTimeout(id)
      }
    }
  }, [loading, minLoadTime])

  return delayedLoading
}
