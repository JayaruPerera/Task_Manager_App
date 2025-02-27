import { Form, Input, Button } from "antd";

const TaskForm = () => {
  return (
    <Form>
      <Form.Item label="Title">
        <Input />
      </Form.Item>
      <Form.Item label="Description">
        <Input.TextArea />
      </Form.Item>
      <Button type="primary">Add Task</Button>
    </Form>
  );
};

export default TaskForm;
