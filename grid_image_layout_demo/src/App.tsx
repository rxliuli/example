import faker from 'faker'
import React from 'react'
import css from './App.module.css'

/**
 * 切片分析结果 UI 图片列表
 */
export function AIResultUIItemImageList(props: {
  imgs: {
    url: string; // 图片 URL
    height: number; // 图片高度
    width: number; // 图片宽度
  }[];
}) {
  return (
    <div className={css.aiResultUiItemImageList}>
      {props.imgs.map((item) => (
        <div>
          <img src={item.url} alt={item.url}/>
        </div>
      ))}
    </div>
  )
}

const mockImageList = Array(faker.random.number({min: 10, max: 20}))
  .fill(0)
  .map(() => {
    const getNumber = () => faker.random.number({min: 200, max: 300})
    return [getNumber(), getNumber()]
  })
  .map(([x, y]) => ({
    width: x,
    height: y,
    url: `https://picsum.photos/seed/picsum/${x}/${y}`,
  }))

function App() {
  return (
    <div className={css.aiResultUi}>
      <AIResultUIItemImageList imgs={mockImageList}/>
      <AIResultUIItemImageList imgs={mockImageList}/>
      <AIResultUIItemImageList imgs={mockImageList}/>
      <AIResultUIItemImageList imgs={mockImageList}/>
      <AIResultUIItemImageList imgs={mockImageList}/>
    </div>
  )
}

export default App
