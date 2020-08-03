import { BasicFormItemTypeEnum } from '../model/BasicFormItemTypeEnum'

export const config1 = [
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
]
