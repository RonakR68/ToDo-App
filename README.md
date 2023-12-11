# ToDo List Web Application

- This MERN (MongoDB, Express.js, React.js, Node.js) based ToDo List demo application provides a simple platform for managing your tasks. The application consists of a backend server built with Express.js for handling data and a frontend React.js application for the user interface.

## Backend

- The backend of the application is powered by Express.js. The server folder contains the following key components:
1. models/: Database schema definitions (user.model.js and todo.model.js).
2. .env: Configuration file for constants like DATABASE_CONNECTION_STRING, PORT, etc.
3. server.js: Main server file.

## Backend Setup

1. Navigate to the 'server' directory.
2. Install required modules using the command:
```sh
npm install
```
3. Configure the .env file with the necessary settings.

## Running the Server

- To run the server use the command
```sh
npx nodemon start
```

## Frontend

- The frontend of the application is built using React.js. The client folder contains the React app (myapp), with key pages for login, registration, ToDo, CompleteToDo, and PendingToDo.

## Frontend Setup

- Navigate to the client/myapp directory.
- Install the required modules using the command:
```sh
npm install
```

## Running the Client

- To run the client, use the command:
```sh
npm start
```

## Pages URLs on localhost

- Login Page: http://localhost:3000/login
- Register Page: http://localhost:3000/register
- ToDo Page: http://localhost:3000/todo
- Pending ToDo Page: http://localhost:3000/pending-todo/{username}
- Complete ToDo Page: http://localhost:3000/complete-todo/{username}

## Running the Application

1. Start the server using the provided command.
2. Start the React app using the provided command.
3. Access the different pages via the provided URLs.

# Note:
- Ensure that all required modules are properly installed.
- Ensure MongoDB is setup correctly.


