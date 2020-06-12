import React, { isValidElement, ReactElement } from 'react'
import { BaseListApi } from './api/BaseListApi'
import ListHeader from './ListHeader'
import ListFilter from './ListFilter'
import ListTable, { TableOperate } from './ListTable'
import { Header, Params, TableColumn, TableOptions } from './model'
import { FilterSelectType } from './component/FilterSelect'
import { FilterTimeRangeType } from './component/FilterTimeRange'
import { FilterSlotType } from './component/FilterSlot'
import { useModel } from './hooks/useModel'

export type BasicListPropsType = {
  header: Header | ReactElement
  filters?:
    | (FilterSelectType | FilterTimeRangeType | FilterSlotType)[]
    | ((params: any, onChange: (params: any) => void) => ReactElement)
  columns: TableColumn[]
  api: BaseListApi
  params?: Params
  onChange?: (params: Params) => void
  tableOptions?: TableOptions
  tableOperate?: TableOperate
}

const BasicList: React.FC<BasicListPropsType> = (props) => {
  const { filters, columns, header, api, tableOptions, tableOperate } = props

  const [innerParams, changeParams] = useModel(
    props.params ? props.params : {},
    props.onChange,
  )

  return (
    <div>
      {isValidElement(header) ? (
        header
      ) : (
        <ListHeader
          {...header}
          value={innerParams.keyword}
          onSearch={(keyword) => changeParams({ ...innerParams, keyword })}
        />
      )}
      {filters &&
        (filters instanceof Function ? (
          filters(innerParams, changeParams)
        ) : filters.length > 0 ? (
          <ListFilter
            filters={filters}
            initialValue={innerParams}
            onChange={(val) =>
              changeParams({
                ...innerParams,
                ...val,
              })
            }
          />
        ) : null)}
      <ListTable
        columns={columns}
        api={api}
        params={innerParams}
        options={tableOptions}
        tableOperate={tableOperate}
      />
    </div>
  )
}

export default BasicList
