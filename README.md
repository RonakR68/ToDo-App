# ToDo List Web Application

- This MERN (MongoDB, Express.js, React.js, Node.js) based ToDo List demo application provides a simple platform for managing your tasks. The application consists of a backend server built with Express.js for handling data and a frontend React.js application for the user interface.

## Features
- The web app includes following pages and features:
1. Create ToDo Page
- A user-friendly interface with input boxes for title and description. Date Picker to specify the completion date of the To-Do item.
- Ensures that users can only select future dates, maintaining the relevance of To-Do items.
- Simplifies the process of creating a new To-Do item with a dedicated "Create" button.

2. Complete ToDo Page
- Showcases To-Do details with a completed status, providing a quick overview for the user.
- Presents details in a read-only format, maintaining data integrity.
  
3. Pending ToDo Page
- Displays To-Do items with an incomplete status, helping users focus on pending tasks.
- Each pending ToDo item features two action buttons: "Done" and "Delete."
- The "Done" button efficiently changes the status of a ToDo item to complete.
- The "Delete" button allows users to remove a ToDo item from the database seamlessly.

4. Logout: Enables users to log out securely, redirecting them to the login page for enhanced security.

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


