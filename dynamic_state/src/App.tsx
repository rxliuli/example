import React from 'react'
import { Tabs } from 'antd'
import RegisterForm from './pages/dynamicConfig/RegisterForm'
import RegisterFormRC from './pages/dynamicComponent/RegisterFormRC'
import RegisterFormHooks from './pages/useHooks/RegisterFormHooks'
import PathGraph from './pages/path_graph/PathGraph'

const App: React.FC = () => (
  <div>
    <h2>根据状态动态化</h2>
    <Tabs>
      <Tabs.TabPane tab={'路径图'} key={4}>
        <PathGraph />
      </Tabs.TabPane>
      <Tabs.TabPane tab={'动态配置'} key={1}>
        <RegisterForm />
      </Tabs.TabPane>
      <Tabs.TabPane tab={'动态组件'} key={2}>
        <RegisterFormRC />
      </Tabs.TabPane>
      <Tabs.TabPane tab={'hooks'} key={3}>
        <RegisterFormHooks />
      </Tabs.TabPane>
    </Tabs>
  </div>
)

export default App
