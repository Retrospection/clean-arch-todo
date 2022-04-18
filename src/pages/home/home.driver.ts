import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TodoListLocalStorageRepository, TodoListRemoteRepository } from '../../core/repositories/todo';
import { TodoUseCase } from '../../core/useCases/todo';
import { Dispatch, RootState } from '../../store';
import { TodoAdaptor } from '../../core/adaptors/todo';
import { UserLocalStorageRepository } from '../../core/repositories/user';
import { LoginUseCase } from '../../core/useCases/login';


export function useHomeDriver () {
    const dispatch = useDispatch<Dispatch>();

    const todoList = useSelector((state: RootState) => state.todo.todos);
    const todoInitialized = useSelector((state: RootState) => state.todo.initialized);
    const currentUser = useSelector((state: RootState) => state.user);
    const isEmptyList = useMemo(() => todoList.empty(), [todoList]);

    const viewTodos = useMemo(() => todoList.getRoleBasedTodos(currentUser!), [todoList, currentUser]);
    
    const todoLocalRepositories = useMemo(() => [new TodoListLocalStorageRepository()], []);
    const todoRemoteRepository = useMemo(() => new TodoListRemoteRepository(), []);
    const todoUseCase = useMemo(() => new TodoUseCase([...todoLocalRepositories, todoRemoteRepository]), [todoLocalRepositories, todoRemoteRepository]);
    const userRepository = useMemo(() => new UserLocalStorageRepository(), []);
    const loginUseCase = useMemo(() => new LoginUseCase(userRepository, todoRemoteRepository, todoLocalRepositories), [userRepository, todoRemoteRepository, todoLocalRepositories]);
    
    const adaptor = useMemo(() => new TodoAdaptor(loginUseCase, todoUseCase, dispatch, todoList, currentUser!), [loginUseCase, todoUseCase, dispatch, todoList, currentUser]);

    const handleClear = (index: number) => () => {
        adaptor.handleClear(index);
    }

    const handleChangeStatus = (index: number) => () => {
        adaptor.handleChangeStatus(index);
    }

    const [input, setInput] = useState('');
    const handleAdd = () => {
        adaptor.handleAdd(input);
    }

    const handleInputChange = (value: string) => {
        setInput(value);
    }

    useEffect(() => {
        if (currentUser?.isValid() && !todoInitialized) {
            adaptor.handleLoadCache();
        }
    }, [currentUser, todoInitialized, adaptor]);

    return {
        input,
        handleInputChange,
        viewTodos,
        isEmptyList,
        handleClear,
        handleChangeStatus,
        handleAdd
    }
}