require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('./models/userModel')
const ToDo = require('./models/ToDoModel');

// connect to express app
const app = express()

// connect to mongoDB
mongoose
.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log('Server connected to port ',process.env.PORT,' and MongoDb')
    })
})
.catch((error) => {
    console.log('Unable to connect to Server/MongoDB ', error)
})

// middleware
app.use(bodyParser.json())
app.use(cors())


//Routes

// REGISTER
//POST request to register new users
app.post('/register', async (req, res) => {
    try {
        const existingUser = await User.findOne({ username: req.body.username });

        if (existingUser) {
            return res.status(400).json({ error: 'Username is already in use' });
        }

        const { username, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({ username, password: hashedPassword })
        await newUser.save()
        res.status(201).json({ message: 'Registration Successful!' })
    } 
    catch (error) {
        res.status(500).json({ 
            error: 'Registration Error!',
            description: error.message
        });
    }
})

//GET request for Registered Users
app.get('/register', async (req, res) => {
    try {
        const users = await User.find()
        res.status(201).json(users)
        
    } 
    catch (error) {
        res.status(500).json({ error: 'Error fetching user details' })
    }
})

//LOGIN
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(401).json({ error: 'User not found'})
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' })
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1hr' })
        res.json({ message: 'Login successful!', token, user })
    } 
    catch (error) {
        res.status(500).json({ error: 'Login Error!' })
    }
})

// POST request to create a new To-Do item
app.post('/todo', async (req, res) =>{
    try{
        const{ title, description, date, username } = req.body;
        if (new Date(date) < new Date()) {
            return res.status(400).json({ error: 'Due date must be a future date' });
        }
        const newToDo = new ToDo({
            title,
            description,
            date,
            status: true,
            username,
        });
        await newToDo.save();
        res.status(201).json({ message: 'To-Do created successfully' });
    } 
    catch (error){
        res.status(500).json({ error: 'To-Do creation failed' });
    }
  });
  
  // GET request to retrieve To-Do items for a specific user
  app.get('/todo/:username', async (req, res) => {
    try {
        const username = req.params.username;
        const todos = await ToDo.find({ username });
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve To-Do items' });
    }
});

app.patch('/todo/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const updatedToDo = await ToDo.findByIdAndUpdate(id, { status: false }, { new: true });
  
      if (!updatedToDo) {
        return res.status(404).json({ error: 'To-Do not found' });
      }
  
      res.status(200).json({ message: 'To-Do marked as completed', updatedToDo });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update the To-Do item' });
    }
  });

  // DELETE request to delete a to-do item
app.delete('/todo/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const deletedToDo = await ToDo.findByIdAndRemove(id);
  
      if (!deletedToDo) {
        return res.status(404).json({ error: 'To-Do not found' });
      }
  
      res.status(200).json({ message: 'To-Do deleted successfully', deletedToDo });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete the To-Do item' });
    }
  });

  // DELETE request to delete a completed to-do item
app.delete('/completed-todo/:id', async (req, res) => {
    try {
      const id = req.params.id;
      const deletedToDo = await ToDo.findByIdAndRemove(id);
  
      if (!deletedToDo) {
        return res.status(404).json({ error: 'Completed To-Do not found' });
      }
  
      res.status(200).json({
        message: 'Completed To-Do deleted successfully',
        deletedToDo,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Failed to delete the completed To-Do item' });
    }
  });
  
  
  

