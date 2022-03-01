import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux'
import { actions } from './reducer';

interface TaskType {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}

interface Props {
    tasks: TaskType[];
}

const Task = ({title, completed, id}: TaskType) => {
    const dispatch = useDispatch();
    const onComplete = useCallback(() => {
        dispatch(actions.completeTask('' + id));
    }, [dispatch, id]);


    return (
        <div style={{padding: '10px', border: '1px solid black', textAlign: 'left'}}>
            <span style={completed ? {color: '#CACACA'} : {}}>{title}</span>
            {!completed && <button onClick={onComplete} style={{float: 'right'}}>Complete</button>}
        </div>
    );
};

const Tasks = ({ tasks }: Props) => (
    <div>
        {tasks.map((task: TaskType) => <Task key={task.id} {...task} />)}
    </div>
)

export default Tasks;
