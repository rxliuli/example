import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
} from 'antd'
import * as React from 'react'
import { RuleUtil } from '../util/RuleUtil'
import {
  BasicFormItemCheckboxType,
  BasicFormItemDateType,
  BasicFormItemInputType,
  BasicFormItemRadioType,
  BasicFormItemSelectType,
  BasicFormItemSlotType,
} from '../model/BasicFormType'

/**
 * FormItem 的包装类
 */
export class BasicFormItemWrap {
  static Slot({ colspan = 6, ...props }: BasicFormItemSlotType) {
    props.rules = RuleUtil.wrap(props.rules)
    return (
      <Col span={colspan}>
        <Form.Item
          {...props}
          children={props.children}
          style={{
            //TODO 此处需要找到 react 中的 deep 覆盖 antd css 的方法（官方示例中应该就有）
            marginBottom: 12,
            paddingRight: 24,
          }}
        />
      </Col>
    )
  }
  static Input(props: BasicFormItemInputType) {
    return BasicFormItemWrap.Slot({
      ...props,
      children: <Input placeholder={props.placeholder || '请输入'} />,
    })
  }
  static Select(props: BasicFormItemSelectType) {
    return BasicFormItemWrap.Slot({
      ...props,
      children: (
        <Select
          placeholder={props.placeholder || '请选择'}
          options={props.options}
          showSearch
          optionFilterProp={'label'}
        />
      ),
    })
  }
  static Radio(props: BasicFormItemRadioType) {
    return BasicFormItemWrap.Slot({
      ...props,
      children: <Radio.Group options={props.options} />,
    })
  }
  static Checkbox(props: BasicFormItemCheckboxType) {
    return BasicFormItemWrap.Slot({
      ...props,
      children: (
        <Checkbox.Group style={{ width: '100%' }}>
          <Row>
            {props.options.map((option) => (
              <Col span={4} key={option.value}>
                <Checkbox value={option.value}>{option.label}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      ),
    })
  }
  static Date(props: BasicFormItemDateType) {
    return BasicFormItemWrap.Slot({
      ...props,
      children: (
        <DatePicker
          format={props.format}
          style={{ width: '100%' }}
          placeholder={props.placeholder || '请选择'}
        />
      ),
    })
  }
}
