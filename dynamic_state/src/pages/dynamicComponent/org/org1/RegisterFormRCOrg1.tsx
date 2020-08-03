import * as React from 'react'
import { Button, Card } from 'antd'
import { useEffect, useMemo, useState } from 'react'
import { BasicFormBox } from '../../../../components/basicForm'
import { BasicFormItemTypeEnum } from '../../../../components/basicForm/model/BasicFormItemTypeEnum'
import { useRegisterForm } from '../../common/hooks/useRegisterForm'
import { registerOrg1Api } from './api/Org1RegisterApi'
import { LabeledValue } from 'antd/es/select'

type PropsType = {}

const RegisterFormRCOrg1: React.FC<PropsType> = () => {
  const [aOptionList, setAOptionList] = useState<LabeledValue[]>([])
  useEffect(() => {
    ;(async () => {
      const options = await registerOrg1Api.getSelect()
      setAOptionList(options)
    })()
  }, [])

  //根据状态切换对应的配置项
  const config = useMemo(
    () => [
      [
        {
          type: BasicFormItemTypeEnum.Select,
          name: 'a',
          label: '字段 A',
          options: aOptionList,
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
    ],
    [aOptionList],
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

export default RegisterFormRCOrg1
