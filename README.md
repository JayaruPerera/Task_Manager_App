<h1>React Task Manager</h1>

A comprehensive task management application built with React, TypeScript, and Redux Toolkit.

<h2>Features</h2>
✅ Create new tasks with title, description, and due date <br>
✅ View all tasks in a clean, organized list<br>
✅ Edit existing tasks<br>
✅ Delete tasks<br>
✅ Task status tracking (completed/pending)

<h2>Technologies Used</h2>

⏺️React 18 with TypeScript for UI components<br>
⏺️Vite for fast development and optimized builds<br>
⏺️Redux Toolkit for state management<br>
⏺️React Router for navigation between pages<br>
⏺️Ant Design for UI components

<h2>Project Structure</h2>

/src<br>
  /components        # Reusable UI components<br>
    task-form.tsx    # Form for adding/editing tasks<br>
    task-list.tsx    # Component to display list of tasks<br>
  /pages             # Route-level components<br>
    task-list.tsx    # Main page showing all tasks<br>
    add-task.tsx     # Page for adding and editing tasks<br>
  /store             # Redux store setup<br>
    index.ts         # Store configuration<br>
    taskSlice.ts     # Task-related reducers and actions<br>
  /types             # TypeScript type definitions<br>
    task.ts          # Task interface<br>
  /styles            # CSS files<br>
  App.tsx            # Main application component<br>
  main.tsx           # Application entry point<br>

<h2>Core Functionality</h2>

<h3>Task Management</h3>

⏺️Add Task: Create new tasks with title, description, and due date<br>
⏺️View Tasks: See all tasks with their details in a list format<br>
⏺️Edit Task: Modify existing tasks by updating any field<br>
⏺️Delete Task: Remove tasks with confirmation dialog

<h3>State Management</h3>

The application uses Redux Toolkit for state management with the following actions:

⏺️addTask: Add a new task to the store<br>
⏺️updateTask: Update an existing task<br>
⏺️deleteTask: Remove a task from the store

<h2>Getting Started</h2>

<h3>Prerequisites</h3>

⏺️Node.js (v14 or later)<br>
⏺️npm or yarn

<h3>Installation</h3>

1. Clone the repository:

git clone [repository-url]
cd my-task-manager

2. Install dependencies:

npm install
or
yarn

3. Start the development server:

npm run dev
or
yarn dev

4. Open your browser and navigate to http://localhost:5173

<h2>Building for Production</h2>

To create an optimized production build:

npm run build
or
yarn build

The build output will be located in the dist directory.
