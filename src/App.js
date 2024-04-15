import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import TicketList from './components/TicketList';
import UserList from './components/UserList';

function App() {
  return (
    <div>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/ticket_list" element={<TicketList/>} />
            <Route path="/user_list" element={<UserList/>} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
