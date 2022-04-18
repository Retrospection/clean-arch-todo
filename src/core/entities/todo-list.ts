import { Todo } from './todo';
import { User } from './user';


export class TodoList {
    public todos: Todo[];

    constructor(todos: Todo[]) {
        this.todos = todos;
    }

    public static fromLocalStorage (data: string): TodoList | undefined {
        try {
            const rawObject = JSON.parse(data);
            return new TodoList(rawObject.map((item: any) => new Todo(
                item.content,
                item.status,
                item.user
            )));
        } catch (e) {
            console.error(e);
        }
    }

    public getRoleBasedTodos (currentUser?: User) {
        if (!currentUser) {
            return [];
        }

        if (currentUser.role! === 'admin') {
            return this.todos;
        } else {
            return this.todos.filter(todo => todo.user === currentUser.name!);
        }
    }

    public toLocalStorage (): string {
        return JSON.stringify(this.todos);
    }

    public map (callback: (value: Todo, index: number, array: Todo[]) => void) {
        return this.todos.map(callback);
    }

    public empty() {
        return this.todos.length === 0;
    }

    public clone() {
        return new TodoList(this.todos.map(todo => todo.clone()));
    }

    public removeTodo(index: number) {
        this.todos.splice(index, 1);
    }

    public changeTodoStatus(index: number) {
        this.todos[index].changeStatus();
    }

    public addTodo(content: string, user: User) {
        this.todos.push(new Todo(
            content,
            'pending',
            user.name!
        ));
    }


}