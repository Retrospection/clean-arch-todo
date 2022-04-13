import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, RootState } from '../store';
import TodoItemComp from '../components/todo-item';
import { TodoItem } from '../model';
import { Input, Button } from '@arco-design/web-react';
import './home.scss';

const Home = () => {
    const todoList = useSelector((state: RootState) => state.todo);
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch<Dispatch>();
    const [inputValue, setInputValue] = useState('');

    const isEmptyList = useMemo(() => todoList.length === 0, [todoList.length]);

    const handleClear = (index: number) => () => {
        dispatch.todo.deleteTodo(index);
    }

    const handleChangeStatus = (index: number) => () => {
        dispatch.todo.changeTodoStatus(index);
    }

    const handleAdd = () => {
        dispatch.todo.appendTodo({
            content: inputValue,
            status: 'pending',
            user: user.name!
        });
    }

    return (
        <>
            {isEmptyList && <div className='empty'>
                暂无Todo，请安排一下今天的待办吧！
            </div>}
            {!isEmptyList && todoList.map((todoItem: TodoItem, index: number) => (
                <TodoItemComp 
                    key={index}  
                    data={todoItem}
                    onClear={handleClear(index)} 
                    onChangeStatus={handleChangeStatus(index)} />
            ))}
            <div className='input-container'>
                <div className='input'>
                    <Input placeholder='请输入待办事项' value={inputValue} onChange={(value) => setInputValue(value)}/>
                </div>
                <div className='submit'>
                    <Button type='primary' onClick={handleAdd}>添加</Button>
                </div>
            </div>
        </>
    );
}

export default Home;