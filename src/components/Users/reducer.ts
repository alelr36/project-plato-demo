import axios from 'axios';
import { createSlice, Dispatch } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        activeUser: null,
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setActiveUser: (state, action) => {
            state.activeUser = action.payload;
        }
    },
});

const { setUsers, setActiveUser } = usersSlice.actions;

const actions = {
    fetchUsers: () => async (dispatch: Dispatch) => {
        try {
            await axios.get('https://jsonplaceholder.typicode.com/users')
                .then((response) => dispatch(setUsers(response.data)))
        }
        catch (e) {
            return console.error(e.message);
        }
    },
    setActiveUser,
};
export { actions };

export default usersSlice.reducer;