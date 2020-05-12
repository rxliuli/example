/**
 * 矩形元素
 */
export interface RectData {
  x: number
  y: number
  width: number
  height: number
  /**
   * @property 颜色，可选
   */
  color?: string
  /**
   * @property 文本，可选，如果没有则只显示矩形
   */
  text?: string
  /**
   * @property 是否显示，可选，如果没有则默认显示
   */
  visible?: boolean
}
