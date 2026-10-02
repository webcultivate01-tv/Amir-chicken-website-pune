import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./components/AdminLayout";
import PlaceholderPage from "./pages/admin/PlaceholderPage";
import ProfilePage from "./pages/admin/ProfilePage";
import useGetCurrentUser from "./CustomHooks/getCurrentUser";

export const serverUrl = "http://localhost:8000";

const pages = [
  { path: "inquiries", title: "Inquiry Management", subtitle: "Every inquiry that has come in through the website." },
  { path: "products", title: "Product Management", subtitle: "Add, edit and organise your products." },
];

function App() {
  useGetCurrentUser();
  const { userData, authChecked } = useSelector((state) => state.user);
  const isAdmin = userData?.role === "admin";

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ClipLoader size={50} color="#000" />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route
          path="/admin"
          element={isAdmin ? <Navigate to={"/admin/dashboard"} /> : <AdminLogin />}
        />
        <Route
          path="/admin"
          element={isAdmin ? <AdminLayout /> : <Navigate to={"/admin"} />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<ProfilePage />} />
          {pages.map((p) => (
            <Route
              key={p.path}
              path={p.path}
              element={<PlaceholderPage title={p.title} subtitle={p.subtitle} />}
            />
          ))}
        </Route>
        <Route path="*" element={<Navigate to={"/admin"} />} />
      </Routes>
    </>
  );
}

export default App;
