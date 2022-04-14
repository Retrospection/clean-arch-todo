export type TodoStatus = 'done' | 'pending' | 'doing';

export class Todo {
    public content: string;
    public status: TodoStatus;
    public user: string;

    constructor (
        content: string,
        status: TodoStatus = 'pending',
        user: string
    ) {
        this.content = content;
        this.status = status;
        this.user = user;
    }

    public changeStatus () {
        switch(this.status) {
            case 'pending':
                this.status = 'doing';
                break;
            case 'doing':
                this.status = 'done';
                break;
            case 'done':
                this.status = 'pending';
                break;
            default:
                break;
        }
    }

    public clone () {
        return new Todo(this.content, this.status, this.user);
    }
}


