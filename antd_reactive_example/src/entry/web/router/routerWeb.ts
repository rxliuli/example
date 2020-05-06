import { RouteProps } from 'react-router'
import { lazy } from 'react'

export const routerWeb = [
    {
        path: '/',
        component: lazy(() => import('../../../pages/home/web/GalleryWeb')),
        exact: true,
    },
] as RouteProps[]
