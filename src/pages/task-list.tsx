import { Link } from "react-router-dom";

const TaskList = () => {
  return (
    <div>
      <h1>Task List</h1>
      <Link to="/add-task">Add New Task</Link>
    </div>
  );
};

export default TaskList;
