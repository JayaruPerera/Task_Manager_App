import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";                                                                  //from Redux, allowing access to the global state.
import { RootState } from "../store";                                                                       //the type of the Redux store's state
import { Typography, Button,Card, message, Select  } from "antd";
import TaskList from "../components/task-list";
import "../styles/task-list.css";
import { deleteTask } from "../store/taskSlice";
import { useState } from "react";

const { Title } = Typography;   
const { Option } = Select;                                                                            //used for heading styles

const TaskListPage = () => {
  const dispatch = useDispatch();                                                                          //Sends messages (actions) to the Redux Store.
  const tasks = useSelector((state: RootState) => state.tasks.tasks);        
  const [filterCategory, setFilterCategory] = useState("All");                             //Retrieves the list of tasks from the Redux store.//useSelector extracts tasks from state.tasks.tasks. state: represents the entire state of the Redux store.  tasks(this is a variable that holds the tasks array) will contain the list of tasks(this is an array) from the Redux store's state.
  
  const handleDeleteTask = (id: number) => {
    try {
      dispatch(deleteTask(id));
      message.success('Task deleted successfully');
    } catch (error) {
      message.error('Failed to delete task');
    }
  };//Retrieves the list of tasks from the Redux store.  useSelector extracts tasks from state.tasks.tasks. state: represents the entire state of the Redux store.  tasks(this is a variable that holds the tasks array) will contain the list of tasks(this is an array) from the Redux store's state.   


  const filteredTasks = filterCategory === "All"
  ? tasks
  : tasks.filter(tasks => tasks.category === filterCategory); //This line filters the tasks based on the selected category. If the selected category is "All", it returns all tasks. If a specific category is selected, it filters the tasks based on the category.

  return (
    <div className="task-list-container">
      <div className="task-header">
        <Title level={2}>Task List📃✒️</Title>

        <div className="task-header-actions">
        <Select
          defaultValue="All"
          style={{ width: 150, marginRight: 16 }} 
          onChange={(value) => setFilterCategory(value)}
        >
          <Option value="All">All</Option>
          <Option value="personal">Personal</Option>
          <Option value="work">Work</Option>
          <Option value="shopping">Shopping</Option>
          <Option value="other">Other</Option>
        </Select>

        <Link to="/add-task">
          <Button type="primary">Add New Task</Button>
        </Link>
      </div>
      </div>

      <Card className="task-card">
      {tasks.length === 0 ? (
        <div className="empty-state">
        <p>No tasks yet. Add your first task!</p>
        </div>
      ) : (
        <TaskList tasks={filteredTasks} onDeleteTask={handleDeleteTask}/>
      )}
      </Card>
    </div>
  );
};

export default TaskListPage;