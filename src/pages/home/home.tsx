import TodoItemComp from '../../components/todo-item';
import { Input, Button } from '@arco-design/web-react';
import { useHomeDriver } from './home.driver';
import './home.scss';
import { Todo } from '../../core/entities/todo';

const Home = () => {
    const {
        isEmptyList,
        viewTodos,
        input,

        handleAdd,
        handleChangeStatus,
        handleClear,
        handleInputChange
    } = useHomeDriver();

    return (
        <>
            {isEmptyList && <div className='empty'>
                暂无Todo，请安排一下今天的待办吧！
            </div>}
            {!isEmptyList && viewTodos.map((todoItem: Todo, index: number) => (
                <TodoItemComp 
                    key={index}  
                    data={todoItem}
                    onClear={handleClear(index)} 
                    onChangeStatus={handleChangeStatus(index)} />
            ))}
            <div className='input-container'>
                <div className='input'>
                    <Input placeholder='请输入待办事项' value={input} onChange={handleInputChange}/>
                </div>
                <div className='submit'>
                    <Button type='primary' onClick={handleAdd}>添加</Button>
                </div>
            </div>
        </>
    );
}

export default Home;