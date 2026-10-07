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
import InquiriesPage from "./pages/admin/InquiriesPage";
import InquiryDetailPage from "./pages/admin/InquiryDetailPage";
import FollowupsPage from "./pages/admin/FollowupsPage";
import SiteLayout from "./components/site/SiteLayout";
import HomePage from "./pages/site/HomePage";
import AboutPage from "./pages/site/AboutPage";
import CatalogPage from "./pages/site/CatalogPage";
import ContactPage from "./pages/site/ContactPage";
import useGetCurrentUser from "./CustomHooks/getCurrentUser";
import GetQuotePage from "./pages/site/GetQuotePage";
import PrivacyPolicyPage from "./pages/site/PrivacyPolicyPage";
import TermsPage from "./pages/site/TermsPage";

export const serverUrl = "http://localhost:8000";

const pages = [
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
      <ToastContainer limit={1} position="top-center" newestOnTop hideProgressBar={false} />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/get-a-quote" element={<GetQuotePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Route>
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
          <Route path="inquiries" element={<InquiriesPage />} />
          <Route path="inquiries/followups" element={<FollowupsPage />} />
          <Route path="inquiries/:id" element={<InquiryDetailPage />} />
          {pages.map((p) => (
            <Route
              key={p.path}
              path={p.path}
              element={<PlaceholderPage title={p.title} subtitle={p.subtitle} />}
            />
          ))}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
