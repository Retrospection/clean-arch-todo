import { RoleType, User } from "../entities/user";
import { ITodoListRepository } from "../repositories/todo";
import { IUserRepository } from "../repositories/user";


export class LoginUseCase {
    constructor(
        private userRepository: IUserRepository,
        private remoteTodoRepository: ITodoListRepository,
        private localTodoRepositories: ITodoListRepository[]
    ) {}

    public tryLoginWithLastUser () {
        return this.userRepository.getUser();
    }

    public login (name: string, role: string) {
        const user = new User(name, role as RoleType);
        this.userRepository.saveUser(user);
        return user;
    }

    public async loadCachedTodos (loadedCallback: Function) {
        // 先从远端加载
        const todos = await this.remoteTodoRepository.getTodos(); 
        // 同步到本地缓存
        await Promise.all(this.localTodoRepositories.map(repo => repo.saveTodos(todos!)));
        loadedCallback();
        return todos;
    }
}