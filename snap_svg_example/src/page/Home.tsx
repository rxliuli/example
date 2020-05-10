import * as React from 'react'
import { useRef } from 'react'
import { useDidMount } from '../common/hooks/useDidMount'
import Snap from 'snapsvg'
import { get } from '../common/util/get'

type PropsType = {}

function renderRect(
  paper: Snap.Paper,
  data: { x: number; y: number; width: number; height: number },
) {
  const { x, y, width, height } = data
  const rect = paper.rect(x, y, width, height).attr({
    fill: 'transparent',
    stroke: 'red',
  })
  const middleHeight = y + height / 2
  const circle = paper.circle(x + width, middleHeight, 10).attr({
    fill: 'red',
    stroke: 'blue',
    strokeWidth: 2,
  })
  const line = paper
    .line(x + width, middleHeight, x + width + 20, middleHeight)
    .attr({
      stroke: 'red',
      strokeWidth: 2,
    })
  const text = paper.text(x + width + 20, middleHeight + 7, 'Hello 你好').attr({
    fill: 'red',
    'user-select': 'none',
  })
  return paper.group(rect, line, circle, text)
}

const Home: React.FC<PropsType> = (props) => {
  const svgRef = useRef<SVGSVGElement>(null)
  useDidMount(() => {
    const paper = Snap(svgRef.current!)
    paper.image('https://picsum.photos/500/400', 0, 0, 500, 400)
    const group = renderRect(paper, { x: 100, y: 100, width: 40, height: 40 })

    Reflect.set(window, 'paper', paper)
    Reflect.set(window, 'renderRect', renderRect)

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
          renderRect(paper, {
            x,
            y,
            width,
            height,
          })
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
    <div style={{ marginLeft: 200 }}>
      <svg
        ref={svgRef}
        width={500}
        height={400}
        style={{ border: '1px solid #000000' }}
      />
    </div>
  )
}

export default Home
