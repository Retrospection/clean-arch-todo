import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { LoginUseCase } from './core/useCases/login';
import { UserLocalStorageRepository } from './core/repositories/user';
import { Dispatch, RootState } from './store';
import { UserAdaptor } from './core/adaptors/user';
import { TodoListRepository } from './core/repositories/todo';

  
export function useAppDriver() {
    const dispatch = useDispatch<Dispatch>();
    const user = useSelector((state: RootState) => state.user);

    const todoRepository = useMemo(() => new TodoListRepository(), []);
    const userRepository = useMemo(() => new UserLocalStorageRepository(), []);
    const loginUseCase = useMemo(() => new LoginUseCase(userRepository, todoRepository), [userRepository, todoRepository]);
    const appDriver = useMemo(() => new UserAdaptor(loginUseCase, dispatch), [loginUseCase, dispatch]);

    useEffect(() => {
        if (!user || !user.isValid()) {
            console.log('tryLoginWithLastUser');
            appDriver.tryLoginWithLastUser();
        }
    }, [user, dispatch, appDriver]);

}