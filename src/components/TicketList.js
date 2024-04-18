import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../utils/authUtils';
import TicketForm from './TicketForm';
import Navbar from './Navbar';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

const TicketList = () => {
  let navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState('');
  const [editTicket, setEditTicket] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(0);
  const [tasksPerPage] = useState(10);
  const pageCount = Math.ceil(tasks.length / tasksPerPage);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (getToken) {
      setToken(getToken);
    }
  }, []);

  useEffect(() => {
    setTasks(searchResults);
  }, [searchResults]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    if (token) {
      const fetchTasks = async () => {
        try {
          const response = await axios.get('/tickets', {
            headers: {
              Authorization: `${token}`,
            },
          });
          setTasks(response.data);
          console.log(tasks);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };

      fetchTasks();
    }
  }, [token]);

  const handleCreate = () => {
    setEditTicket(null);
  };

  const handleEdit = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setEditTicket(taskToEdit);
  };

  const handleTicketUpdated = (updatedTicket) => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTicket.id ? updatedTicket : task
    );

    setTasks(updatedTasks);
  };

  const handleDelete = async (taskId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this ticket?');

    if (confirmDelete) {
      try {
        await axios.delete(`/tickets/${taskId}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setTasks(tasks.filter(task => task.id !== taskId));
        console.log('Task deleted successfully!');
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleTicketCreated = (newTicket) => {
    setTasks([...tasks, newTicket]);
  };

  const sortTable = (key) => {
    let direction = 'asc';

    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    if (sortConfig.direction === 'asc') {
      return a[sortConfig.key] < b[sortConfig.key] ? -1 : 1;
    } else {
      return a[sortConfig.key] > b[sortConfig.key] ? -1 : 1;
    }
  });

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * tasksPerPage;
  const paginatedTasks = sortedTasks.slice(offset, offset + tasksPerPage).reverse();

  return (
    <>
      <Navbar setSearchResults={setSearchResults} search_box={true} />
      <div className='container my-3'>
        <button type="button" className="btn btn-primary my-4" data-bs-toggle="modal" data-bs-target="#createTaskModal" onClick={handleCreate}>Create Ticket</button>
        <h2>Ticket List</h2>
        <table className='task-list-table'>
          <thead>
            <tr>
              <th className='cursor-pointer' onClick={() => sortTable('id')}>ID</th>
              <th className='cursor-pointer' onClick={() => sortTable('title')}>Title</th>
              <th className='cursor-pointer' onClick={() => sortTable('description')}>Description</th>
              <th className='cursor-pointer' onClick={() => sortTable('status')}>Status</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTasks.map(task => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.status}</td>
                <td><button className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#createTaskModal" onClick={() => handleEdit(task.id)}>Edit</button></td>
                <td><button className='btn btn-danger' onClick={() => handleDelete(task.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <TicketForm
          ticketToEdit={editTicket}
          onTicketCreated={handleTicketCreated}
          onTicketUpdated={handleTicketUpdated}
        />
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

export default TicketList;
