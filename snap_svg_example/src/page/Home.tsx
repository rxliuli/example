import * as React from 'react'
import {
  Reducer,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react'
import { useDidMount } from '../common/hooks/useDidMount'
import Snap from 'snapsvg'
import { GraphicsRenderer } from '../components/mark/util/GraphicsRenderer'
import produce from 'immer'
import { DragUtil } from '../components/mark/util/DragUtil'
import { Random } from 'mockjs'
import { RectData } from '../components/mark/model/RectData'
import { SimplePoint, SimpleRect } from '../components/mark/util/Rect'
import { filterGetIndexMap } from '../common/util/filterGetIndexMap'

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

  //矩形配置列表数据
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
      {
        x: 300,
        y: 150,
        width: 100,
        height: 100,
        text: '第二个',
        visible: false,
      },
    ] as RectData[],
  )

  function renderList() {
    console.log('重新渲染: ', list)
    const [filterList, map] = filterGetIndexMap(
      list,
      ({ visible = true }) => visible,
    )
    gr?.renderList(filterList).forEach(
      //region 点击时设置文本
      (item, i) => {
        console.log('render forEach: ', item, map.get(i))
        const index = map.get(i)!
        item.click(event => {
          const data = {
            index,
            value: {
              ...list[index],
              text: Random.string(),
            },
          }
          console.log('click: ', list[index], data)

          dispatch({
            type: 'set',
            data,
          })

          //阻止默认事件传播
          event.stopPropagation()
        })
      },

      //endregion
    )
  }

  //根据配置列表渲染
  useEffect(() => {
    paper && clearRectPaper(paper)

    renderList()
  }, [list, gr])

  //初始化
  useDidMount(() => {
    const paper = Snap(svgRef.current!)
    setPaper(paper)
    const gr = new GraphicsRenderer(paper, {
      width: maxWidth,
      height: maxHeight,
    })
    setGr(gr)
    paper.image(
      'https://i.picsum.photos/id/758/500/400.jpg',
      0,
      0,
      maxWidth,
      maxHeight,
    )
  })

  //绑定 drag
  useEffect(() => {
    paper?.drag(
      DragUtil.dragOnMove(paper),
      DragUtil.dragOnStart(paper),
      DragUtil.dragOnEnd(paper, (data, rect) => {
        if (data.width > 10 && data.height > 10) {
          dispatch({
            type: 'add',
            data,
          })
        } else {
          rect.remove()
        }
      }),
    )
    paper?.click(event => {
      console.log('paper?.click: ')
      const visibleList = list.map((item, i) => {
        const { x, y, width, height } = item
        const isContain = new SimpleRect(
          {
            x,
            y,
          },
          {
            x: x + width,
            y: y + height,
          },
        ).isContains({
          x: event.offsetX,
          y: event.offsetY,
        })
        return [isContain, item] as const
      })
      //如果没有点击到任何图形则不做任何修改
      if (visibleList.filter(([isContain]) => isContain).length === 0) {
        return
      }
      //否则隐藏未点击到的图形，显示点击到的图形
      visibleList.forEach(([isContain, item], index) => {
        dispatch({
          type: 'set',
          data: {
            index,
            value: { ...item, visible: isContain },
          },
        })
      })
    })

    return () => {
      paper?.undrag()
      paper?.unclick()
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
