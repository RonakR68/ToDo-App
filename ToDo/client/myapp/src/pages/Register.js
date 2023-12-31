import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
    //const [users, setUsers] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();


    useEffect(() => {
        fetchUsers();
    }, [])

    const fetchUsers = () => {
        axios
        .get('http://localhost:4001/register')
        .then((res) => {
            // console.log(res.data)
        })
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        axios
        .post('http://localhost:4001/register', { username, password })
        .then(() => {
            alert('Registration Successful')
            setUsername('')
            setPassword('')
            fetchUsers();
            navigate('/')
        })
        .catch((error) => {
            if (error.response && error.response.data && error.response.data.error) {
                console.log(error.response.data.error);
              } else {
                console.log('Unable to register user');
              }
            });

    }

  return (
    <div className='w-full h-screen flex'>
        <div className='w-[50%] h-[100%] flex justify-center items-center bg-teal-800'>
            <h2 className='text-3xl text-primary text-center'>ToDo Registration</h2>
        </div>
        <div className='w-[50%] h-[100%] bg-[#1a1a1a] text-white flex justify-center items-center'>
            <form className='text-center border rounded-lg w-[600px] h-[400px] p-9'
            onSubmit={handleSubmit}>
                 {/*Username Input */}
                 <label>Username</label>
                <br />
                <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
                type='text'
                placeholder='Username'
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
                <br />
                <br />
                 {/* Password Input */}
                 <label>Password</label>
                <br />
                <input className='w-[400px] h-[40px] rounded-xl bg-zinc-700 p-2'
                type='password'
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
                <br />
                <br />
                {/* Button */}
                <button className='w-[200px] h-[50px] border hover:bg-teal-900'
                type='submit'>Register</button>
                <p className='mt-3 text-dark' >
                Existing User? <Link to='/'>Login</Link>
                </p>
            </form>
        </div>
    </div>
  )
}

export default Register
