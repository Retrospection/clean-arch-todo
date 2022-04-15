import { RoleType, User } from "../entities/user";
import { ITodoListRepository } from "../repositories/todo";
import { IUserRepository } from "../repositories/user";


export class LoginUseCase {
    constructor(
        private userRepository: IUserRepository,
        private todoRepository: ITodoListRepository
    ) {}

    public tryLoginWithLastUser () {
        return this.userRepository.getUser();
    }

    public login (name: string, role: string) {
        const user = new User(name, role as RoleType);
        this.userRepository.saveUser(user);
        return user;
    }

    public loadCachedTodos (loadedCallback: Function) {
        const todos = this.todoRepository.getTodos(); 
        loadedCallback();
        return todos;
    }
}