import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Login from "../modules/Auth/Login";
import Profile from "../pages/Profile";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import AddTodo from "../modules/Todo/AddTodo";
import ListTodo from "../modules/Todo/ListTodo";
import Content from "../components/Content";

const routes = () => {
  return (
    <Routes>
      <Route element={<Content />}>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addTodo" element={<AddTodo />} />
        <Route path="/listTodo" element={<ListTodo />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default routes;
