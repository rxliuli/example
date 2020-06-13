import * as React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { Moment } from 'moment'
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
    birthdayTimeRange?: [Moment, Moment]
  }
}
const testOptionList: LabeledValue[] = [
  { value: 0, label: '测试 0' },
  { value: 1, label: '测试 1' },
  { value: 2, label: '测试 2' },
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
      type: FilterFieldTypeEnum.TimeRange,
      label: '生日',
      field: 'birthdayTimeRange',
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
  api: userApi,
}

/**
 * 一个基本的列表页面
 * @constructor
 */
const BasicListExample: React.FC<PropsType> = () => {
  return <BasicList {...config} />
}

export default BasicListExample
