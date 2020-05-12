import Snap from 'snapsvg'
import { get } from '../../../common/util/get'
import { RectData } from '../model/RectData'

export class DragUtil {
  static dragOnMove(paper: Snap.Paper) {
    return (dx: number, dy: number) => {
      const rect = paper.data('tempRect')
      const transform =
        rect.data('origTransform') +
        (rect.data('origTransform') ? 'T' : 't') +
        [Math.min(0, dx), Math.min(0, dy)]
      rect.attr({
        transform,
        width: Math.abs(dx),
        height: Math.abs(dy),
      })
      // console.log('onMove', rect, x, y)
    }
  }

  static dragOnStart(paper: Snap.Paper) {
    return (x: number, y: number, event: MouseEvent) => {
      // console.log('onStart', x, y, event.offsetX, event.offsetY)

      const rect = paper.rect(event.offsetX, event.offsetY, 0, 0).attr({
        fill: 'transparent',
        stroke: 'red',
      })
      rect.data('origTransform', rect.transform().local)
      paper.data('tempRect', rect)
    }
  }

  static dragOnEnd(paper: Snap.Paper, callback: (rect: RectData) => void) {
    return () => {
      const rect = paper.data('tempRect')
      const x = Number.parseInt(rect.attr('x')) + get(rect, 'matrix.e', 0)
      const y = Number.parseInt(rect.attr('y')) + get(rect, 'matrix.f', 0)
      const width = Number.parseInt(rect.attr('width'))
      const height = Number.parseInt(rect.attr('height'))
      // rect.remove()
      callback({
        x,
        y,
        width,
        height,
      })
    }
  }
}
