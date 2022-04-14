import { User } from "../entities/user";

export interface IUserRepository {
    getUser (): User | undefined;
    saveUser(user: User): void;
}

export class UserLocalStorageRepository implements IUserRepository {

    private static USER_KEY = 'last-login-user';

    public getUser () {
        const serializedUser = localStorage.getItem(UserLocalStorageRepository.USER_KEY);
        if (serializedUser) {
            return User.fromLocalStorage(serializedUser);
        }
    }

    public saveUser (user: User) {
        try {
            localStorage.setItem(UserLocalStorageRepository.USER_KEY, user.toLocalStorage());
        } catch (e) {
            console.log(e);
        }
    }
}


export class UserRemoteRepository implements IUserRepository {
    public getUser(): User | undefined {
        throw Error('not implement');
    }

    public saveUser(user: User): void {
        throw Error('not implement');
    }
}


