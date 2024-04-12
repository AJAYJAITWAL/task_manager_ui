import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../utils/authUtils';
import TicketForm from './TicketForm';

const TicketList = () => {
  const [tasks, setTasks] = useState([]);
  const [token, setToken] = useState('');
  const [editTicket, setEditTicket] = useState(null);

  useEffect(() => {
    if (getToken) {
      setToken(getToken);
    }
  }, []);

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

  return (
    <div className='container my-3'>
      <button type="button" className="btn btn-primary my-4" data-bs-toggle="modal" data-bs-target="#createTaskModal" onClick={handleCreate}>Create Ticket</button>
      <h2>Ticket List</h2>
      <table className='task-list-table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>
                <button className='btn btn-warning' data-bs-toggle="modal" data-bs-target="#createTaskModal" onClick={() => handleEdit(task.id)}>Edit</button>
              </td>
              <td>
                <button className='btn btn-danger' onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TicketForm
        ticketToEdit={editTicket}
        onTicketCreated={handleTicketCreated}
        onTicketUpdated={handleTicketUpdated}
      />
    </div>
  );
};

export default TicketList;
