import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Input,
  Modal,
  Pagination,
  Progress,
  Space,
  Table,
  Tag,
  Form,
  DatePicker,
  Select,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { DataType } from "../../../shared/interface";
import { TodoService } from "../services";
import { toast } from "react-toastify";
import TextArea from "antd/es/input/TextArea";

const ListTodo = () => {
  const [todo, setTodo] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData]: any = useState({
    title: "",
    desc: "",
    endDate: "",
    status: "",
    progress: "",
  });
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 2,
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
        let color = status === "COMPLETED" ? "green" : "yellow";
        if (status === "TODO  ") {
          color = "red";
        }
        return (
          <Tag color={color} key={status}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: any) => (
        <Space size="middle">
          <Button type="primary" style={{ backgroundColor: "#1677ff" }}>
            <Link to="/addTodo" type="primary">
              Add
            </Link>
          </Button>
          <Button type="dashed" danger onClick={() => showModal(record)}>
            Update
          </Button>
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

  // show modal
  const showModal = (record: any) => {
    console.log(record);

    setEditData(record);

    setIsModalOpen(true);
  };

  // handle Ok Edit
  const handleOk = async () => {
    try {
      const response = await TodoService.updateTodo(editData.id, editData);
      console.log(response);

      const { status } = response;
      if (status === 200) {
        toast.success("Update Successfully");
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // get data
  const getTodo = async () => {
    try {
      const response = await TodoService.getTodo(pagination);
      const { status, data } = response;

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
            toast.success("Delete Successfully");
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

  const handleChang = (value: string) => {
    setEditData(...editData, { status: value });
  };

  useEffect(() => {
    getTodo();
  }, [pagination]);
  return (
    <>
      {/* table */}
      <Table
        columns={columns}
        rowKey="id"
        dataSource={todo}
        pagination={false}
      />
      {/* pagination */}
      <Pagination
        defaultCurrent={1}
        total={4}
        pageSize={pagination._limit}
        onChange={handleChange}
      />
      {/* Modal */}
      <Modal
        title="Edit"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div
          className="modal"
          style={{ display: "flex", flexDirection: "column", margin: "1rem" }}
        >
          <Input
            value={editData?.title}
            placeholder="Title"
            onChange={(e) =>
              setEditData((pre: any) => {
                return { ...pre, title: e.target.value };
              })
            }
          />

          <TextArea
            rows={4}
            placeholder="Description"
            value={editData?.desc}
            style={{ margin: "1rem 0" }}
            onChange={(e) =>
              setEditData((pre: any) => {
                return { ...pre, desc: e.target.value };
              })
            }
          />

          <Input
            placeholder="Date"
            value={editData?.endDate}
            onChange={(e: any) =>
              setEditData((pre: any) => {
                return { ...pre, endDate: e.target.value };
              })
            }
          />

          <Select
            defaultValue={editData?.status}
            style={{ width: 120 }}
            onChange={handleChang}
            options={[
              {
                value: "TODO",
                label: "Todo",
              },
              {
                value: "PENDING",
                label: "Pending",
              },
              {
                value: "COMPLETED",
                label: "Completed",
              },
            ]}
          />

          <Input
            placeholder="Progress"
            value={editData?.progress}
            onChange={(e: any) =>
              setEditData((pre: any) => {
                return { ...pre, progress: e.target.value };
              })
            }
          />
        </div>
      </Modal>
    </>
  );
};

export default ListTodo;
