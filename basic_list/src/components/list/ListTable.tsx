import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Card, Table } from 'antd'
import globalStyles from './css/ListGlobal.module.css'
import classNames from 'classnames'
import { debounce, StringValidator, switchMap } from 'rx-util'
import produce from 'immer'
import commonStyles from './css/common.module.css'
import { TableRowSelection } from 'antd/es/table/interface'
import { PageData, PageParam } from './model/Page'
import { ListTablePropsType } from './model/ListTablePropsType'
import { TableProps } from 'antd/es/table'

const ListTable: React.FC<ListTablePropsType> = (props) => {
  const [page, setPage] = useState<PageData<any>>({
    offset: 0,
    total: 0,
    size: 10,
    count: 10,
    list: [] as any[],
  })
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])
  const searchPage = useCallback(
    switchMap(
      debounce(100, async ({ offset, size }: PageParam) => {
        const data = {
          page: {
            offset,
            size,
          },
          search: props.params,
        }
        const pageRes = await props.api.pageList(data)
        console.log('searchPage: ', data, pageRes)
        setPage(
          produce((draft) => {
            draft.total = pageRes.total
            draft.count = pageRes.count
            draft.list = pageRes.list
          }),
        )
      }),
    ),
    [page, props.api, props.params],
  )
  const changePage: TableProps<any>['onChange'] = useCallback(
    async ({ current, pageSize }) => {
      console.log('changePage: ', current, pageSize)
      const pageConf = {
        ...page,
        offset: (current! - 1) * pageSize!,
        size: pageSize!,
      }
      setPage(pageConf)
      searchPage({ offset: pageConf.offset, size: pageConf.size }).then()
    },
    [page, searchPage],
  )
  const onSelectChange = useCallback((selectedRowKeys: string[]) => {
    setSelectedRowKeys(selectedRowKeys)
  }, [])

  //之所以不在 ListFilter 组件里拦截的原因在于用户可能多次点击搜索，而搜索是在 ListHeader 组件中的。。。
  const oldSearchParam = useRef<string>()
  useEffect(() => {
    const currSearchParam = JSON.stringify(props.params)
    if (oldSearchParam.current === currSearchParam) {
      return
    }
    oldSearchParam.current = currSearchParam
    console.log('params changed', props.params)
    const pageConf = {
      ...page,
      offset: 0,
    }
    setPage(pageConf)
    searchPage({ offset: pageConf.offset, size: pageConf.size }).then()
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
              searchPage,
              selectedRowKeys,
              page,
              params: props.params,
            })}
        </div>
        <Table
          rowKey={innerOptions.rowKey}
          rowSelection={rowSelection}
          columns={innerColumns}
          dataSource={page.list}
          pagination={pageConfig}
          onChange={changePage}
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  )
}

export default ListTable
