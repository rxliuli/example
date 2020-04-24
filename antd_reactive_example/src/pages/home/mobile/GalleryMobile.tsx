import * as React from 'react'
import { useEffect, useReducer } from 'react'
import { debounce } from 'rx-util'
import { Page } from '../../../common/business/Page'
import { galleryApi } from '../common/api/GalleryApi'
import { getFormBottom } from '../../../common/dom/getFormBottom'
import { useInitPage } from '../common/hooks/useInitPage'

type PropsType = {}

const GalleryMobile: React.FC<PropsType> = () => {
    async function load(pageParam: Page) {
        const res = await galleryApi.page(pageParam)
        setPage(res)
        dispatch({
            type: 'push',
            list: res.list,
        })
    }
    const [page, setPage] = useInitPage(load)

    const [list, dispatch] = useReducer(
        (
            state: number[],
            action: {
                type: 'push' | 'clear'
                list: number[]
            },
        ) => {
            switch (action.type) {
                case 'push':
                    return state.concat(action.list)
                case 'clear':
                    return []
            }
        },
        [] as number[],
    )

    useEffect(() => {
        const loadNext = debounce(100, async () => {
            if (getFormBottom() > 10) {
                return
            }
            const { offset, size, total } = page
            console.log('loadNext: ', page)
            if (offset + size >= total) {
                return
            }
            await load({
                offset: offset + size,
                size: size,
            })
        })
        window.addEventListener('scroll', loadNext)
        return () => window.removeEventListener('scroll', loadNext)
    }, [page])

    return (
        <div>
            <h2>mobile</h2>
            <ul>
                {list.map(i => (
                    <li key={i}>{i}</li>
                ))}
            </ul>
        </div>
    )
}

export default GalleryMobile
