import { Store } from 'antd/es/form/interface'

class RegisterApi {
  async save(store: Store) {
    console.log('保存登记的表单: ', store)
  }
}
export const registerApi = new RegisterApi()
