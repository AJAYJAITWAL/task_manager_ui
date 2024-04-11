import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  let navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
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
      const response = await axios.post('/users', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigate('/login')
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2 className='text-center my-3'>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 container">
          <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" id="exampleFormControlInput1" placeholder="Enter your name"/>
        </div>
        <div className="mb-3 container">
          <label htmlFor="exampleFormControlInput2" className="form-label">Email address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" id="exampleFormControlInput2" placeholder="name@example.com"/>
        </div>
        <div className="mb-3 container">
          <label htmlFor="exampleFormControlInput3" className="form-label">Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} className="form-control" id="exampleFormControlInput3" placeholder="Enter your username"/>
        </div>
        <div className="mb-3 container">
          <label htmlFor="inputPassword1" className="form-label">Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} className="form-control" id="inputPassword1" placeholder="Password"/>
        </div>
        <div className="mb-3 container">
          <label htmlFor="inputPassword2" className="form-label">Password Confirmation</label>
          <input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} className="form-control" id="inputPassword2" placeholder="Password Confirmation"/>
        </div>
        <div className="mb-3 container">
          <button type="submit" className="btn btn-primary mb-3">Sign Up</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
