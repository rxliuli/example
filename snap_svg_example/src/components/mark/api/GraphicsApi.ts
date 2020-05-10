import Snap, { Paper } from 'snapsvg'

export class GraphicsApi {
  private readonly paper: Paper
  constructor(private readonly el: SVGSVGElement) {
    this.paper = Snap(el)
  }
  circle(x: number, y: number, r: number): Snap.Element {
    return this.paper.circle(x, y, r)
  }
  rect(
    x: number,
    y: number,
    width: number,
    height: number,
    rx?: number,
    ry?: number,
  ): Snap.Element {
    return this.paper.rect(x, y, width, height, rx, ry)
  }
  line(x1: number, y1: number, x2: number, y2: number): Snap.Element {
    return this.paper.line(x1, y1, x2, y2)
  }
  text(x: number, y: number, text: string | number): Snap.Element {
    return this.paper.text(x, y, text)
  }
  group(...els: Snap.Element[]): Snap.Element {
    return this.paper.group(...els)
  }
}
