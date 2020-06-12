/**
 * 过滤器的类型
 */
export enum FilterFieldTypeEnum {
  /**
   * @property 自定义 slot
   */
  Slot = 1,
  /**
   * 普通选择框
   */
  Select = 2,
  /**
   * 日期区间选择器
   */
  TimeRange = 3,
}

/**
 * 过滤器字段基类
 */
export interface FilterFieldBase {
  /**
   * 过滤器元素类型
   */
  type: FilterFieldTypeEnum
  /**
   * 显示的标题
   */
  label: string
}
