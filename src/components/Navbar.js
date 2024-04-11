import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/authUtils';

export default function Navbar() {
  let navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    removeToken();

    navigate('/login')
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Task Manager</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <Link to="/task_list" className="nav-link">Tasks</Link>
              <Link to="/user_list" className="nav-link">Users</Link>
            </ul>
            <form className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-primary" type="submit">Search</button>
            </form>
            <Link className='btn btn-danger mx-2' onClick={handleLogout}>Logout</Link>
            <Link to="/login" className='mx-2 btn btn-primary'>Login</Link>
            <Link to="/signup" className='mx-2 btn btn-primary'>Sign Up</Link>
          </div>
        </div>
      </nav>
    </>
  )
}

