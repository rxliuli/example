import * as React from 'react'
import { useEventEmitter } from '../../../components/emitter'
import { TodoEvents } from '../modal/TodoEvents'
import { FormEvent, useState } from 'react'

type PropsType = {}

const TodoForm: React.FC<PropsType> = () => {
  const { emit } = useEventEmitter<TodoEvents>()

  const [title, setTitle] = useState('')

  function handleAddTodo(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    emit('addTodo', {
      title,
    })
    setTitle('')
  }

  return (
    <form onSubmit={handleAddTodo}>
      <div>
        <label htmlFor={'title'}>标题：</label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          id={'title'}
        />
        <button type={'submit'}>添加</button>
      </div>
    </form>
  )
}

export default TodoForm
