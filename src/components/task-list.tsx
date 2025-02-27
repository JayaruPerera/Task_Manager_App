import { Card, List, Tag, Button, Space, Popconfirm} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./task-list-component.css";
import { Link } from "react-router-dom";
import { Task } from "../types/task";

interface TaskListProps {
  tasks: Task[];
  onDeleteTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onDeleteTask }) => {

  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks yet. Add your first task!</p>
      ) : (
        <List
        className="task-items-list"
          itemLayout="vertical"
          dataSource={tasks}                                                                                  //The data source for the list is the tasks array passed as a prop.
          renderItem={(task) => (                                                                             //The renderItem function is called for each task in the tasks array. It returns a List.Item component for each task.
            <List.Item key={task.id}                                                                          //Renders each task as a List.Item. Assigns a unique key to each task using task.id
            className="task-item">
              <Card 
              className="task-item-card"
                title={task.title}
                extra={
                  <Space>
                    <Tag color="blue">Due: {task.dueDate}</Tag>
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
                <p className="task-status">
                  Status: {task.completed ? 
                    <Tag color="green">Completed</Tag> : 
                    <Tag color="volcano">Pending</Tag>
                  }
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