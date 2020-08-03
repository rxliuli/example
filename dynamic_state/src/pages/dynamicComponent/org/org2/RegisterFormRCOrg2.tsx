import * as React from 'react'
import { Button, Card, Form, message } from 'antd'
import { useMemo } from 'react'
import { BasicFormBox } from '../../../../components/basicForm'
import { BasicFormItemTypeEnum } from '../../../../components/basicForm/model/BasicFormItemTypeEnum'
import { registerApi } from '../../common/api/RegisterApi'
import { useRegisterForm } from '../../common/hooks/useRegisterForm'

type PropsType = {}

const RegisterFormRCOrg2: React.FC<PropsType> = () => {
  //根据状态切换对应的配置项
  const config = useMemo(
    () => [
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
          name: 'c',
          label: '字段 C',
          options: [
            { label: '选项 1', value: 1 },
            { label: '选项 2', value: 2 },
          ],
        },
      ],
    ],
    [],
  )

  const { form, handleSubmit } = useRegisterForm()

  return (
    <Card>
      <BasicFormBox form={form} size={'middle'} groups={config} />
      <footer>
        <Button onClick={handleSubmit}>提交</Button>
      </footer>
    </Card>
  )
}

export default RegisterFormRCOrg2
