import Snap from 'snapsvg'

interface RectData {
  x: number
  y: number
  width: number
  height: number
}

export class GraphicsRenderer {
  constructor(
    private readonly paper: Snap.Paper,
    private options: {
      width: number
      height: number
    },
  ) {}

  computeRectData(data: RectData): RectData {
    let { x, y, width, height } = data
    //如果为坐标为负值则减小对应的宽高
    width = width + Math.min(x, 0)
    height = height + Math.min(y, 0)
    //如果坐标为负值则正值化
    x = Math.max(x, 0)
    y = Math.max(y, 0)
    //如果坐标大于最大值则减小对应的宽高
    width = Math.min(width, this.options.width - x)
    height = Math.min(height, this.options.height - y)
    return { x, y, width, height }
  }

  renderRect(data: RectData) {
    const { x, y, width, height } = this.computeRectData(data)
    const rect = this.paper.rect(x, y, width, height).attr({
      fill: 'transparent',
      stroke: 'red',
    })
    const group = this.paper.group(rect)
    return Object.assign(group, {
      setText: (str: string) => {
        const middleHeight = y + height / 2
        const circle = this.paper.circle(x + width, middleHeight, 10).attr({
          fill: 'red',
          stroke: 'blue',
          strokeWidth: 2,
        })
        const line = this.paper
          .line(x + width, middleHeight, x + width + 20, middleHeight)
          .attr({
            stroke: 'red',
            strokeWidth: 2,
          })
        const text = this.paper
          .text(x + width + 20, middleHeight + 7, str)
          .attr({
            fill: 'red',
            'user-select': 'none',
          })
        return this.paper.group(rect, line, circle, text)
      },
    })
  }
}
