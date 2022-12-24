import React, { useEffect, useState } from "react";
import { Button, Modal, Pagination, Progress, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataType } from "../../../shared/interface";
import { TodoService } from "../services";
import { toast } from "react-toastify";

const ListTodo = () => {
  const [todo, setTodo] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 1,
    status: undefined,
  });
  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "desc",
      key: "desc",
    },
    {
      title: "EndDate",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "Progress",
      dataIndex: "progress",
      key: "progress",
      render: (_, { progress }): any => {
        return (
          <>
            <Progress width={50} type="circle" percent={progress} />
          </>
        );
      },
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }): any => {
        let color = status === "completed" ? "green" : "yellow";
        if (status === "todo") {
          color = "red";
        }
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => console.log(record)}>
            Add
          </Button>
          <Button danger>Update</Button>
          <Button
            type="primary"
            danger
            onClick={() => confirmDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  // get data
  const getTodo = async () => {
    try {
      const response = await TodoService.getTodo(pagination);
      const { status, data } = response;
      console.log(response);

      if (status === 200) {
        setTodo(data);
        // toast.success("Successfully");
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };
  // change page
  const handleChange = (page: any) => {
    setPagination({ ...pagination, _page: page });
  };
  // show modal delete
  const confirmDelete = (id: any) => {
    Modal.confirm({
      title: "Are you sure you want to delete this record?",
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        // delete the record here
        try {
          const response = await TodoService.deleteTodo(id);
          const { status } = response;
          if (status === 200) {
            toast.error("Delete Success");
          }
        } catch (error) {
          toast.error(`${error}`);
        }
      },
      onCancel() {
        // do nothing
      },
    });
  };

  useEffect(() => {
    getTodo();
  }, [pagination]);
  return (
    <>
      <Table
        columns={columns}
        rowKey="id"
        dataSource={todo}
        pagination={false}
      />
      <Pagination
        defaultCurrent={1}
        total={3}
        pageSize={pagination._limit}
        onChange={handleChange}
      />
    </>
  );
};

export default ListTodo;
