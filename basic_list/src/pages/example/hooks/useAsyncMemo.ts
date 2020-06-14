import { useAsyncState } from './useAsyncState'

export function useAsyncMemo<T>(init: T, fetcher: () => Promise<T>) {
  const [val] = useAsyncState<T>(init, fetcher)
  return val
}
