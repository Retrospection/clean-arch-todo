import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { LoginUseCase } from './core/useCases/login';
import { UserLocalStorageRepository } from './core/repositories/user';
import { Dispatch, RootState } from './store';
import { UserAdaptor } from './core/adaptors/user';

  
export function useAppDriver() {
    const dispatch = useDispatch<Dispatch>();
    const user = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const userRepository = new UserLocalStorageRepository();
        const loginUseCase = new LoginUseCase(userRepository);
        const appDriver = new UserAdaptor(loginUseCase, dispatch);
    
        if (!user || !user.isValid()) {
            console.log('tryLoginWithLastUser');
            appDriver.tryLoginWithLastUser();
        }
    }, [user, dispatch]);

}