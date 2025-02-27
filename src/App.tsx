import { Routes, Route } from 'react-router-dom'
import TaskList from './pages/task-list'
import AddTask from './pages/add-task'

function App() {

    return (
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add-task" element={<AddTask />} />
      </Routes>
    )
  }

export default App
