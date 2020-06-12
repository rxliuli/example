import { HeaderNavItem } from './HeaderNavItem'

export interface Header {
  /**
   * @field 导航元素列表
   */
  list: HeaderNavItem[]
  /**
   * @field 搜索框的提示文本
   */
  placeholder?: string
}
