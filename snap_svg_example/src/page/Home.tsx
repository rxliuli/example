import * as React from 'react'
import { Reducer, useEffect, useReducer, useRef, useState } from 'react'
import { useDidMount } from '../common/hooks/useDidMount'
import Snap from 'snapsvg'
import { GraphicsRenderer } from '../components/mark/util/GraphicsRenderer'
import produce from 'immer'
import { DragUtil } from '../components/mark/util/DragUtil'
import { Random } from 'mockjs'
import { RectData } from '../components/mark/model/RectData'

type PropsType = {}

type ListReducerState = RectData[]

type ListReducerAction =
  | {
      type: 'add'
      data: RectData
    }
  | {
      type: 'set'
      data: { index: number; value: RectData }
    }

/**
 * 清除 paper 中所有的矩形元素
 * @param paper
 */
function clearRectPaper(paper: Snap.Paper) {
  paper.children().forEach(rect => {
    //不删除默认的几个基本元素
    if (['desc', 'defs', 'image'].includes(rect.type)) {
      return
    }
    rect.remove()
  })
}

const Home: React.FC<PropsType> = props => {
  const svgRef = useRef<SVGSVGElement>(null)
  const maxWidth = 700
  const maxHeight = 400
  const [paper, setPaper] = useState<Snap.Paper>()
  const [gr, setGr] = useState<GraphicsRenderer>()
  const [list, dispatch] = useReducer<
    Reducer<ListReducerState, ListReducerAction>
  >(
    (state, action) => {
      return produce(state, draft => {
        switch (action.type) {
          case 'add':
            draft.push(action.data)
            break
          case 'set':
            const { index, value } = action.data
            draft[index] = value
            break
        }
      })
    },
    [
      { x: 100, y: 100, width: 40, height: 40, color: 'yellow', text: 'First' },
      { x: 300, y: 150, width: 60, height: 40, text: '第二个' },
    ] as RectData[],
  )

  Reflect.set(window, 'paper', paper)

  useEffect(() => {
    paper && clearRectPaper(paper)
    gr?.renderList(list).forEach((item, index) =>
      //点击时设置文本
      item.click(() => {
        dispatch({
          type: 'set',
          data: {
            index,
            value: {
              ...list[index],
              text: Random.string(),
            },
          },
        })
      }),
    )
  }, [list])

  useDidMount(() => {
    const paper = Snap(svgRef.current!)
    setPaper(paper)
    const gr = new GraphicsRenderer(paper, {
      width: maxWidth,
      height: maxHeight,
    })
    setGr(gr)
    paper.image('https://picsum.photos/500/400', 0, 0, maxWidth, maxHeight)

    gr.renderList(list)
  })
  useEffect(() => {
    paper?.drag(
      DragUtil.dragOnMove(paper),
      DragUtil.dragOnStart(paper),
      DragUtil.dragOnEnd(paper, rect => {
        if (rect.width > 10 && rect.height > 10) {
          dispatch({
            type: 'add',
            data: rect,
          })
        }
      }),
    )
    return () => {
      paper?.undrag()
    }
  }, [paper, list, dispatch])

  return (
    <div style={{ marginLeft: 100 }}>
      <svg
        ref={svgRef}
        width={maxWidth}
        height={maxHeight}
        style={{ border: '1px solid #000000' }}
      />
    </div>
  )
}

export default Home
