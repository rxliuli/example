import React, { useCallback, useEffect, useMemo } from 'react'
import globalStyles from './css/ListGlobal.module.css'
import classNames from 'classnames'
import { Card, Col, Form, Row } from 'antd'
import FilterSelect, { FilterSelectType } from './component/FilterSelect'
import { FilterFieldTypeEnum } from './model'
import { useForm } from 'antd/es/form/util'
import FilterTimeRange, {
  FilterTimeRangeType,
} from './component/FilterTimeRange'
import { FilterUtil } from './util/FilterUtil'
import FilterSlot, { FilterSlotType } from './component/FilterSlot'

type PropsType<T = any> = {
  initialValue: T
  filters: (FilterSelectType | FilterTimeRangeType | FilterSlotType)[]
  onChange: (value: T) => void
}

const map = {
  [FilterFieldTypeEnum.Select]: FilterSelect,
  [FilterFieldTypeEnum.TimeRange]: FilterTimeRange,
  [FilterFieldTypeEnum.Slot]: FilterSlot,
}

/**
 * 列表的过滤器
 * @param props
 * @constructor
 */
const ListFilter: React.FC<PropsType> = (props) => {
  const [form] = useForm()

  useEffect(() => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      ...props.initialValue,
    })
  }, [form, props.initialValue])

  const handleChange = useCallback(() => {
    const values = FilterUtil.formConvertParam(form, props.filters)
    console.log('handleChange: ', values)
    props.onChange(values)
  }, [form, props])
  return useMemo(
    () => (
      <div className={classNames(globalStyles.global, globalStyles.margin)}>
        <Card>
          <Form form={form} onValuesChange={handleChange} layout={'horizontal'}>
            <Row gutter={24}>
              {props.filters.map((filter, i) => {
                const Component = map[filter.type]
                return (
                  <Col span={6} key={i}>
                    {Component(filter as any)}
                  </Col>
                )
              })}
            </Row>
          </Form>
        </Card>
      </div>
    ),
    [form, handleChange, props.filters],
  )
}

export default ListFilter
