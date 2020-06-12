import { BaseListApi } from '../../../components/list'
import { PageRes } from '../../../components/list'

type UserPageListParam = {}

type UserPageListRes = {
  id: string
  name: string
  age: number
}

class UserApi implements BaseListApi {
  async pageList(params: UserPageListParam) {
    return {
      count: 8,
      total: 8,
      list: [
        {
          id: '1',
          name: 'liuli',
          age: 17,
        },
      ],
    } as PageRes<UserPageListRes>
  }
}

export const userApi = new UserApi()
