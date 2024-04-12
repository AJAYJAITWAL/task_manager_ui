import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../utils/authUtils';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    if (getToken) {
      setToken(getToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const fetcUsers = async () => {
        try {
          const response = await axios.get('/users', {
            headers: {
              Authorization: `${token}`,
            },
          });
          setUsers(response.data);
          console.log(users);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      fetcUsers();
    }
  }, [token]);

  return (
    <div className='container my-3'>
      <h2>Users List</h2>
      <table className='user-list-table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
            <th>Tickets</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>{user.username.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
