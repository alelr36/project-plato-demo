import axios from 'axios';
import { createSlice, Dispatch } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
    },
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload;
        },
        completedTask: (state, action) => {
            state.tasks = state.tasks.map((task: {id: string}) => task.id == action.payload ? {...task, completed: true} as never : task as never); // eslint-disable-line
        },
    },
});

const { setTasks, completedTask } = tasksSlice.actions;

const actions = {
    fetchTasks: () => async (dispatch: Dispatch) => {
        try {
            await axios.get('https://jsonplaceholder.typicode.com/todos')
                .then((response) => dispatch(setTasks(response.data)))
        }
        catch (e) {
            return console.error(e.message);
        }
    },
    completeTask: (id: string) => async (dispatch: Dispatch) => {
        setTimeout(() => {
            dispatch(completedTask(id));
        }, 1000);
    },
};
export { actions };

export default tasksSlice.reducer;