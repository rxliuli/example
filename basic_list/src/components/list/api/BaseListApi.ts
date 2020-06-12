import { PageRes } from '../model/Page'

/**
 * ListTable 表格的 API 基类
 * 所有 ListTable props 中的 api 对象必须实现该类型
 */
export interface BaseListApi {
  pageList: (params: any) => Promise<PageRes<any>>
}
