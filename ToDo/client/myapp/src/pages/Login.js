import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:4001/register').then((res) => {
      console.log(res.data);
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4001/login', { username, password });
      const token = response.data.token;
      alert('Login successful');
      setUsername('');
      setPassword('');
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      console.log(token);
      navigate('/todo');
    } 
    catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            // If the server provides an error message, display it
            alert(`Login error: ${error.response.data.error}`);
          } else {
            // If there's no specific error message, log the error for debugging
            console.log('Error in Login', error);
          }
    }
  };

  return (
    <div className='w-full h-screen flex'>
      <div className='w-[50%] h-[100%] flex justify-center items-center bg-teal-800'>
        <h2 className='text-3xl text-center text-primary'>ToDo Login</h2>
      </div>
      <div className='w-[50%] h-[100%] bg-[#1a1a1a] text-white flex flex-col justify-center items-center'>
        <form
          className='text-center border rounded-lg w-[600px] h-[400px] p-9'
          onSubmit={handleLogin}
        >
          {/* Username Input */}
          <label>Username</label>
          <br />
          <input
            className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <br />
          <br />
          {/* Password Input */}
          <label>Password</label>
          <br />
          <input
            className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <br />
          <button className='w-[1000px] h-[100px] border hover:bg-teal-900 mb-6' type='submit'>
            Login
          </button>
          <br/>
          <br/>
          <p className='text-center text-dark'>OR</p>
          <button
            className='w-[500px] h-[100px] border hover:bg-teal-900 mt-6'
            type='button'
            onClick={() => navigate('/register')}>
            Register
          </button>
        </form>
        
      </div>
    </div>
  );
}

export default Login;
