import { PageData } from './Page'

export class PageConvertUtil {
    static currentToOffset({
        current,
        pageSize,
    }: {
        current: number
        pageSize: number
    }) {
        return {
            offset: (current - 1) * pageSize,
            size: pageSize,
        }
    }
    static offsetToCurrent({
        total,
        offset,
        size,
    }: Omit<PageData<any>, 'list'>) {
        const current = offset / size + 1
        return {
            current,
            pageSize: size,
            total: total,
        }
    }
}
