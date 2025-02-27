<h1>React Task Manager</h1>

A comprehensive task management application built with React, TypeScript, and Redux Toolkit.

<h2>Features</h2>
✅ Create new tasks with title, description, and due date
✅ View all tasks in a clean, organized list
✅ Edit existing tasks
✅ Delete tasks
✅ Task status tracking (completed/pending)

<h2>Technologies Used</h2>

⏺️React 18 with TypeScript for UI components
⏺️Vite for fast development and optimized builds
⏺️Redux Toolkit for state management
⏺️React Router for navigation between pages
⏺️Ant Design for UI components

<h2>Project Structure</h2>

/src
  /components        # Reusable UI components
    task-form.tsx    # Form for adding/editing tasks
    task-list.tsx    # Component to display list of tasks
  /pages             # Route-level components
    task-list.tsx    # Main page showing all tasks
    add-task.tsx     # Page for adding and editing tasks
  /store             # Redux store setup
    index.ts         # Store configuration
    taskSlice.ts     # Task-related reducers and actions
  /types             # TypeScript type definitions
    task.ts          # Task interface
  /styles            # CSS files
  App.tsx            # Main application component
  main.tsx           # Application entry point

<h2>Core Functionality</h2>

<h3>Task Management</h3>

⏺️Add Task: Create new tasks with title, description, and due date
⏺️View Tasks: See all tasks with their details in a list format
⏺️Edit Task: Modify existing tasks by updating any field
⏺️Delete Task: Remove tasks with confirmation dialog

<h3>State Management</h3>

The application uses Redux Toolkit for state management with the following actions:

⏺️addTask: Add a new task to the store
⏺️updateTask: Update an existing task
⏺️deleteTask: Remove a task from the store

<h2>Getting Started</h2>

<h3>Prerequisites</h3>

⏺️Node.js (v14 or later)
⏺️npm or yarn

<h3>Installation</h3>

1. Clone the repository:

git clone [repository-url]
cd my-task-manager

2. Install dependencies:

npm install
# or
yarn

3. Start the development server:

npm run dev
# or
yarn dev

4. Open your browser and navigate to http://localhost:5173

<h2>Building for Production</h2>

To create an optimized production build:

npm run build
# or
yarn build

The build output will be located in the dist directory.
