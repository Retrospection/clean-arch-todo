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
		addTodo(state, payload: TodoItem) {
			return [
				...state,
				payload
			]
		},
	}
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