type GraphValue = string | number

interface GraphStatement {
  condition: GraphValue
  data?: any | (() => any)
  states?: GraphStatement[]
}

export class Graph {
  constructor(public graphs: GraphStatement[]) {}
  compute(values: GraphValue[]) {
    let graphs = this.graphs
    for (let i = 0; i < values.length; i++) {
      let value = values[i]
      const findGraph = graphs.find((graph) => graph.condition === value)
      if (!findGraph) {
        throw new Error('findGraph is undefined')
      }
      if (i === values.length - 1) {
        return findGraph
      }
      if (!findGraph.states) {
        throw new Error('findGraph.states is undefined')
      }
      graphs = findGraph.states
    }
    throw new Error('no such')
  }
}
