import { TodoList } from '../../core/entities/todo-list';
import { User } from '../../core/entities/user';
import { TodoUseCase } from '../../core/useCases/todo';
import { Dispatch } from '../../store';
import { LoginUseCase } from '../useCases/login';


export class TodoAdaptor {
    constructor (
        private loginUseCase: LoginUseCase,
        private todoUseCase: TodoUseCase,
        private dispatch: Dispatch,
        private todoList: TodoList,
        private currentUser: User
    ) {} 
    
    public async handleClear (index: number) {
        const newState = await this.todoUseCase.removeTodo(this.todoList, index);
        this.dispatch.todo.updateTodo(newState);
    }

    public async handleChangeStatus (index: number) {
        const newState = await this.todoUseCase.changeTodoStatus(this.todoList, index);
        this.dispatch.todo.updateTodo(newState);
    }

    public async handleAdd (content: string) {
        const newState = await this.todoUseCase.addTodo(this.todoList, content, this.currentUser);
        this.dispatch.todo.updateTodo(newState);
    }

    public async handleLoadCache () {
        const newState = await this.loginUseCase.loadCachedTodos(this.dispatch.todo.setInitialized);
        this.dispatch.todo.updateTodo(newState);
    }
}