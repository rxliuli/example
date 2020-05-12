/**
 * 过滤并且获得过滤前后元素的坐标
 * @param arr
 * @param callback
 */
export function filterGetIndexMap<T>(
  arr: T[],
  callback: (value: T, index: number, array: T[]) => boolean,
) {
  const map = new Map<number, number>()
  let k = 0
  return [
    arr.filter((v, i, arr) => {
      const res = callback(v, i, arr)
      if (res) {
        map.set(k, i)
        k++
      }
      return res
    }),
    map,
  ] as const
}
