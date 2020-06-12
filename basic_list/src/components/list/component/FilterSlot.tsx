import * as React from 'react'
import { Form } from 'antd'
import { ReactElement } from 'react'
import { FilterFieldBase, FilterFieldTypeEnum } from '../model'

export interface FilterSlotType extends FilterFieldBase {
  type: FilterFieldTypeEnum.Slot
  field: string
  children: ReactElement
  computed?: (res: Record<string, any>, value: any) => Record<string, any>
}

/**
 * 自定义过滤器
 * @param label
 * @param field
 * @param children
 * @constructor
 */
const FilterSlot = ({ label, field, children }: FilterSlotType) => {
  return (
    <Form.Item label={label} name={field}>
      {children}
    </Form.Item>
  )
}

export default FilterSlot
