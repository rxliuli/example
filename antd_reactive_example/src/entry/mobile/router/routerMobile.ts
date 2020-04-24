import { RouteProps } from 'react-router'
import { lazy } from 'react'

export const routerMobile = [
    {
        path: '/',
        component: lazy(() =>
            import('../../../pages/home/mobile/GalleryMobile'),
        ),
    },
] as RouteProps[]
