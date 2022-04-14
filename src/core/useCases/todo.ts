import { TodoList } from "../entities/todo-list";
import { User } from "../entities/user";
import { ITodoListRepository } from "../repositories/todo";


export class TodoUseCase {
    constructor (
        private todoRepository: ITodoListRepository
    ) {}

    public removeTodo (state: TodoList, index: number) {
        const newState = state.clone();
        newState.removeTodo(index);
        this.todoRepository.saveTodos(newState);
        return newState;
    }

    public changeTodoStatus (state: TodoList, index: number) {
        const newState = state.clone();
        newState.changeTodoStatus(index);
        this.todoRepository.saveTodos(newState);
        return newState;
    }

    public addTodo (state: TodoList, todoContent: string, currentUser: User) {
        const newState = state.clone();
        newState.addTodo(todoContent, currentUser);
        this.todoRepository.saveTodos(newState);
        return newState;
    }
}