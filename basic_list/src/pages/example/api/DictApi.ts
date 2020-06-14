import { mock } from 'mockjs'

export type Dict = {
  id: string
  label: string
  value: string
}

class DictApi {
  async list() {
    const list = mock({
      'list|10': [
        {
          id: '@uuid',
          label: '@string',
          value: '@string',
        },
      ],
    }).list as Dict[]
    console.log('list: ', list)
    return list
  }
}

export const dictApi = new DictApi()
