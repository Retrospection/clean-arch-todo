
import { TodoList } from '../entities/todo-list';

export interface ITodoListRepository {
    getTodos () : TodoList | undefined;
    saveTodos (todos: TodoList): void;
}

export class TodoListRepository implements ITodoListRepository {
    
    private static TODO_KEY = 'todo-list';

    public getTodos() {
        try {
            const serializedData = localStorage.getItem(TodoListRepository.TODO_KEY);
            if (serializedData) {
                return TodoList.fromLocalStorage(serializedData);
            }
        } catch (e) {
            console.error(e);
        }
    }

    public saveTodos(todos: TodoList): void {
        try {
            const serializedData = todos.toLocalStorage();
            localStorage.setItem(TodoListRepository.TODO_KEY, serializedData);
        } catch (error) {
            console.error(error);
        }
    }
}