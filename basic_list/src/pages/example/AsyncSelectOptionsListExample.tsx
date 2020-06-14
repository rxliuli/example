import * as React from 'react'
import { Link } from 'react-router-dom'
import { userApi } from './api/UserApi'
import {
  BasicList,
  BasicListPropsType,
  FilterFieldTypeEnum,
} from '../../components/list'
import { useMemo } from 'react'
import { useAsyncMemo } from './hooks/useAsyncMemo'
import { dictApi } from './api/DictApi'

type PropsType = {}

type Config = Omit<BasicListPropsType, 'params'> & {
  params?: {
    keyword?: string
    test?: number
  }
}

/**
 * 过滤器的下拉框数据来源是异步的
 * @constructor
 */
const AsyncSelectOptionsListExample: React.FC<PropsType> = () => {
  const testOptionList = useAsyncMemo([], dictApi.list)
  const config = useMemo<Config>(
    () => ({
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
      ],
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
      api: userApi,
    }),
    [testOptionList],
  )
  return <BasicList {...config} />
}

export default AsyncSelectOptionsListExample
