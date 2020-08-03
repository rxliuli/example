import * as React from 'react'
import { lazy, Suspense } from 'react'

type PropsType = {}

const ComponentMap = {
  org1: lazy(() => import('./org/org1/RegisterFormRCOrg1')),
  org2: lazy(() => import('./org/org2/RegisterFormRCOrg2')),
} as const

const RegisterFormRC: React.FC<PropsType> = () => {
  const Component = (ComponentMap as any)[process.env.REACT_APP_ORG!]
  return (
    <Suspense fallback={'正在加载中...'}>
      <Component />
    </Suspense>
  )
}

export default RegisterFormRC
