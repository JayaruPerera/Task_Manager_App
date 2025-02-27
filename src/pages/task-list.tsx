import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";                                                                  //from Redux, allowing access to the global state.
import { RootState } from "../store";                                                                       //the type of the Redux store's state
import { Typography, Button,Card, message } from "antd";
import TaskList from "../components/task-list";
import "./task-list.css";
import { deleteTask } from "../store/taskSlice";

const { Title } = Typography;                                                                               //used for heading styles

const TaskListPage = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks); 
  
  const handleDeleteTask = (id: number) => {
    try {
      dispatch(deleteTask(id));
      message.success('Task deleted successfully');
    } catch (error) {
      message.error('Failed to delete task');
    }
  };//Retrieves the list of tasks from the Redux store.  useSelector extracts tasks from state.tasks.tasks. state: represents the entire state of the Redux store.  tasks(this is a variable that holds the tasks array) will contain the list of tasks(this is an array) from the Redux store's state.   

  return (
    <div className="task-list-container">
      <div className="task-header">
        <Title level={2}>Task List</Title>
        <Link to="/add-task">
          <Button type="primary">Add New Task</Button>
        </Link>
      </div>

      <Card className="task-card">
      {tasks.length === 0 ? (
        <div className="empty-state">
        <p>No tasks yet. Add your first task!</p>
        </div>
      ) : (
        <TaskList tasks={tasks} onDeleteTask={handleDeleteTask}/>
      )}
      </Card>
    </div>
  );
};

export default TaskListPage;