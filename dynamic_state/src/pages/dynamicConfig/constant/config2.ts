import { BasicFormItemTypeEnum } from '../../../components/basicForm/model/BasicFormItemTypeEnum'

export const config2 = [
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
]
