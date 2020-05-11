import * as React from 'react'
import { useRef, useState } from 'react'
import { useDidMount } from '../common/hooks/useDidMount'
import Snap from 'snapsvg'
import { get } from '../common/util/get'
import { GraphicsRenderer } from '../components/mark/model/GraphicsRenderer'
import { mock, Random } from 'mockjs'

type PropsType = {}

const Home: React.FC<PropsType> = (props) => {
  const svgRef = useRef<SVGSVGElement>(null)
  const maxWidth = 700
  const maxHeight = 400
  const [paper, setPaper] = useState<Snap.Paper>()
  const [gr, setGr] = useState<GraphicsRenderer>()
  useDidMount(() => {
    const paper = Snap(svgRef.current!)
    setPaper(paper)
    const gr = new GraphicsRenderer(paper, {
      width: maxWidth,
      height: maxHeight,
    })
    setGr(gr)
    paper.image('https://picsum.photos/500/400', 0, 0, maxWidth, maxHeight)
    // const list = Array(1000)
    //   .fill(0)
    //   .map(() => ({
    //     x: Random.integer(0, maxWidth),
    //     y: Random.integer(0, maxHeight),
    //     width: Random.integer(0, maxWidth / 2),
    //     height: Random.integer(0, maxHeight / 2),
    //   }))
    const list = [
      { x: 100, y: 100, width: 40, height: 40 },
      { x: 300, y: 150, width: 60, height: 40 },
    ]
    list.map((item) => {
      const rect = gr!.renderRect(item)
      rect.click((event) => {
        console.log('rect clicked: ', event.clientX, event.clientY)
        rect.setText('hello world')
        rect.remove()
      })
      return rect
    })

    // group.drag(
    //   (dx, dy) => {
    //     console.log(
    //       group.data('origTransform') +
    //         (group.data('origTransform') ? 'T' : 't') +
    //         [dx, dy],
    //     )
    //     group.transform(
    //       group.data('origTransform') +
    //         (group.data('origTransform') ? 'T' : 't') +
    //         [dx, dy],
    //     )
    //   },
    //   function () {
    //     group.data('origTransform', group.transform().local)
    //   },
    //   () => {
    //     console.log('finished dragging')
    //   },
    // )

    // group.click((event) => {
    //   group.children()[0].attr({
    //     fill: 'green',
    //   })
    //   group.attr({
    //     fill: 'green',
    //   })
    //   console.log(event)
    // })

    paper.drag(
      (dx, dy) => {
        const rect = paper.data('tempRect')
        const x = Number.parseInt(rect.attr('x')) + Math.min(0, dx)
        const y = Number.parseInt(rect.attr('y')) + Math.min(0, dy)
        const transform =
          rect.data('origTransform') +
          (rect.data('origTransform') ? 'T' : 't') +
          [Math.min(0, dx), Math.min(0, dy)]
        rect.attr({
          transform,
          width: Math.abs(dx),
          height: Math.abs(dy),
        })
        console.log('onMove', rect, x, y)
      },
      (x, y, event) => {
        console.log('onStart', x, y, event.offsetX, event.offsetY)

        const rect = paper.rect(event.offsetX, event.offsetY, 0, 0).attr({
          fill: 'transparent',
          stroke: 'red',
        })
        rect.data('origTransform', rect.transform().local)
        paper.data('tempRect', rect)
      },
      () => {
        const rect = paper.data('tempRect')
        const x = Number.parseInt(rect.attr('x')) + get(rect, 'matrix.e', 0)
        const y = Number.parseInt(rect.attr('y')) + get(rect, 'matrix.f', 0)
        const width = Number.parseInt(rect.attr('width'))
        const height = Number.parseInt(rect.attr('height'))
        rect.remove()
        console.log('onEnd', { x, y, width, height })
        if (width > 10 && height > 10) {
          const rect = gr!.renderRect({
            x,
            y,
            width,
            height,
          })
          rect.click((event) => {
            console.log('rect clicked: ', event.clientX, event.clientY)
            rect.setText('hello world')
            rect.remove()
          })
          rect.node.dispatchEvent(new Event('click'))
        }
      },
    )

    // paper.mousedown((event) => {
    //   console.log('mousedown: ', event)
    // })
    //
    // paper.mousemove((event) => {
    //   console.log('mousemove: ', event)
    // })
    //
    // paper.mouseup((event) => {
    //   console.log('mouseup: ', event)
    // })
  })
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
