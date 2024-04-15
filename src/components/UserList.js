import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../utils/authUtils';
import ReactPaginate from 'react-paginate';
import Navbar from './Navbar';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [usersPerPage] = useState(5);
  const pageCount = Math.ceil(users.length / usersPerPage);

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

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * usersPerPage;
  const paginatedUsers = users.slice(offset, offset + usersPerPage);


  return (
    <>
      <Navbar/>
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
            {paginatedUsers.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>{user.ticket_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={'pagination justify-content-center my-5'}
          activeClassName={'active'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          disabledClassName={'disabled'}
        />
      </div>
    </>
  );
};

export default UserList;
