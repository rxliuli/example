import React, { useCallback, useEffect, useRef } from 'react'
import globalStyles from './css/ListGlobal.module.css'
import classNames from 'classnames'
import { Card, Col, Form, Row } from 'antd'
import FilterSelect from './component/FilterSelect'
import { FilterFieldTypeEnum } from './model'
import { useForm } from 'antd/es/form/util'
import FilterTimeRange from './component/FilterTimeRange'
import { FilterUtil } from './util/FilterUtil'
import FilterSlot from './component/FilterSlot'
import { ListFilterPropsType } from './model/ListFilterPropsType'

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
const ListFilter: React.FC<ListFilterPropsType> = React.memo((props) => {
  const [form] = useForm()

  //监听初始值的变化
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
  return (
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
  )
})
export default ListFilter
