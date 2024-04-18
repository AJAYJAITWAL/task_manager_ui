import React, { useState, useEffect } from 'react';
import { getToken } from '../utils/authUtils';
import Navbar from './Navbar';
import { fetchUsers } from '../store/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';

const UserList = () => {
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [usersPerPage] = useState(10);
  const pageCount = Math.ceil(users.length / usersPerPage);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (getToken) {
      setToken(getToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(fetchUsers(token));
    }
  }, [dispatch, token]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * usersPerPage;
  const paginatedUsers = users.slice(offset, offset + usersPerPage).reverse();


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
