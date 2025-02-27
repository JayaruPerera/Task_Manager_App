import { Link, useNavigate } from "react-router-dom";
import TaskForm from "../components/task-form";
import { useDispatch } from "react-redux";                                 //Redux hook that allows to dispatch actions to the Redux store.
import { addTask } from "../store/taskSlice";                              //An action from taskSlice.ts that will be used to add a new task to the Redux store.
import { Task } from "../types/task";                                     //type definition to enforce type safety for the new task object.
import { Typography, Card, message } from "antd";

const { Title } = Typography;

interface TaskFormData {                                                  //Defines the shape of the form data that will be passed from task-form.tsx.
  title: string;
  description: string;
  dueDate: string;
}

const AddTask = () => {
  const dispatch = useDispatch();                                         //Allows to send actions (like adding a task) to the Redux store.
  const navigate = useNavigate();                                         //Enables page redirection after adding a task.

  const handleTaskSubmit = (taskData: TaskFormData) => {
    const newTask: Task = {
      id: Date.now(),
      ...taskData,
      completed: false
    };

// console.log('id',newTask.id);

    try {
      dispatch(addTask(newTask));                                       //Sends the new task object to the Redux store.         
      message.success('Task added successfully!');
      navigate('/'); // Redirect to task list page
    } catch (error) {
      message.error('Failed to add task');
    }
  };

  return (
    <div>
      <Title level={2}>Add New Task</Title>
      <Card>
        <TaskForm onSubmit={handleTaskSubmit} />
        <div style={{ marginTop: 16 }}>
          <Link to="/">Go Back</Link>
        </div>
      </Card>
    </div>
  );
};

export default AddTask;