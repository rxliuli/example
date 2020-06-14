import { useEffect } from 'react'

export function useDidMount(
  func: () => void | Promise<void> | (() => void | Promise<void>),
) {
  useEffect(() => {
    const res = func()
    if (res instanceof Function) {
      return () => {
        res()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
