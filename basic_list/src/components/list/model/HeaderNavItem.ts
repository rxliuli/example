/**
 * 公共头部的导航元素类型
 *
 * @name name 导航的名字
 * @field link 导航的链接
 */
export type HeaderNavItem =
    | string
    | {
          name: string
          link?: string
      }
