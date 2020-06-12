import React from 'react'
import { Input } from 'antd'
import { Header } from './model'
import { useModel } from './hooks/useModel'
import CommonHeader from './CommonHeader'

const { Search } = Input

type PropsType = {
  value?: string
  onSearch: (keyword?: string) => void
} & Header

const ListHeader: React.FC<PropsType> = (props) => {
  const [innerValue, changeInnerValue] = useModel(props.value)
  const { list, placeholder, onSearch } = props
  return (
    <CommonHeader list={list}>
      {placeholder && (
        <Search
          value={innerValue}
          placeholder={placeholder}
          onChange={(e) => changeInnerValue(e.target.value)}
          onSearch={onSearch}
          enterButton
        />
      )}
    </CommonHeader>
  )
}

export default ListHeader
