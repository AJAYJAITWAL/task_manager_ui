import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import TaskList from './components/TaskList';
import UserList from './components/UserList';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/task_list" element={<TaskList/>} />
            <Route path="/user_list" element={<UserList/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
