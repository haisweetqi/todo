import React from "react";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";
import FooterApp from "../Footer";
import { Layout } from "antd";
const Content = () => {
  return (
    <Layout className="site-layout">
      <Navbar />
      <div
        style={{
          padding: 24,
          minHeight: 360,
          background: "#fff",
          margin: "2rem 1rem",
        }}
      >
        <Outlet />
      </div>
      <FooterApp />
    </Layout>
  );
};

export default Content;
