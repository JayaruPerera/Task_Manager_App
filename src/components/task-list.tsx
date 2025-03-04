import { Card, List, Tag, Button, Space, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined, FlagOutlined } from "@ant-design/icons";
import "../styles/task-list-component.css";
import { Link } from "react-router-dom";
import { Task } from "../types/task";
import { useDispatch } from "react-redux";
import { updateTaskStatus } from "../store/taskSlice";

interface TaskListProps {
  tasks: Task[];                                                                  //// An array of Task objects (each task has properties like id, title, priority, etc.).
  onDeleteTask: (id: number) => void;                                               //A function that takes a task ID as an argument and returns void. This function is called when a task is deleted.
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask }) => {
  const dispatch = useDispatch();                                                  //The useDispatch hook is used to dispatch actions to the Redux store.
  // Function to determine priority tag color
  const getPriorityColor = (priority: "low" | "medium" | "high") => {           //This function takes a priority value as an argument and returns a color based on the priority level.
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      default:
        return "blue";
    }
  };

  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks yet. Add your first task!</p>
      ) : (
        <List
          className="task-items-list"
          itemLayout="vertical"
          dataSource={tasks} //The data source for the list is the tasks array passed as a prop.
          renderItem={(
            task //The renderItem function is called for each task in the tasks array. It returns a List.Item component for each task.
          ) => (
            <List.Item
              key={task.id} //Renders each task as a List.Item. Assigns a unique key to each task using task.id
              className="task-item"
            >
              <Card                                                         //The Card component from Ant Design is used to display each task as a card.
                className="task-item-card"
                title={
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>{task.title}</span>
                    <Tag color={getPriorityColor(task.priority)} icon={<FlagOutlined />}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                    </Tag>
                  </div>
                  }
                extra={
                  <Space>
                    <Tag color="blue">Due: {task.dueDate}</Tag>

                   {/* Toggle button for task completion */}
                    <Button 
                    type="default"
                    onClick={() => dispatch(updateTaskStatus(task.id)) }
                    icon={<EditOutlined />}
                    size="small"
                    >
                      {task.completed ? "Pending":"Completed"}
                      </Button>

                    {/* Edit and Delete buttons */}
                    <Link to={`/edit-task/${task.id}`}>
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                      >
                        Edit
                      </Button>
                    </Link>
                    <Popconfirm
                      title="Delete Task"
                      description="Are you sure you want to delete this task?"
                      onConfirm={() => onDeleteTask(task.id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button
                        type="primary"
                        danger
                        icon={<DeleteOutlined />}
                        size="small"
                      >
                        Delete
                      </Button>
                    </Popconfirm>
                  </Space>
                }
              >
                <p className="task-description">{task.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}></div>
                <p className="task-status">
                  Status:
                  {task.completed ? (
                    <Tag color="green">Completed</Tag>
                  ) : (
                    <Tag color="volcano">Pending</Tag>
                  )}
                  Category: <Tag color="blue">{task.category}</Tag>
                </p>
              </Card>
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default TaskList;
