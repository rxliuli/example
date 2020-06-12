import * as React from 'react'
import BasicList from '../../components/list/BasicList'
import { userApi } from './api/UserApi'

type PropsType = {}

const UserList: React.FC<PropsType> = (props) => {
  return (
    <BasicList
      header={{
        list: ['用户', '列表'],
      }}
      columns={[
        {
          field: 'name',
          title: '名字',
        },
        {
          field: 'age',
          title: '年龄',
        },
      ]}
      api={userApi}
    />
  )
}

export default UserList
