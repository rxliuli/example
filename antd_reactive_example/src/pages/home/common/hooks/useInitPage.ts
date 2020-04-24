import { useState } from 'react'
import { initPage } from '../../../../common/business/initPage'
import { pick } from '../../../../common/util/pick'
import { useDidMount } from '../../../../common/hooks/useDidMount'
import { Page } from '../../../../common/business/Page'

export function useInitPage(load: (pageParam: Page) => void) {
    const [page, setPage] = useState(initPage<number>())
    useDidMount(async () => {
        await load(pick(page, ['offset', 'size']))
    })
    return [page, setPage] as const
}
