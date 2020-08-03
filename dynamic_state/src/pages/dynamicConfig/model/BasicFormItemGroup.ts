import { BasicFormItemTypeEnum } from './BasicFormItemTypeEnum'
import {
  BasicFormItemCheckboxType,
  BasicFormItemDateType,
  BasicFormItemInputType,
  BasicFormItemRadioType,
  BasicFormItemSelectType,
  BasicFormItemSlotType,
} from './BasicFormType'

/**
 * 多个相关联的元素可以分为一组
 * 一组之后即时未满一行也会进行强制换行
 */
export type BasicFormItemGroupItem<T> = (
  | Omit<BasicFormItemSlotType, 'name'>
  | Omit<BasicFormItemInputType, 'name'>
  | Omit<BasicFormItemSelectType, 'name'>
  | Omit<BasicFormItemRadioType, 'name'>
  | Omit<BasicFormItemCheckboxType, 'name'>
  | Omit<BasicFormItemDateType, 'name'>
) & {
  name?: keyof T
} & {
  type: BasicFormItemTypeEnum
}

export type BasicFormItemGroup<T = any> = BasicFormItemGroupItem<T>[]
