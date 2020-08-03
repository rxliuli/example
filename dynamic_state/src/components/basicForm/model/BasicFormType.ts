import { FormItemProps } from 'antd/lib/form/FormItem'
import { LabeledValue } from 'antd/es/select'

export type BasicFormItemSlotType = FormItemProps & { colspan?: number }
type BasicFormItemBaseSelectionType = BasicFormItemNotSlotType & {
  options: LabeledValue[]
}
type BasicFormItemNotSlotType = Omit<BasicFormItemSlotType, 'children'> & {
  disabled?: boolean
}
export type BasicFormItemInputType = BasicFormItemNotSlotType & {
  placeholder?: string
}
export type BasicFormItemSelectType = BasicFormItemBaseSelectionType & {
  placeholder?: string
}
export type BasicFormItemRadioType = BasicFormItemBaseSelectionType
export type BasicFormItemCheckboxType = BasicFormItemBaseSelectionType
export type BasicFormItemDateType = BasicFormItemNotSlotType & {
  placeholder?: string
  format: string
}
