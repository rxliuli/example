import { useState } from 'react'
import { useWatch } from './useWatch'

/**
 * 模拟 vue 中 modal 双向绑定
 * @param prop 需要绑定的 prop
 * @param onChange 修改 prop 的函数
 */
export function useModel<T>(
  prop: T,
  onChange?: (val: T) => void,
): [T, (value: T) => void] {
  const [innerValue, changeInnerValue] = useState<T>(prop)
  useWatch(
    innerValue,
    (val, old) => {
      if (onChange && JSON.stringify(val) !== JSON.stringify(old)) {
        onChange(innerValue)
      }
    },
    [onChange],
  )
  useWatch(prop, (val, old) => {
    if (prop && JSON.stringify(val) !== JSON.stringify(old)) {
      changeInnerValue(prop)
    }
  })
  return [innerValue, changeInnerValue]
}
