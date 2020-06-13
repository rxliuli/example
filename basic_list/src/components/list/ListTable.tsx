import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Card, Table } from 'antd'
import globalStyles from './css/ListGlobal.module.css'
import classNames from 'classnames'
import { debounce, logger, StringValidator, switchMap } from 'rx-util'
import produce from 'immer'
import { PaginationConfig } from 'antd/es/pagination'
import commonStyles from './css/common.module.css'
import { TableRowSelection } from 'antd/es/table/interface'
import { PageData } from './model/Page'
import { ListTablePropsType } from './model/ListTablePropsType'

const ListTable: React.FC<ListTablePropsType> = (props) => {
  const [page, setPage] = useState<PageData<any>>({
    offset: 0,
    total: 0,
    size: 10,
    count: 10,
    list: [] as any[],
  })
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])
  const searchPage = useCallback<() => Promise<PageData<any>>>(
    switchMap(debounce(100, async () => {
      const { offset, size } = page
      const data = {
        page: {
          offset,
          size,
        },
        search: props.params,
      }
      logger.log('执行了搜索: ', data)
      const pageRes = await props.api.pageList(data)
      setPage(
        produce(page, (draft) => {
          draft.total = pageRes.total
          draft.count = pageRes.count
          draft.list = pageRes.list
        }),
      )
    }) as any),
    [],
  )

  const changeCurrent = useCallback(
    ({ current, pageSize }: PaginationConfig) => {
      setPage(
        produce(page, (draft) => {
          draft.offset = (current! - 1) * pageSize!
          draft.size = pageSize!
        }),
      )
    },
    [page],
  )
  const onSelectChange = useCallback((selectedRowKeys: string[]) => {
    setSelectedRowKeys(selectedRowKeys)
  }, [])

  useEffect(() => {
    searchPage().then()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page.offset, page.size])
  useEffect(() => {
    setPage({
      ...page,
      offset: 0,
    })
    searchPage().then()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.params])

  //region 计算属性

  const innerOptions = useMemo(() => {
    return Object.assign(
      {
        rowKey: 'id',
        isSelect: false,
      },
      props.tableOptions,
    )
  }, [props.tableOptions])
  const innerColumns = useMemo(() => {
    return props.columns.map(
      ({ field: dataIndex, title, formatter: customRender, slot }) => ({
        dataIndex,
        title,
        render: slot
          ? (text: string, record: any, i: number) => slot({ text, record, i })
          : customRender
          ? customRender
          : (text: string) => (StringValidator.isEmpty(text) ? '-' : text),
      }),
    )
  }, [props.columns])
  const rowSelection = useMemo(
    function(): TableRowSelection<any> | undefined {
      return innerOptions.isSelect
        ? {
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange as any,
          }
        : undefined
    },
    [innerOptions.isSelect, onSelectChange, selectedRowKeys],
  )
  const pageConfig = useMemo(
    function() {
      const { offset, size, total } = page
      return {
        showQuickJumper: true,
        current: Math.floor(offset / size) + 1,
        pageSize: size,
        total: total,
        showSizeChanger: true,
      }
    },
    [page],
  )
  //endregion

  return (
    <div
      className={classNames(globalStyles.margin)}
      style={{
        margin: '24px auto',
      }}
    >
      <Card>
        <div
          className={classNames(
            commonStyles.flex,
            commonStyles.spaceBetween,
            commonStyles.middle,
          )}
        >
          <div>
            <span> 共{page.total}条 </span>
            {innerOptions.isSelect && selectedRowKeys.length > 0 ? (
              <span>已选{selectedRowKeys.length}条</span>
            ) : null}
          </div>
          {props.tableOperate &&
            props.tableOperate({
              searchPage: searchPage,
              selectedRowKeys: selectedRowKeys,
              page: page,
              params: props.params,
            })}
        </div>
        <Table
          rowKey={innerOptions.rowKey}
          rowSelection={rowSelection}
          columns={innerColumns}
          dataSource={page.list}
          pagination={pageConfig}
          onChange={changeCurrent as any}
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  )
}

export default ListTable
