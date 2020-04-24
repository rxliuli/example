export type Page<T extends Record<string, any> = {}> = {
    offset: number
    size: number
} & T

export type PageData<T> = Page & {
    total: number
    list: T[]
}
