import { BaseListApi, PageData } from '../../../components/list'
import { mock } from 'mockjs'

type UserPageListParam = {}

type UserPageListRes = {
  id: string
  name: string
  age: number
}

class UserApi implements BaseListApi {
  async pageList(
    params: UserPageListParam,
  ): Promise<PageData<UserPageListRes>> {
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

export const userApi = new UserApi()
