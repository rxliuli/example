import { Header, Params, TableColumn, TableOptions } from './index'
import { ReactElement } from 'react'
import { FilterSelectType } from '../component/FilterSelect'
import { FilterTimeRangeType } from '../component/FilterTimeRange'
import { FilterSlotType } from '../component/FilterSlot'
import { BaseListApi } from '../api/BaseListApi'
import { TableOperate } from '../ListTable'

export interface BasicListPropsType {
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
