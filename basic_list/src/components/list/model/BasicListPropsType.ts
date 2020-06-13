import { Header } from './index'
import { ReactElement } from 'react'
import { ListTablePropsType } from './ListTablePropsType'
import { ListFilterPropsType } from './ListFilterPropsType'

export type BasicListPropsType = Pick<ListTablePropsType, 'columns' | 'api'> &
  Partial<
    Pick<ListTablePropsType, 'params' | 'tableOperate' | 'tableOptions'>
  > & {
    header: Header | ReactElement
    filters?:
      | ListFilterPropsType['filters']
      | ((params: any, onChange: (params: any) => void) => ReactElement)
    onChange?: ListFilterPropsType['onChange']
  }
