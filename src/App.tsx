import { Routes, Route } from 'react-router-dom'
import TaskList from './pages/task-list'
import AddTask from './pages/add-task'
import { Layout } from 'antd'

const { Content } = Layout;

function App() {

    return (
      <Layout className="app-layout">
        <Content className="app-content">
        <div className="content-container">
      <Routes>
        <Route path="/" element={<TaskList />} />
        <Route path="/add-task" element={<AddTask />} />
      </Routes>
      </div>
      </Content>
    </Layout>
    )
  }

export default App
