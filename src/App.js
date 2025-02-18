import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Layout from "./components/Layout";
import CreateAccount from "./components/CreateAccount";
import AdminPage from "./components/admin/AdminPage";
import AddUser from "./components/admin/AddUser";
import EditUser from "./components/admin/EditUser";
import Accueil from "./components/nav/Accueil";
import EditColorPage from './components/nav/changeColor';
import Style   from "./App.css"
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        
        {/* Protected routes */}
        <Route element={<Layout />}>
          {/* Admin-only routes */}
          <Route element={<ProtectedRoute adminOnly />}>
          <Route path="/accueil" element={<Accueil />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
          </Route>
          
          {/* Regular authenticated routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/changeColor" element={<div>Change Color Page</div>} />
          </Route>
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;