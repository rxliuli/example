import * as React from 'react'
import { Form, Row } from 'antd'
import { FormProps } from 'antd/es/form'
import { BasicFormItemTypeEnum } from '../model/BasicFormItemTypeEnum'
import { BasicFormItemGroup } from '../model/BasicFormItemGroup'
import { BasicFormItemWrap } from './BasicFormItemWrap'

type PropsType = FormProps & {
  groups: BasicFormItemGroup[]
}

const itemTypeMap = {
  [BasicFormItemTypeEnum.Slot]: BasicFormItemWrap.Slot,
  [BasicFormItemTypeEnum.Input]: BasicFormItemWrap.Input,
  [BasicFormItemTypeEnum.Select]: BasicFormItemWrap.Select,
  [BasicFormItemTypeEnum.Radio]: BasicFormItemWrap.Radio,
  [BasicFormItemTypeEnum.Checkbox]: BasicFormItemWrap.Checkbox,
  [BasicFormItemTypeEnum.Date]: BasicFormItemWrap.Date,
} as const

const defaultProps = {
  layout: 'vertical',
  size: 'small',
} as FormProps

/**
 * 基本表单的盒子
 * @param groups
 * @param props
 * @constructor
 */
const BasicFormBox: React.FC<PropsType> = ({ groups, ...props }) => {
  return (
    <div>
      <Form {...{ ...defaultProps, ...props }}>
        {groups.map((group, i) => (
          <Row key={i}>
            {group.map((item, k) => {
              const Component = itemTypeMap[item.type]
              return <Component {...(item as any)} key={k} />
            })}
          </Row>
        ))}
      </Form>
    </div>
  )
}

export default BasicFormBox
