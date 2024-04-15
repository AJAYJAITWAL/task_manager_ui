import React, { useState } from 'react';
import { setToken } from '../utils/authUtils';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Login = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setToken(response.data);
      navigate('/ticket_list');
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Navbar/>
      <div>
        <h2 className='text-center my-3'>Login</h2>
        <h4 className='container my-3'>Please log in to access the application</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 container">
            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
          </div>
          <div className="mb-3 container">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" id="inputPassword" placeholder="Password"/>
          </div>
          <div className="mb-3 container">
            <button type="submit" className="btn btn-primary mb-3">Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
