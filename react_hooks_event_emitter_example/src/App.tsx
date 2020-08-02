import React, { useState } from 'react'
import Todo from './pages/todo/Todo'

function App() {
  const [tab, setTab] = useState(true)

  function handleToggle() {
    setTab(!tab)
  }

  return (
    <div>
      <header>
        <label>选项卡：</label>
        <button onClick={handleToggle}>切换</button>
      </header>
      {tab ? <Todo /> : <div>其他内容</div>}
    </div>
  )
}

export default App
