import { createModel } from '@rematch/core'
import type { RootModel } from '../../store'
import { TodoList } from '../entities/todo-list'

const todoStore = createModel<RootModel>()({
    state: new TodoList([]),
    reducers: {
        updateTodo(state, payload) {
            return payload;
        }
    }
})

export default todoStore