import React from 'react'
import ReactDOM from 'react-dom'
import 'antd-mobile/dist/antd-mobile.css'

import { HashRouter } from 'react-router-dom'
import RenderRouteList from '../../components/router/RenderRouteList'
import { routerMobile } from './router/routerMobile'

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <RenderRouteList routes={routerMobile} />
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('app'),
)
