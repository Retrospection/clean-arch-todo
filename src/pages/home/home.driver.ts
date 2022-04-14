import { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TodoListRepository } from '../../core/repositories/todo';
import { TodoUseCase } from '../../core/useCases/todo';
import { Dispatch, RootState } from '../../store';
import { TodoAdaptor } from '../../core/adaptors/todo';


export function useHomeDriver () {
    const dispatch = useDispatch<Dispatch>();
    const todoList = useSelector((state: RootState) => state.todo);
    const currentUser = useSelector((state: RootState) => state.user);
    const isEmptyList = useMemo(() => todoList.empty(), [todoList]);
    
    const todoRepository = new TodoListRepository();
    const todoUseCase = new TodoUseCase(todoRepository);
    const driver = new TodoAdaptor(todoUseCase, dispatch, todoList, currentUser!);

    const handleClear = (index: number) => () => {
        driver.handleClear(index);
    }

    const handleChangeStatus = (index: number) => () => {
        driver.handleChangeStatus(index);
    }

    const [input, setInput] = useState('');
    const handleAdd = () => {
        driver.handleAdd(input);
    }

    const handleInputChange = (value: string) => {
        setInput(value);
    }

    return {
        input,
        handleInputChange,
        todoList,
        isEmptyList,
        handleClear,
        handleChangeStatus,
        handleAdd
    }
}