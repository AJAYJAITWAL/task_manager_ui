import { useNavigate, Link } from 'react-router-dom';
import { removeToken } from '../utils/authUtils';
import React, { useState } from 'react';
import { getToken } from '../utils/authUtils';
import axios from 'axios';

export default function Navbar({ setSearchResults, search_box }) {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({ search: '',});

  const handleLogout = (e) => {
    e.preventDefault();
    removeToken();

    navigate('/login')
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/tickets/search', {
        headers: {
          Authorization: getToken(),
        },
        params: formData,
      });
      console.log(response.data);
      setSearchResults(response.data);
      navigate('/ticket_list');
    } catch (error) {
      console.error('Error:', error);
    }
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
              <Link to="/ticket_list" className="nav-link">Tickets</Link>
              {localStorage.getItem('token') && localStorage.getItem('userRole') === 'admin' && (
                <Link to="/user_list" className="nav-link">Users</Link>
              )}
            </ul>
            { search_box && (
              <form className="d-flex" onSubmit={handleSearch} >
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" name="search" value={formData.search} onChange={handleChange}/>
                <button className="btn btn-primary" type="submit">Search</button>
              </form>
            )}
            {localStorage.getItem('token') ? (
              <>
                <span className="ms-3 fw-bold text-muted">{localStorage.getItem('userName')}</span>
                <Link className="btn btn-danger mx-2" onClick={handleLogout}>Logout</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="mx-2 btn btn-primary">Login</Link>
                <Link to="/signup" className="mx-2 btn btn-primary">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}

