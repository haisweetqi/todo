import React from "react";
import { Layout } from "antd";

const { Footer }: any = Layout;

const FooterApp = () => {
  return (
    <>
      <Footer style={{ textAlign: "center", background: "#fff" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </>
  );
};

export default FooterApp;
