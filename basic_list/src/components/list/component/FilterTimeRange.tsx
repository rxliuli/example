import React from 'react'
import { DatePicker, Form } from 'antd'
import { FilterFieldBase, FilterFieldTypeEnum } from '../model'

const { RangePicker } = DatePicker

export interface FilterTimeRangeType extends FilterFieldBase {
  type: FilterFieldTypeEnum.TimeRange
  field: string
}

/**
 * 日期区间选择器
 * @param props
 * @constructor
 */
const FilterTimeRange = ({ label, field }: FilterTimeRangeType) => {
  return (
    <Form.Item label={label} name={field}>
      <RangePicker />
    </Form.Item>
  )
}

export default FilterTimeRange
