import { ReactNode } from 'react'

/**
 * 表格的列
 */
export class TableColumn {
    /**
     * @field 在数据项中对应的字段名
     */
    field: string
    /**
     * @field 列标题
     */
    title: string
    /**
     * @field 自定义字段格式化函数
     */
    formatter?: (v: any, record: any) => any
    /**
     * @field 是否使用 slot，如果是，则值为 true
     */
    slot?: (param: { text: string; record: any; i: number }) => ReactNode

    constructor({ field, title, formatter, slot }: TableColumn) {
        this.field = field
        this.title = title
        this.formatter = formatter
        this.slot = slot
    }
}
