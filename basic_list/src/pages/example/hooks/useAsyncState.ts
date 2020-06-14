import { useState } from 'react'
import { useDidMount } from './useDidMount'

/**
 * 使用异步的 state
 * @param init 初始值
 * @param fetcher 异步初始化的函数
 */
export function useAsyncState<T>(
  init: T,
  fetcher: () => Promise<T>,
): [T, (val: T) => void] {
  const [val, setVal] = useState<T>(init)
  useDidMount(async () => {
    setVal(await fetcher())
  })
  return [val, setVal]
}
