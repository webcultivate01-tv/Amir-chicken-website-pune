export const INQUIRY_TYPES = [
  "General Enquiry",
  "Product Enquiry",
  "Bulk / Wholesale Enquiry",
  "Franchise Enquiry",
  "Store Enquiry",
  "Business Enquiry",
  "Feedback",
  "Other",
];

export const INQUIRY_STATUSES = [
  "New",
  "Contacted",
  "In Progress",
  "Follow-up Required",
  "Converted",
  "Closed",
  "Not Interested",
];

export const STATUS_STYLES = {
  New: "bg-blue-50 text-blue-700 ring-blue-200",
  Contacted: "bg-cyan-50 text-cyan-700 ring-cyan-200",
  "In Progress": "bg-amber-50 text-amber-700 ring-amber-200",
  "Follow-up Required": "bg-orange-50 text-orange-700 ring-orange-200",
  Converted: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Closed: "bg-slate-100 text-slate-600 ring-slate-200",
  "Not Interested": "bg-red-50 text-red-700 ring-red-200",
};

// "AC-0012"
export const formatInquiryId = (id) => `AC-${String(id).padStart(4, "0")}`;

export const inputClass =
  "w-full rounded-lg border border-mist-line bg-white px-3 py-2 text-sm text-ink outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-brand/60 focus:ring-4 focus:ring-brand/10";
