import { PageData } from './Page'

export function initPage<T>() {
    return {
        offset: 0,
        size: 10,
        list: [],
        total: 0,
    } as PageData<T>
}
