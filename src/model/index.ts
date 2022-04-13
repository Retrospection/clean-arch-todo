import { createModel } from '@rematch/core'
import { Models } from "@rematch/core"


export type TodoStatus = 'done' | 'pending' | 'doing';

export type TodoItem = {
	content: string;
	status: TodoStatus;
	user: string;
}
 
export const todo = createModel<RootModel>()({
	state: [] as TodoItem[],
	reducers: {
		updateTodo(state, payload: TodoItem[]) {
			return payload;
		},
		deleteTodo(state, payload: number) {
			state.splice(payload, 1);
			return [...state];
		},
		
	},
	effects: (dispatch) => ({
		appendTodo(payload: TodoItem, rootState) {
			const newState = [
				...rootState.todo,
				payload
			];
			localStorage.setItem('todo-list', JSON.stringify(newState));
			dispatch.todo.updateTodo(newState);
		},
		deleteTodo(payload: number, rootState) {
			const newState = [...rootState.todo];
			newState.splice(payload, 1);
			localStorage.setItem('todo-list', JSON.stringify(newState));
			dispatch.todo.updateTodo(newState);
		},
		changeTodoStatus(payload: number, rootState) {
			const newState = [...rootState.todo];
			const todo = newState[payload];
			if (todo) {
				switch(todo.status) {
					case 'pending':
						todo.status = 'doing';
						break;
					case 'doing':
						todo.status = 'done';
						break;
					case 'done':
						todo.status = 'pending';
						break;
					default:
						break;
				}
				newState[payload] = todo;
				localStorage.setItem('todo-list', JSON.stringify(newState));
				dispatch.todo.updateTodo(newState);
			}
		}
	})
});


export type User = {
    name?: string;
    role?: string;
}

export const user = createModel<RootModel>() ({
    state: { } as User,
    reducers: {
		updateUser(state, payload: User) {
			return payload;
		}
    },
	effects: (dispatch) => ({
		updateUserEffect(payload: User) {
			dispatch.user.updateUser(payload)
		}
	})

});


export interface RootModel extends Models<RootModel> {
    todo: typeof todo
    user: typeof user
}
 
export const models: RootModel = { todo, user };