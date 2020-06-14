import { Params, TableColumn, TableOptions } from './index'
import { BaseListApi } from '../api/BaseListApi'
import { PageData, PageParam } from './Page'
import { ReactElement } from 'react'

export interface ListTableOperateParam {
  searchPage: (page?: PageParam) => Promise<void>
  selectedRowKeys: string[]
  setSelectedRowKeys: (selectedRowKeys: string[]) => void
  page: PageData<any>
  params: Params
}

export type ListTableOperate = (param: ListTableOperateParam) => ReactElement

export interface ListTablePropsType {
  columns: TableColumn[]
  api: BaseListApi
  params: Params
  tableOptions?: TableOptions
  tableOperate?: ListTableOperate
}
