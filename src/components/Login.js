import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessages from './ErrorMessages';
import Navbar from './Navbar';
import { login } from '../store/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.login.errorMessage);
  const loggedIn = useSelector((state) => state.login.loggedIn);
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

    dispatch(login(formData));
  };

  useEffect(() => {
    if (loggedIn) {
      navigate('/ticket_list');
    }
  }, [loggedIn, navigate]);

  return (
    <>
      <Navbar/>
      <div>
        <h2 className='text-center my-3'>Login</h2>
        <ErrorMessages errorMessage={errorMessage}/>
        <h4 className='container my-3'>Please log in to access the application</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 container">
            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" required/>
          </div>
          <div className="mb-3 container">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" id="inputPassword" placeholder="Password" required/>
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
