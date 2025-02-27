import React from "react";
import { Form, Input, Button, DatePicker } from "antd";
import type { Dayjs } from "dayjs";                                           //a date library used to handle and format dates.The DatePicker component from Ant Design returns a Dayjs object.

interface TaskFormValues {                                                    //Represents the raw form input values captured directly from the form
  title: string;
  description: string;
  dueDate: Dayjs;
}

interface TaskFormData {                                                     //Represents the processed form data with a string-formatted due date, ready to be passed to other parts of the application.               
  title: string;
  description: string;
  dueDate: string;
}

interface TaskFormProps {                                                   //Defines the props that will be passed to the TaskForm component.
  onSubmit: (values: TaskFormData) => void;                                 //A function that receives TaskFormData and is called when the form is submitted.
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();                                          //This allows us to reset the form after submission

  const handleFinish = (values: TaskFormValues) => {
    const taskData: TaskFormData = {
      title: values.title,
      description: values.description,
      dueDate: values.dueDate.format("YYYY-MM-DD"),
    };
    onSubmit(taskData);                                                  //passing taskData to add-task.tsx
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item 
        label="Title" 
        name="title"  
        rules={[{ required: true, message: 'Please enter a task title' }]}
      >
        <Input placeholder="Enter task title"/>
      </Form.Item>

      <Form.Item 
        label="Description" 
        name="description"  
        rules={[{ required: true, message: 'Please enter a description' }]}
      >
        <Input.TextArea rows={4} placeholder="Enter task description"/>
      </Form.Item>

      <Form.Item
        name="dueDate"
        label="Due Date"
        rules={[{ required: true, message: "Please select a due date" }]}
      >
        <DatePicker format="YYYY-MM-DD" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Add Task</Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;