import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import React from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import ToDoPage from './pages/ToDo';
import CompleteToDo from './pages/CompleteToDo';
import PendingToDo from './pages/PendingToDo';
import 'bootstrap/dist/css/bootstrap.min.css';

// Custom PrivateRoute component
function PrivateRoute({ path, element }) {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  console.log(username);
  return token ? (
    React.cloneElement(element, { username }) // Pass the username as a prop
  ) : (
    <Navigate to="/login" replace />
  );
}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/todo"
          element={<PrivateRoute element={<ToDoPage />} />}
        />
        <Route
          path="/complete-todo/:username"
          element={<PrivateRoute element={<CompleteToDo />} />}
        />
        <Route path="/pending-todo/:username" element={<PrivateRoute element={<PendingToDo />} />} />

      </Routes>
    </div>
  );
}

export default App;
