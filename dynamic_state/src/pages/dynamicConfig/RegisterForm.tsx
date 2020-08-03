import * as React from 'react'
import { useMemo } from 'react'
import BasicFormBox from './component/BasicFormBox'
import { Button, Card, Form } from 'antd'
import { config1 } from './constant/config1'
import { config2 } from './constant/config2'

type PropsType = {}

/**
 * 登记表单
 */
const RegisterForm: React.FC<PropsType> = (props) => {
  const [form] = Form.useForm()
  //根据状态切换对应的配置项
  const config = useMemo(() => {
    const configMap = {
      org1: config1,
      org2: config2,
    }
    return (configMap as any)[process.env.REACT_APP_ORG!] || []
  }, [])

  function handleSubmit() {
    const store = form.getFieldsValue()
    console.log('store: ', store)
  }

  return (
    <Card>
      <BasicFormBox form={form} size={'middle'} groups={config} />
      <footer>
        <Button onClick={handleSubmit}>提交</Button>
      </footer>
    </Card>
  )
}

export default RegisterForm
