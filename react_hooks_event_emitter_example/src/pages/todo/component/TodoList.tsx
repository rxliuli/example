import * as React from 'react'
import { useEffect, useState } from 'react'
import { useEventEmitter } from '../../../components/emitter'
import { TodoEvents } from '../modal/TodoEvents'
import { TodoEntity } from '../modal/TodoEntity'

type PropsType = {}

const TodoList: React.FC<PropsType> = () => {
  const [list, setList] = useState<TodoEntity[]>([])
  const { useListener } = useEventEmitter<TodoEvents>()
  useListener(
    'addTodo',
    todo => {
      setList([...list, todo])
    },
    [list],
  )
  const em = { useListener }
  useEffect(() => {
    console.log('em: ', em)
  }, [em])
  return (
    <ul>
      {list.map((todo, i) => (
        <li key={i}>{todo.title}</li>
      ))}
    </ul>
  )
}

export default TodoList
