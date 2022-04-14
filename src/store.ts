import { init, RematchDispatch, RematchRootState, Models } from '@rematch/core'
import todo from './core/stores/todo'
import user from './core/stores/user'

export interface RootModel extends Models<RootModel> {
    todo: typeof todo
    user: typeof user
}
 
export const models: RootModel = { todo, user }; 

export const store = init({
	models,
})
 
export type Store = typeof store
export type Dispatch = RematchDispatch<RootModel>
export type RootState = RematchRootState<RootModel>