import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Dispatch, RootState } from './store';
import Home from './pages/home';
import Role from './pages/role';
import './App.css';
import { useEffect } from 'react';

function App() {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<Dispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.name) {
      const lastUser = localStorage.getItem('last-login-user');
      if (lastUser) {
        const [name, role] = lastUser.split('-');
        dispatch.user.updateUser({
          name,
          role
        });
      } else {
        navigate('role');
      }
    }
  }, [user, navigate, dispatch]);


  useEffect(() => {
    const serializedTodoList = localStorage.getItem('todo-list');
    if (serializedTodoList) {
      const todoList = JSON.parse(serializedTodoList);
      dispatch.todo.updateTodo(todoList);
    }
  }, [dispatch])


  return (
    <div className="App">
      <h1>TodoList for Clean Arch</h1>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/role' element={<Role />} /> 
      </Routes>
    </div>
  );
}

export default App;
