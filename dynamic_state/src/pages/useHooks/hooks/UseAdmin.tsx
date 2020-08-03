import { FormInstance } from 'antd/es/form'
import { Button } from 'antd'
import * as React from 'react'

/**
 * 角色是管理员时拥有的 UI/状态/方法
 * 这种方式更适合分离 有或没有 的代码，而非 是哪一个 的场景
 * @param form
 */
export function useAdmin(form: FormInstance) {
  function handleSubmit() {
    const store = form.getFieldsValue()
    console.log('store: ', store)
  }

  const UI = process.env.REACT_APP_ORG === 'org2' && (
    <footer>
      <Button onClick={handleSubmit}>提交</Button>
    </footer>
  )
  return {
    UI,
  }
}
