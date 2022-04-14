import { Routes, Route } from 'react-router-dom';
import { useAppDriver } from './App.driver';
import Home from './pages/home/home';
import Role from './pages/role/role';

import './App.scss';


function App() {

  useAppDriver();

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
