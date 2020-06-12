import * as React from 'react'
import { useState } from 'react'
import { BaseListApi, BasicList, PageData, Params } from '../'
import { BasicListPropsType } from '../BasicList'
import { Button } from 'antd'
import { filterConstant } from '../constants/filterConstant'
import { Link } from 'react-router-dom'
import { Moment } from 'moment'
import { mock } from 'mockjs'
import { FilterFieldTypeEnum } from '../model'
import { LabeledValue } from 'antd/es/select'

type PropsType = {}

class TestApi implements BaseListApi {
  async pageList(params: Params): Promise<PageData<any>> {
    const mockUserTemplate = {
      'id|+1': 0,
      name: '@cname',
      birthday: '@date(yyyy-MM-dd hh:mm:ss)',
    }
    const list = mock({
      'list|10': [mockUserTemplate],
    }).list
    return {
      offset: 0,
      size: 10,
      total: 50,
      count: 0,
      list,
    }
  }
}

const testApi = new TestApi()

type Config = BasicListPropsType & {
  params: {
    keyword?: string
    age?: number
    birthdayTimeBegin?: Moment
    birthdayTimeEnd?: Moment
  }
}
const filterSelectConstant: LabeledValue[] = [
  { value: 1, label: '18 岁以下的' },
  { value: 2, label: '18 岁以上' },
  { value: 3, label: '60 岁以上' },
]

const BasicListTest: React.FC<PropsType> = (props) => {
  const [config] = useState<Config>({
    header: {
      title: '用户列表',
      placeholder: '用户名/住址',
      list: ['用户', '列表'],
    },
    filters: [
      {
        type: FilterFieldTypeEnum.Select,
        label: '年龄',
        field: 'age',
        options: filterSelectConstant,
      },
      {
        type: FilterFieldTypeEnum.TimeRange,
        label: '生日',
        fields: ['birthdayTimeBegin', 'birthdayTimeEnd'],
      },
    ],
    params: {
      keyword: '搜索',
      birthdayTimeBegin: undefined,
      birthdayTimeEnd: undefined,
    },
    columns: [
      { field: 'id', title: 'ID' },
      { field: 'name', title: '姓名' },
      { field: 'birthday', title: '生日' },
      {
        field: 'operate',
        title: '操作',
        slot: (param) => (
          <Link to={`/system/user/${param.record.id}`}>详情</Link>
        ),
      },
    ],
    api: testApi,
    tableOperate: () => <Button>Excel 导出</Button>,
  } as Config)
  return <BasicList {...config} />
}

export default BasicListTest
