import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CompletedToDo = ({ username }) => {
  const [completedToDos, setCompletedToDos] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`http://localhost:4001/todo/${username}`)
      .then((response) => {
        const completedToDos = response.data.filter((todo) => todo.status === false);
        setCompletedToDos(completedToDos);
      })
      .catch((error) => {
        console.error('Error fetching completed To-Dos', error);
      });
  }, [username]);

  const deleteToDo = (id) => {
    // Send a request to delete the To-Do item
    axios
      .delete(`http://localhost:4001/todo/${id}`)
      .then(() => {
        // Remove the deleted item from the state
        setCompletedToDos((prevState) =>
          prevState.filter((toDo) => toDo._id !== id)
        );
      })
      .catch((error) => {
        console.error('Error deleting To-Do', error);
      });
  };

  const handleLogout = () => {
    // Remove the username from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    // Redirect the user to the login page
    navigate('/login');
  };

  const goToHome = () => {
    navigate(`/todo`); 
  };
  

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Completed To-Do List</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {completedToDos.map((toDo) => (
            <tr key={toDo._id}>
              <td>{toDo.title}</td>
              <td>{toDo.description}</td>
              <td>Completed</td>
              <td>{toDo.date}</td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteToDo(toDo._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
        <br/>
        <button type="button" className="btn btn-primary" onClick={goToHome}>
          ToDo Home
        </button>
      <br/>
        <br/>
        <button type="button" className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
    </div>
  );
};

export default CompletedToDo;
