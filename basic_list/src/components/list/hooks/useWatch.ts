import { useEffect, useRef } from 'react'

/**
 * 模拟 vue 中的 watch
 * @param ref
 * @param effect
 * @param otherDeps
 */
export function useWatch<T>(
  ref: T,
  effect: (val: T, old: T) => void | (() => void | undefined),
  otherDeps: any[] = [],
) {
  const oldRef = useRef(ref)
  useEffect(() => {
    const res = effect(ref, oldRef.current)
    oldRef.current = ref
    return res
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...otherDeps])
}
