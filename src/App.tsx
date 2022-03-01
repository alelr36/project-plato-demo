import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import Tasks from './components/Tasks';
import Users from './components/Users';
import { actions as usersActions } from './components/Users/reducer';
import { actions as tasksActions } from './components/Tasks/reducer';
import type { RootState } from './store'
import { useNavigate, useLocation } from "react-router-dom";

import './App.css';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const urlId = location.pathname.match(/users[\/]\d+$/gm); // eslint-disable-line
  const [id, setId] = useState(urlId ? urlId[0].split('/').pop() : null);
  const { users, activeUser } = useSelector((state: RootState) => state.users);
  const { tasks } = useSelector((state: RootState) => state.tasks);

  useEffect(() => {
    dispatch(usersActions.fetchUsers());
    dispatch(tasksActions.fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    if (users.length) {
      // @ts-ignore
      dispatch(usersActions.setActiveUser(id || users[0].id));
    }
  }, [dispatch, users, id]);

  useEffect(() => {
    if (activeUser) {
      navigate(`/users/${activeUser}`);
      setId(activeUser);
    }
  }, [activeUser, navigate]);

  const tasks2 = useMemo(() => {
    // @ts-ignore
    return tasks.filter((task) => task.userId == id); // eslint-disable-line
  }, [id, tasks]);

  console.log(tasks2);

  return (
    <div className="App">
        <Users users={users} activeUser={id} />
        <Tasks tasks={tasks2} />
    </div>
  );
}

export default App;
