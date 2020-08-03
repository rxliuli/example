import { registerApi } from '../api/RegisterApi'
import { Form, message } from 'antd'
import { useCallback } from 'react'

/**
 * 通过 hooks 复用逻辑
 */
export function useRegisterForm() {
  const [form] = Form.useForm()
  const handleSubmit = useCallback(async () => {
    const store = form.getFieldsValue()
    console.log('store: ', store)
    await registerApi.save(store)
    message.success('保存成功')
    form.resetFields()
  }, [form])

  return {
    form,
    handleSubmit,
  }
}
