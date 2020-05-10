import { useEffect } from 'react'
import { RequiredField } from '../types/RequiredField'

type Options = {
  /**
   * 监听的事件，默认为 keydown，因为 keypress 有些按键监听不到，例如 Backspace
   */
  type?: 'keydown' | 'keyup' | 'keypress'
  /**
   * 需要监听的按键数组，默认为 undefined，监听全部
   * 这里的默认值考量主要是如果不传入该参数对于使用者意味着它不需要监听任何键，还是说需要监听所有键，吾辈认为后者的可能性更大
   */
  detectKeys?: string[]
  /**
   * hooks 的依赖项，默认为 undefined，每次渲染都会运行
   * 这里的默认值考量主要是 hooks 中的 useEffect 如果内部使用了其他状态，则必须正确声明依赖项，而如果没有声明默认为 [] 的话就会出现访问到旧值，反之则只是性能稍差一些
   */
  deps?: any[]
}

const defaultOptions = {
  type: 'keydown',
} as RequiredField<Options, 'type'>

/**
 * 监听用户的案件
 * @param listener 监听函数
 * @param options 其他选项
 */
export function useKey(
  listener: (pressedKey: string, e: KeyboardEvent) => void,
  options: Options = {},
) {
  const _options = {
    ...defaultOptions,
    ...options,
  }
  useEffect(() => {
    const _listener = (e: KeyboardEvent) => {
      if (!_options.detectKeys || _options.detectKeys.includes(e.key)) {
        listener(e.key, e)
      }
    }
    window.document.addEventListener(_options.type, _listener)
    return () => window.document.removeEventListener(_options.type, _listener)
  }, _options.deps)
}
