import React from 'react'
import ReactDOM from 'react-dom'
import 'antd/dist/antd.css'

import RenderRouteList from '../../components/router/RenderRouteList'
import { routerWeb } from './router/routerWeb'
import { HashRouter } from 'react-router-dom'

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <RenderRouteList routes={routerWeb} />
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('app'),
)
