import { LabeledValue } from 'antd/es/select'

class RegisterOrg1Api {
  //模拟一个需要从后台获取的下拉框数据
  async getSelect(): Promise<LabeledValue[]> {
    return [
      {
        label: '选项 1',
        value: 1,
      },
      {
        label: '选项 2',
        value: 2,
      },
    ]
  }
}

export const registerOrg1Api = new RegisterOrg1Api()
