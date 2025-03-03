import { Link, useNavigate, useParams } from "react-router-dom";
import TaskForm from "../components/task-form";
import { useDispatch, useSelector } from "react-redux";                                 //Redux hook that allows to dispatch actions to the Redux store.
import { addTask, updateTask } from "../store/taskSlice";                              //An action from taskSlice.ts that will be used to add a new task to the Redux store.
import { Task } from "../types/task";                                     //A TypeScript type that defines what a task should look like. type definition to enforce type safety for the new task object. 
import { Typography, message } from "antd";                               //Typography → Provides text styling components from Ant Design. message → Used to show success/error notifications
import { useEffect, useState } from "react";                                      //useEffect → Runs code when something changes (e.g., when editing a task)
import { RootState } from "../store";                                             //RootState → Defines the structure of the Redux store.
import "../styles/add-task.css";

const { Title } = Typography;                                             //Extracts Title from Typography (used for page headings).

interface TaskFormData {                                                  //Defines the shape of the form data that will be passed from task-form.tsx.
  title: string;                                                       //(required)                          
  description: string;                                                  //(required)    
  dueDate?: string | null;                                            //(optional)                        
  priority?: 'low' | 'medium' | 'high';                                          //(optional)  
}

const AddTask = () => {
  const dispatch = useDispatch();                                         //Allows to send actions (like adding a task) to the Redux store.
  const navigate = useNavigate();                                         //Enables page redirection after adding a task or updating a task.
  const { id } = useParams<{ id?: string }>();                            //const { id }:This is pulling the id part directly from the URL parameters.  <{ id?: string }>: This tells TypeScript what kind of data to expect.  id?: string means the id might be a string, or it might not exist (optional). 
  const isEditing = Boolean(id);                                          //Checks if the page is in edit mode (true) or add mode (false). Converts id to a boolean: If id exists → true (Editing Mode).If no id → false (Adding Mode).
  const taskId = id ? parseInt(id, 10) : null;                           //If id is present: Convert id to a number and store it in taskId. If id is not present: Set taskId to null. id ?: This checks if id exists (i.e., it's not undefined or null). parseInt(id, 10): If id exists, this converts the id from a string to a number using parseInt. The 10 indicates that it should parse the id as a base 10 number (decimal).  : null: If id does not exist, taskId is set to null.
  const [isSubmitting, setIsSubmitting] = useState(false);                                          //When a user clicks a submit button on a form, you can set isSubmitting to true to show a loading spinner or disable the button. Once the form submission is complete, you can set it back to false
  const [initialValues, setInitialValues] = useState<TaskFormData | undefined>(undefined);          //<TaskFormData | undefined>: This tells TypeScript that the initialValues can either be of type TaskFormData or undefined. TaskFormData: This is an interface or type that defines the shape of the form data, such as { title: string, description: string, dueDate: string } (undefined): This is the initial value of initialValues. It starts as undefined
  
  // Get the task if in edit mode
  const task = useSelector((state: RootState) =>                                                   //This is an arrow function that takes the Redux state as an argument (state) and returns either the task with the matching ID or undefined.
    taskId ? state.tasks.tasks.find(t => t.id === taskId) : undefined                             //taskId ? state.tasks.tasks.find(t => t.id === taskId) : undefined: This is a ternary operator that checks if taskId exists. If taskId exists, it finds the task with the matching ID. If taskId does not exist, it returns undefined.
  );
  
  // Set initial values when editing. Runs when isEditing or task changes.
  useEffect(() => {
    if (isEditing && task) {                                            //if (isEditing && task) { ... }: It checks if isEditing is true and if task exists. If both conditions are met, it will execute the code inside the block.
      setInitialValues({                                                // This function updates the initialValues state with the data from the task. This will pre-fill the form fields with the task data when editing.
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority
      });
    }
  }, [isEditing, task]);                                                //Dependency Array-  [isEditing, task]: The dependency array specifies when the effect should run. In this case, the effect will run whenever isEditing or task changes.
  
  // Handle task not found when editing
  useEffect(() => {
    if (isEditing && taskId && !task) {                               //checks if the component is in editing mode and if the task with the given ID exists. If the task is not found, it displays an error message and redirects the user to the homepage. if (isEditing && taskId && !task) { ... }: This indicates that the component is in editing mode, if taskId exists(This ensures that there is a valid task ID.), and if task does not exist This checks if there is no task with the given taskId. If all conditions are met, it will execute the code inside the block.
      message.error("Task not found");
      navigate("/");
    }
  }, [isEditing, taskId, task, navigate]);                            //The effect will run whenever any of these dependencies change.

  const handleTaskSubmit = (taskData: TaskFormData) => {              //This function is called when the form is submitted. It receives the form data as an argument and processes it to add or update a task. taskData: TaskFormData This specifies that the taskData parameter must conform to the TaskFormData type.
    setIsSubmitting(true);                                            //
    try {
      if (isEditing && task) {
        // Update existing task
        const updatedTask: Task = {
          ...task,
          ...taskData,
          priority: taskData.priority || 'medium'
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
          priority: taskData.priority || 'medium'
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
    <div className="add-task-container">
      <div className="add-task-header">
      <Title level={2}>{isEditing ? 'Edit Task ✂️' : 'Add New Task ➕'}</Title>
      </div>
      <div className="add-task-card">
        <TaskForm onSubmit={handleTaskSubmit}
        initialValues={initialValues}
        isSubmitting={isSubmitting}
        submitButtonText={isEditing ? 'Update Task' : 'Add Task'}
      />
        <div style={{ marginTop: 16 }} className="form-footer">
          <Link to="/">Go Back</Link>
        </div>
        </div>
    
    </div>
  );
};

export default AddTask;