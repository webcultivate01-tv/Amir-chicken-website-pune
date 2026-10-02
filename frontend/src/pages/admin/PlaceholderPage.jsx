import React from "react";
import PageHeader from "../../components/PageHeader";

function PlaceholderPage({ title, subtitle }) {
  return (
    <>
      <PageHeader title={title} subtitle={subtitle} />
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-slate-500 shadow-sm">
        This section is coming soon.
      </div>
    </>
  );
}

export default PlaceholderPage;
