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
    
    public handleClear (index: number) {
        const newState = this.todoUseCase.removeTodo(this.todoList, index);
        this.dispatch.todo.updateTodo(newState);
    }

    public handleChangeStatus (index: number) {
        const newState = this.todoUseCase.changeTodoStatus(this.todoList, index);
        this.dispatch.todo.updateTodo(newState);
    }

    public handleAdd (content: string) {
        const newState = this.todoUseCase.addTodo(this.todoList, content, this.currentUser);
        this.dispatch.todo.updateTodo(newState);
    }

    public handleLoadCache () {
        const newState = this.loginUseCase.loadCachedTodos(this.dispatch.todo.setInitialized);
        this.dispatch.todo.updateTodo(newState);
    }
}