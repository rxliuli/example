import * as React from 'react'
import { Form, Input, InputNumber, Select } from 'antd'
import { Link } from 'react-router-dom'
import { LabeledValue } from 'antd/es/select'
import { userApi } from './api/UserApi'
import {
  BasicList,
  BasicListPropsType,
  FilterFieldTypeEnum,
} from '../../components/list'

type PropsType = {}

type Config = Omit<BasicListPropsType, 'params'> & {
  params?: {
    keyword?: string
    test?: number
    age: {
      value?: number
      unit: 0 | 1 | 2
    }
  }
}
const testOptionList: LabeledValue[] = [
  { value: 0, label: '测试 0' },
  { value: 1, label: '测试 1' },
  { value: 2, label: '测试 2' },
]
const ageUnitOptionList: LabeledValue[] = [
  { label: '岁', value: 0 },
  { label: '月', value: 1 },
  { label: '天', value: 2 },
]

//列表配置项
const config: Config = {
  header: {
    placeholder: '用户名/住址',
    list: ['用户', '列表'],
  },
  filters: [
    {
      type: FilterFieldTypeEnum.Select,
      label: '测试字段',
      field: 'test',
      options: testOptionList,
    },
    {
      type: FilterFieldTypeEnum.Slot,
      label: '年龄',
      field: 'age',
      children: (
        <Input.Group compact>
          <Form.Item name={['age', 'value']} noStyle>
            <InputNumber style={{ width: 'calc(100% - 64px)' }} />
          </Form.Item>
          <Form.Item name={['age', 'unit']} noStyle>
            <Select style={{ width: 64 }} options={ageUnitOptionList} />
          </Form.Item>
        </Input.Group>
      ),
    },
  ],
  columns: [
    { field: 'id', title: 'ID' },
    { field: 'name', title: '姓名' },
    { field: 'birthday', title: '生日' },
    {
      field: 'operate',
      title: '操作',
      slot: (param) => <Link to={`/system/user/${param.record.id}`}>详情</Link>,
    },
  ],
  params: {
    age: {
      unit: 0,
    },
  },
  api: userApi,
}

/**
 * 一个基本的列表页面
 * @constructor
 */
const CustomFilterListExample: React.FC<PropsType> = () => {
  return <BasicList {...config} />
}

export default CustomFilterListExample
