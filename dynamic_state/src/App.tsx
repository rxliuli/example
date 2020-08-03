import React from 'react'
import { Tabs } from 'antd'
import RegisterForm from './pages/dynamicConfig/RegisterForm'
import RegisterFormRC from './pages/dynamicComponent/RegisterFormRC'

const App: React.FC = () => (
  <div>
    <h2>根据状态动态化</h2>
    <Tabs>
      <Tabs.TabPane tab={'动态配置'} key={1}>
        <RegisterForm />
      </Tabs.TabPane>
      <Tabs.TabPane tab={'动态组件'} key={2}>
        <RegisterFormRC />
      </Tabs.TabPane>
      <Tabs.TabPane tab={'hooks'} key={3}>
        hooks
      </Tabs.TabPane>
    </Tabs>
  </div>
)

export default App
