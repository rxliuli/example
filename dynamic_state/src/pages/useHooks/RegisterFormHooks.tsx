import * as React from 'react'
import { BasicFormBox } from '../../components/basicForm'
import { Card, Form } from 'antd'
import { BasicFormItemTypeEnum } from '../../components/basicForm/model/BasicFormItemTypeEnum'
import { useAdmin } from './hooks/UseAdmin'

type PropsType = {}

const RegisterFormHooks: React.FC<PropsType> = () => {
  const [form] = Form.useForm()
  const { UI } = useAdmin(form)
  return (
    <Card>
      <BasicFormBox
        form={form}
        size={'middle'}
        groups={[
          [
            {
              type: BasicFormItemTypeEnum.Select,
              name: 'a',
              label: '字段 A',
              options: [
                { label: '选项 1', value: 1 },
                { label: '选项 2', value: 2 },
              ],
            },
            {
              type: BasicFormItemTypeEnum.Select,
              name: 'b',
              label: '字段 B',
              options: [
                { label: '选项 1', value: 1 },
                { label: '选项 2', value: 2 },
              ],
            },
          ],
        ]}
      />
      {UI}
    </Card>
  )
}

export default RegisterFormHooks
