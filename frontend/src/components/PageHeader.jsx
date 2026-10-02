import React from "react";

function PageHeader({ title, subtitle }) {
  return (
    <div className="mb-8 border-b border-slate-200 pb-6">
      <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-[28px]">{title}</h1>
      {subtitle && <p className="mt-1.5 max-w-2xl text-sm text-slate-500">{subtitle}</p>}
    </div>
  );
}

export default PageHeader;
