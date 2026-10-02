import React from "react";
import { useSelector } from "react-redux";
import PageHeader from "../components/PageHeader";
import InquiryStatCards from "../components/InquiryStatCards";

function Dashboard() {
  const { userData } = useSelector((state) => state.user);
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle={`Welcome back, ${userData?.name || "Admin"} (${userData?.email || ""})`}
      />
      <InquiryStatCards />
    </>
  );
}

export default Dashboard;
