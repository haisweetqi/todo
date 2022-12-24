import React, { useState } from "react";
import { Layout, Menu, Image } from "antd";
import {
  AiFillHome,
  AiFillPieChart,
  AiOutlineUser,
  AiOutlineLogout,
  AiOutlineBars,
  AiFillFileAdd,
  AiOutlineUnorderedList,
} from "react-icons/ai";
const { Sider } = Layout;
const Sidebar = ({ handleClick }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          margin: "2rem 0",
        }}
      >
        <Image
          width={50}
          height={50}
          style={{ borderRadius: "50%" }}
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <p style={{ color: "#fff", textAlign: "center" }}>John Jessica</p>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        onClick={handleClick}
        items={[
          { label: "Home", key: "/", icon: <AiFillHome /> },
          { label: "Dashboard", key: "/dashboard", icon: <AiFillPieChart /> },
          { label: "Profile", key: "/profile", icon: <AiOutlineUser /> },
          {
            label: "Todo",
            key: "/todo",
            icon: <AiOutlineBars />,
            children: [
              { label: "Add Todo", key: "/addTodo", icon: <AiFillFileAdd /> },
              {
                label: "List Todo",
                key: "/listTodo",
                icon: <AiOutlineUnorderedList />,
              },
            ],
          },
          {
            label: "Logout",
            key: "/logout",
            icon: <AiOutlineLogout />,
            danger: true,
          },
        ]}
      ></Menu>
    </Sider>
  );
};

export default Sidebar;
