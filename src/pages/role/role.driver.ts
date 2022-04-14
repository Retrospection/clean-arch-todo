import { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { FormInstance } from '@arco-design/web-react';
import { UserLocalStorageRepository } from '../../core/repositories/user';
import { User } from '../../core/entities/user';

import { LoginUseCase } from '../../core/useCases/login';
import { Dispatch } from '../../store';
import { UserAdaptor } from '../../core/adaptors/user';


export function useRoleDriver (form: FormInstance) {
    const dispatch = useDispatch<Dispatch>();
    const userLocalStorageRepository = new UserLocalStorageRepository();
    const loginUseCase = new LoginUseCase(userLocalStorageRepository);
    const appDriver = new UserAdaptor(loginUseCase, dispatch, form); 

    const validateName = (name: string | undefined, callback: (error?: ReactNode) => void) => {
        const { status, message } = User.validateName(name);
        callback(status ? undefined : message);
    }

    const validateRole = (role: string | undefined, callback: (error?: ReactNode) => void) => {
        const { status, message } = User.validateRole(role);
        callback(status ? undefined : message);
    }

    const handleSubmit = () => {
        appDriver.handleSubmit(form);
    }

    return {
        validateName,
        validateRole,
        handleSubmit
    }
}