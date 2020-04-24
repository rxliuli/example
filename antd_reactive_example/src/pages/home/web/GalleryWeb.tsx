import * as React from 'react'
import { useMemo } from 'react'
import { Pagination } from 'antd'
import { PageConvertUtil } from '../../../common/business/PageConvertUtil'
import { Page } from '../../../common/business/Page'
import { galleryApi } from '../common/api/GalleryApi'
import { useInitPage } from '../common/hooks/useInitPage'

type PropsType = {}

const GalleryWeb: React.FC<PropsType> = () => {
    async function load(pageParam: Page) {
        const res = await galleryApi.page(pageParam)
        setPage(res)
    }
    const [page, setPage] = useInitPage(load)

    const currentPage = useMemo(() => PageConvertUtil.offsetToCurrent(page), [
        page,
    ])

    async function changePagination(current: number, pageSize?: number) {
        await load(
            PageConvertUtil.currentToOffset({
                current,
                pageSize: pageSize || page.size,
            }),
        )
    }

    return (
        <div>
            <h2>web</h2>
            <ul>
                {page.list.map(i => (
                    <li key={i}>{i}</li>
                ))}
            </ul>
            <Pagination
                {...currentPage}
                onChange={changePagination}
                onShowSizeChange={changePagination}
            />
        </div>
    )
}

export default GalleryWeb
