import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux'

import { actions } from './reducer';

export interface UserType {
    id: number | string;
    name: string;
}

interface Props {
    users: UserType[];
    activeUser?: string | null;
}

const User = ({name, id, style}: UserType & {style: Object}) => {
    const dispatch = useDispatch();

    const onClick = useCallback(() => {
        dispatch(actions.setActiveUser(id));
    }, [dispatch, id]);

    return (
        <div onClick={onClick} style={{padding: '10px', border: '1px solid black', ...style}}>
            {name}
        </div>
    );
};

const Users = ({ users, activeUser }: Props) => (
    <div>
        {users.map((user: UserType) => <User style={activeUser == user.id ? {border: '2px solid red'} : {}} key={user.id} {...user} />)/* eslint-disable-line */}
    </div>
);

export default Users;
