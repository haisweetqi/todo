import React, { useState } from "react";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";
import Routes from "./routes";
import Sidebar from "./components/Sidebar";

import { toast, ToastContainer } from "react-toastify";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const handleClick = ({ key }: any) => {
    console.log(key);
    if (key === "signout") {
      console.log(1);
    } else {
      navigate(key);
    }
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar handleClick={handleClick} />
      <Routes />
      <ToastContainer
        position={toast.POSITION.TOP_RIGHT}
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        theme="light"
      />
    </Layout>
  );
}

export default App;
