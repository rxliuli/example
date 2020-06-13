import React, { isValidElement } from 'react'
import ListHeader from './ListHeader'
import ListFilter from './ListFilter'
import ListTable from './ListTable'
import { useModel } from './hooks/useModel'
import { BasicListPropsType } from './model'

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
        tableOptions={tableOptions}
        tableOperate={tableOperate}
      />
    </div>
  )
}

export default BasicList
