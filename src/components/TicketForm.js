import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';

export default function TicketForm() {
  let navigate = useNavigate();

  const [token, setToken] = useState('');
  const [status, setStatus] = useState('pending');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: status,
  });

  useEffect(() => {
    if (getToken) {
      setToken(getToken);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/tickets', formData, {
        headers: {
          Authorization: `${token}`,
        },
      });
      navigate('/task_list')
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
   <>
    <form onSubmit={handleCreateTask}>
      <div className="modal" id="createTaskModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Create Task</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="form-group mb-3">
                <label>Title</label>
                <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} />
              </div>
              <div className="form-group mb-3">
                <label>Description</label>
                <textarea className="form-control" name="description" value={formData.description} onChange={handleChange}></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="taskStatus" className="form-label" name="status" value={status}  onChange={(e) => setStatus(e.target.value)}>Status</label>
                <select className="form-select" id="taskStatus">
                  <option value="new_unassigned">New Unassigned</option>
                  <option value="open_assigned">Open Assigned</option>
                  <option value="in_progress">In Progress</option>
                  <option value="pending">Pending</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                  <option value="reopened">Reopened</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">Create Task</button>
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </form>
   </>
  )
}
