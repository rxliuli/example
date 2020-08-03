import * as React from 'react'
import TodoForm from './component/TodoForm'
import TodoList from './component/TodoList'
import EventEmitterRC from '../../components/emitter'

type PropsType = {}

const Todo: React.FC<PropsType> = props => {
  return (
    <EventEmitterRC>
      <TodoForm />
      <TodoList />
    </EventEmitterRC>
  )
}

export default Todo
