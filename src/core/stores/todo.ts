import { createModel } from '@rematch/core'
import type { RootModel } from '../../store'
import { TodoList } from '../entities/todo-list'

const todoStore = createModel<RootModel>()({
    state: {
        todos: new TodoList([]),
        initialized: false
    },
    reducers: {
        updateTodo(state, payload) {
            return {
                ...state,
                todos: payload
            };
        },
        setInitialized(state) {
            return {
                ...state,
                initialized: true
            }
        }
    }
})

export default todoStore