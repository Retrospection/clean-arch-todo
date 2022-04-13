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
            return <IconCaretRight style={{ color: '#00B42A' }} onClick={onClick} />
        case 'pending':
            return <IconSchedule style={{ color: '#FF7D00' }} onClick={onClick} />
        case 'done':
            return <IconCheckCircle style={{ color: '#165DFF' }} onClick={onClick} />
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
            <div className='right'>
                <IconCloseCircle onClick={onClear} />
            </div>
        </div>
    )
}

export default TodoItemComponent;