import React from 'react'
import { DatePicker, Form } from 'antd'
import { FilterFieldBase, FilterFieldTypeEnum } from '../model'
import { FilterUtil } from '../util/FilterUtil'

const { RangePicker } = DatePicker

export interface FilterTimeRangeType extends FilterFieldBase {
  type: FilterFieldTypeEnum.TimeRange
  /**
   * 日期区间的两个字段
   */
  fields: [string, string]
  /**
   * 标题
   */
  label: string
}

/**
 * 日期区间选择器
 * @param props
 * @constructor
 */
const FilterTimeRange = ({ label, fields }: FilterTimeRangeType) => {
  return (
    <Form.Item label={label} name={FilterUtil.generateTimeRangeField(fields)}>
      <RangePicker />
    </Form.Item>
  )
}

export default FilterTimeRange
