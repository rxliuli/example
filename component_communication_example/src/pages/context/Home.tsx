import * as React from 'react'
import { ThemeContext } from './ThemeContext'
import ThemeButton from './component/ThemeButton'

type PropsType = {}

const Home: React.FC<PropsType> = (props) => {
  return (
    //在这里通过 context 设置主题，下面的所有子组件都能根据它响应了
    <ThemeContext.Provider value={{ theme: 'light' }}>
      <ThemeButton>按钮</ThemeButton>
    </ThemeContext.Provider>
  )
}

export default Home
