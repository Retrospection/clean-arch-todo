import { RoleType, User } from "../entities/user";
import { IUserRepository } from "../repositories/user";


export class LoginUseCase {
    constructor(
        private userRepository: IUserRepository
    ) {}

    public tryLoginWithLastUser () {
        return this.userRepository.getUser();
    }

    public login (name: string, role: string) {
        const user = new User(name, role as RoleType);
        this.userRepository.saveUser(user);
        return user;
    }
    
}