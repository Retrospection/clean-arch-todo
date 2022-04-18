import { TodoList } from "../entities/todo-list";
import { User } from "../entities/user";
import { ITodoListRepository } from "../repositories/todo";


export class TodoUseCase {
    constructor (
        private todoRepositories: ITodoListRepository[]
    ) {}

    public async removeTodo (state: TodoList, index: number) {
        const newState = state.clone();
        newState.removeTodo(index);
        await Promise.all(this.todoRepositories.map(repository => repository.saveTodos(newState)))
        return newState;
    }

    public async changeTodoStatus (state: TodoList, index: number) {
        const newState = state.clone();
        newState.changeTodoStatus(index);
        await Promise.all(this.todoRepositories.map(repository => repository.saveTodos(newState)))
        return newState;
    }

    public async addTodo (state: TodoList, todoContent: string, currentUser: User) {
        const newState = state.clone();
        newState.addTodo(todoContent, currentUser);
        await Promise.all(this.todoRepositories.map(repository => repository.saveTodos(newState)))
        return newState;
    }
}