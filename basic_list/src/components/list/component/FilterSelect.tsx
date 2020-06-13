import React from 'react'
import { Form, Select } from 'antd'
import { LabeledValue } from 'antd/es/select'
import { FilterFieldBase, FilterFieldTypeEnum } from '../model'

export interface FilterSelectType extends FilterFieldBase {
  type: FilterFieldTypeEnum.Select
  /**
   * 字段名
   */
  field: string
  /**
   * 值列表
   */
  options: LabeledValue[]
}

/**
 * 单选选择器
 */
const FilterSelect = ({ field, label, options }: FilterSelectType) => {
  return (
    <Form.Item label={label} name={field}>
      <Select options={options} allowClear />
    </Form.Item>
  )
}
export default FilterSelect
