
import { Todo } from '../entities/todo';
import { TodoList } from '../entities/todo-list';

export interface ITodoListRepository {
    getTodos () : Promise<TodoList | undefined>;
    saveTodos (todos: TodoList): Promise<void>;
}

export class TodoListLocalStorageRepository implements ITodoListRepository {
    
    private static TODO_KEY = 'todo-list';

    public getTodos() {
        return new Promise<TodoList>((resolve, reject) => {
            try {
                const serializedData = localStorage.getItem(TodoListLocalStorageRepository.TODO_KEY);
                if (serializedData) {
                    resolve(TodoList.fromLocalStorage(serializedData)!);
                }
            } catch (e) {
                console.log(e);
            }
        })
    }

    public saveTodos(todos: TodoList): Promise<void> {
        return new Promise((resolve) => {
            try {
                const serializedData = todos.toLocalStorage();
                localStorage.setItem(TodoListLocalStorageRepository.TODO_KEY, serializedData);
                resolve();
            } catch (error) {
                console.log(error);
            }
        })
    }
}



export class TodoListRemoteRepository implements ITodoListRepository {

    public getTodos(): Promise<TodoList | undefined> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(new TodoList([
                    new Todo('hah1', 'pending', 'test1'),
                    new Todo('hah2', 'pending', 'test1'),
                    new Todo('hah3', 'pending', 'test1'),
                    new Todo('hah4', 'pending', 'test1'),
                ]))
            }, 1000);
        })
    }

    public saveTodos(todos: TodoList): Promise<void> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, 1000);
        })
    }
}