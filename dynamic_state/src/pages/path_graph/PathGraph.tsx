import * as React from 'react'
import { useMemo, useState } from 'react'
import { Graph } from './util/Graph'

type PropsType = {}

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

/**
 * 使用路径图控制状态和行为
 */
const PathGraph: React.FC<PropsType> = (props) => {
  const [state1] = useState(1)
  const [state2] = useState(3)
  const statement = useMemo(() => {
    try {
      return graph.compute([state1, state2]).data
    } catch (e) {
      return '未知状态: ' + e.message
    }
  }, [state1, state2])
  return (
    <div>
      <h2>路径图</h2>
      <p>{statement}</p>
    </div>
  )
}

export default PathGraph
