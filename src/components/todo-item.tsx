import { FC } from 'react';
import { IconCaretRight, IconSchedule, IconCheckCircle, IconCloseCircle } from '@arco-design/web-react/icon'
import type { TodoItem, TodoStatus } from '../model';
import "./todo-item.scss"


interface TodoStatusProps {
    status: TodoStatus;
    onClick: () => void;
}

const Status: FC<TodoStatusProps> = ({ status, onClick }) => {
    switch(status) {
        case 'doing':
            return <IconCaretRight onClick={onClick} />
        case 'pending':
            return <IconSchedule onClick={onClick} />
        case 'done':
            return <IconCheckCircle onClick={onClick} />
        default:
            return null;
    }   
}



interface TodoItemProps {
    data: TodoItem;
    onChangeStatus: () => void;
    onClear: () => void;
}

const TodoItemComponent: FC<TodoItemProps> = (props) => {
    const { data, onChangeStatus, onClear } = props;
    
    return (
        <div className='todo-item-container'>
            <div className='left'>
                <div className='status-container'>
                    <Status status={data.status} onClick={onChangeStatus} />
                </div>
                <div>{data.content}</div>
            </div>
            <div>
                <IconCloseCircle onClick={onClear} />
            </div>
        </div>
    )
}

export default TodoItemComponent;