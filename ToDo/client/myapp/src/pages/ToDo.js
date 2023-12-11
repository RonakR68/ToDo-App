import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ToDoPage = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const createToDo = async () => {
    try {
      if (title === '' || description === '' || date === '') {
        setAlertMessage('Please fill in all fields.');
        return;
      }

      if (new Date(date) < new Date()) {
        setAlertMessage('Please select a future date.');
        return;
      }

      const todoData = {
        title,
        description,
        date: date,
        username,
      };

      const response = await axios.post('http://localhost:4001/todo', todoData);

      if (response.status === 201) {
        alert('To-Do created successfully');
        setTitle('');
        setDescription('');
        setDate('');
      } else {
        alert('Failed to create To-Do');
      }
    } catch (error) {
      console.error('Error creating To-Do', error);
      alert('Failed to create To-Do');
    }
  };

  const handleLogout = () => {
    // Remove the username from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    // Redirect the user to the login page
    navigate('/login');
  };

  const goToCompleteToDo = () => {
    navigate(`/complete-todo/${username}`); 
  };
  
  const goToPendingToDo = () => {
    navigate(`/pending-todo/${username}`); 
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Create To-Do</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Date
          </label>
          <input
            type="date"
            className="form-control"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ width: '200px' }}
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={createToDo}
        >
          Create
        </button>
        <br/>
        <br/>
        <button
          type="button"
          className="btn btn-success"
          onClick={goToCompleteToDo}
        >
          See Completed Tasks
        </button>
        <br />
        <br />
        <button
          type="button"
          className="btn btn-warning"
          onClick={goToPendingToDo}
        >
          See Pending Tasks
        </button>

        <br/>
        <br/>
        <button type="button" className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </form>
      {alertMessage && (
        <div className="alert alert-danger mt-3">{alertMessage}</div>
      )}
    </div>
  );
};

export default ToDoPage;
