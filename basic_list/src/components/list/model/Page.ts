export type PageParam<T extends Record<string, any> = {}> = {
    offset: number
    size: number
} & T

export type PageListParam<T extends object> = {
    page: PageParam
    search: T
}

export type PageRes<T> = {
    total: number
    count: number
    list: T[]
}

export type PageData<T> = PageParam & PageRes<T>
