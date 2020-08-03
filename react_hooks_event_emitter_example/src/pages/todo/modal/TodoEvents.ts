import { BaseEvents } from '../../../components/emitter'
import { TodoEntity } from './TodoEntity'

export interface TodoEvents extends BaseEvents {
  addTodo: [TodoEntity]
}
