import { Link, useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/task-form";
import { useDispatch, useSelector } from "react-redux";                                 //Redux hook that allows to dispatch actions to the Redux store.
import { addTask, updateTask } from "../store/taskSlice";                              //An action from taskSlice.ts that will be used to add a new task to the Redux store.
import { Task } from "../types/task";                                     //type definition to enforce type safety for the new task object.
import { Typography, Card, message } from "antd";
import { useEffect, useState } from "react";
import { RootState } from "../store";

const { Title } = Typography;

interface TaskFormData {                                                  //Defines the shape of the form data that will be passed from task-form.tsx.
  title: string;
  description: string;
  dueDate: string;
  priority?: string;
}

const AddTask = () => {
  const dispatch = useDispatch();                                         //Allows to send actions (like adding a task) to the Redux store.
  const navigate = useNavigate();                                         //Enables page redirection after adding a task.
  const { id } = useParams<{ id?: string }>();
  const isEditing = Boolean(id);
  const taskId = id ? parseInt(id, 10) : null;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialValues, setInitialValues] = useState<TaskFormData | undefined>(undefined);
  
  // Get the task if in edit mode
  const task = useSelector((state: RootState) => 
    taskId ? state.tasks.tasks.find(t => t.id === taskId) : undefined
  );
  
  // Set initial values when editing
  useEffect(() => {
    if (isEditing && task) {
      setInitialValues({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
      });
    }
  }, [isEditing, task]);
  
  // Handle task not found when editing
  useEffect(() => {
    if (isEditing && taskId && !task) {
      message.error("Task not found");
      navigate("/");
    }
  }, [isEditing, taskId, task, navigate]);

  const handleTaskSubmit = (taskData: TaskFormData) => {
    setIsSubmitting(true);
    try {
      if (isEditing && task) {
        // Update existing task
        const updatedTask: Task = {
          ...task,
          ...taskData
        };
        dispatch(updateTask(updatedTask));
        message.success('Task updated successfully!')
          // setIsSubmitting(false); // Reset loading state before navigation
          // navigate('/');
       // Add the setTimeout for updating tasks too
      setTimeout(() => {
        setIsSubmitting(false);
        navigate('/');
      }, 1000); // Short delay to allow message to be seen
      
      } else {
        // Add new task
        const newTask: Task = {
          id: Date.now(),
          ...taskData,
          completed: false,
          priority: 'medium'
        };
        dispatch(addTask(newTask));
        message.success('Task added successfully!') 
          // setIsSubmitting(false); // Reset loading state before navigation
          // navigate('/');
        // Directly navigate without delay
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/');
    }, 1000); // Short delay to allow message to be seen
    
      }
    } catch (error) {
      message.error(isEditing ? 'Failed to update task' : 'Failed to add task');
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <Title level={2}>{isEditing ? 'Edit Task' : 'Add New Task'}</Title>
      <Card>
        <TaskForm onSubmit={handleTaskSubmit}
        initialValues={initialValues}
        isSubmitting={isSubmitting}
        submitButtonText={isEditing ? 'Update Task' : 'Add Task'}
      />
        <div style={{ marginTop: 16 }}>
          <Link to="/">Go Back</Link>
        </div>
      </Card>
    </div>
  );
};

export default AddTask;