import React, { ReactNode, Suspense } from 'react'
import { Redirect, Route, RouteProps, Switch } from 'react-router'

type PropsType = {
    routes: RouteProps[]
    home?: string
    noMatch?: ReactNode
    fallback?: NonNullable<ReactNode>
}

const RenderRouteList: React.FC<PropsType> = function(props: PropsType) {
    return (
        <div>
            <Suspense fallback={props.fallback || ''}>
                <Switch>
                    {props.routes.map((route, i) => (
                        <Route key={i} {...route} />
                    ))}
                    {/*注：Redirect 必须在 route 列表渲染之后，因为是 / 所以必须启用严格模式，避免匹配所有页面*/}
                    {props.home && <Redirect exact path="/" to={props.home} />}
                    {props.noMatch && <Route path="*">{props.noMatch}</Route>}
                </Switch>
            </Suspense>
        </div>
    )
}

export default RenderRouteList
