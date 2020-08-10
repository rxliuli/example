import { Graph } from '../util/Graph'

describe('测试 Graph', () => {
  it('基本测试', () => {
    const graph = new Graph([
      {
        condition: 1,
        states: [
          {
            condition: 2,
            data: 1,
          },
        ],
      },
      {
        condition: 2,
        states: [
          {
            condition: 2,
          },
        ],
      },
    ])
    console.log(graph.compute([1, 2]))
  })
})
