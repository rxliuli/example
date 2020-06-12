import * as React from 'react'
import { useState } from 'react'
import ListFilter from '../ListFilter'
import { FilterFieldTypeEnum } from '../model'
import { FilterSelectType } from '../component/FilterSelect'
import { FilterTimeRangeType } from '../component/FilterTimeRange'
import { FilterSlotType } from '../component/FilterSlot'
import { Select } from 'antd'

type PropsType = {}

const ListFilterTest: React.FC<PropsType> = (props) => {
  const [value, setValue] = useState<{ submitHospital?: string }>({})

  function handleChange(values: Record<string, any>) {
    console.log('handleChange: ', values)
    setValue(values)
  }

  return (
    <div>
      <ListFilter
        initialValue={value}
        onChange={handleChange}
        filters={[
          {
            type: FilterFieldTypeEnum.Select,
            label: '送检医院/送检单位',
            field: 'submitHospital',
            options: [
              {
                label: '选项 1',
                value: 'value',
              },
            ],
          } as FilterSelectType,
          {
            type: FilterFieldTypeEnum.TimeRange,
            label: '时间',
            fields: ['timeStart', 'timeEnd'],
          } as FilterTimeRangeType,
          {
            type: FilterFieldTypeEnum.Slot,
            label: '其他',
            field: 'a_b_c',
            children: (
              <Select
                options={[
                  {
                    label: '测试',
                    value: 0,
                  },
                ]}
                allowClear
                style={{
                  width: 100,
                }}
              />
            ),
            computed(res, value) {
              res['test'] = value
              return res
            },
          } as FilterSlotType,
        ]}
      />
    </div>
  )
}

export default ListFilterTest
