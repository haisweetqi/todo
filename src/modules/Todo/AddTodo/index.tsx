import React from "react";
import { Button, Form, Input, DatePicker, Select } from "antd";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const AddTodo = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };
  const handleChange = (value: string) => {
    console.log({ value });
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

        <Form.Item label="RangePicker" name="range-picker">
          <RangePicker />
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
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddTodo;
