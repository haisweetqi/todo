import React from "react";
import { Button, Form, Input, DatePicker, Select } from "antd";
import { TodoService } from "../services";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const { TextArea } = Input;

const AddTodo = () => {
  const navigate = useNavigate();
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY"];
  const onFinish = async (values: any) => {
    console.log("Success:", values);
    try {
      const response = await TodoService.addTodo(values);
      const { status } = response;
      if (status === 201) {
        navigate("/listTodo");
        toast.success("Add Successfully");
      }
    } catch (error) {
      toast.success("Add Failed");
    }
  };

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Add Todo</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 8 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input your title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="desc"
          rules={[{ required: true, message: "Please input your desc!" }]}
        >
          <TextArea rows={4} />
        </Form.Item>

        <Form.Item label="End Date  " name="endDate">
          <DatePicker format={dateFormatList} />
        </Form.Item>

        <Form.Item label="Select" name="status">
          <Select placeholder="I'm Select" allowClear>
            <Select.Option value="Todo">Todo</Select.Option>
            <Select.Option value="In-progress">In-progress</Select.Option>
            <Select.Option value="Completed">Completed</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Progress"
          name="progress"
          rules={[{ required: true, message: "Please input your progress!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: "#1677ff" }}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddTodo;
