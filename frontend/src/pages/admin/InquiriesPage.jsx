import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../../App";
import PageHeader from "../../components/PageHeader";
import StatusBadge from "../../components/StatusBadge";
import InquiryStatCards from "../../components/InquiryStatCards";
import { INQUIRY_STATUSES, INQUIRY_TYPES, formatInquiryId, inputClass } from "../../utils/inquiry";
import { DEFAULT_TIMEZONE, formatDateTime, isPast } from "../../utils/dateTime";

const PAGE_SIZE = 10;
const OPEN_STATUSES = ["New", "Contacted", "In Progress", "Follow-up Required"];

const actionClass =
  "rounded-lg border border-mist-line px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand";

function InquiriesPage() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);
  const timeZone = userData?.timezone || DEFAULT_TIMEZONE;

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [status, setStatus] = useState("");
  const [inquiryType, setInquiryType] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ inquiries: [], total: 0, totalPages: 1 });
  const [loading, setLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    axios
      .get(serverUrl + "/api/inquiries", {
        params: { search: debouncedSearch, status, inquiryType, sort, page, limit: PAGE_SIZE },
        withCredentials: true,
      })
      .then((result) => {
        if (cancelled) return;
        setData(result.data);
        setLoadedCount((n) => n + 1);
      })
      .catch((error) => {
        console.log(error);
        if (!cancelled) {
          toast.error(error.response?.data?.message || "Could not load inquiries", {
            position: "top-center",
            autoClose: 2000,
          });
        }
      })
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, status, inquiryType, sort, page]);

  const filtered = !!(debouncedSearch || status || inquiryType);
  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setInquiryType("");
    setPage(1);
  };
  const changeFilter = (setter) => (e) => {
    setter(e.target.value);
    setPage(1);
  };

  const stop = (e) => e.stopPropagation();
  const open = (id) => navigate(`/admin/inquiries/${id}`);

  const followUp = (inquiry) =>
    inquiry.followUpAt && OPEN_STATUSES.includes(inquiry.status) ? (
      <p
        className={`mt-1 whitespace-nowrap text-xs ${
          isPast(inquiry.followUpAt) ? "font-semibold text-red-600" : "text-slate-500"
        }`}
      >
        Follow-up: {formatDateTime(inquiry.followUpAt, timeZone)}
      </p>
    ) : null;

  const contactLinks = (inquiry) => (
    <>
      <a href={`tel:${inquiry.mobile}`} onClick={stop} className={actionClass}>Call</a>
      <a href={`mailto:${inquiry.email}`} onClick={stop} className={actionClass}>Email</a>
    </>
  );

  return (
    <>
      <PageHeader title="Inquiry Management" subtitle="Every inquiry that has come in through the website." />

      <InquiryStatCards refreshKey={loadedCount} />

      {/* Filters */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_200px_220px_150px]">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, mobile, email, location or ID"
          aria-label="Search inquiries"
          className={`${inputClass} sm:col-span-2 lg:col-span-1`}
        />
        <select value={status} onChange={changeFilter(setStatus)} aria-label="Filter by status" className={inputClass}>
          <option value="">All statuses</option>
          {INQUIRY_STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>
        <select value={inquiryType} onChange={changeFilter(setInquiryType)} aria-label="Filter by inquiry type" className={inputClass}>
          <option value="">All inquiry types</option>
          {INQUIRY_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
        <select value={sort} onChange={changeFilter(setSort)} aria-label="Sort order" className={inputClass}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-mist-line bg-white">
        {loading && data.inquiries.length === 0 ? (
          <div className="flex justify-center py-16">
            <ClipLoader size={32} color="#4f46e5" />
          </div>
        ) : data.inquiries.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <p className="font-semibold text-ink">{filtered ? "No inquiries match your filters" : "No inquiries yet"}</p>
            <p className="mt-1 text-sm text-slate-500">
              {filtered ? "Try a different search or clear the filters." : "New website inquiries will show up here."}
            </p>
            {filtered && (
              <button onClick={clearFilters} className={`${actionClass} mt-4`}>
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className={loading ? "opacity-60 transition-opacity" : "transition-opacity"}>
            {/* Desktop table */}
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-mist-line bg-mist/60 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  <tr>
                    {["Name", "Mobile", "Inquiry Type", "Location", "Status", "Created At", "Last Updated", "Actions"].map((h) => (
                      <th key={h} className="whitespace-nowrap px-4 py-3">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-mist-line">
                  {data.inquiries.map((i) => (
                    <tr key={i.id} onClick={() => open(i.id)} className="cursor-pointer transition-colors hover:bg-mist/60">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-ink">{i.name}</p>
                        <p className="text-xs text-slate-400">{formatInquiryId(i.id)}</p>
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-700">{i.mobile}</td>
                      <td className="px-4 py-3 text-slate-700">{i.inquiryType}</td>
                      <td className="px-4 py-3 text-slate-700">{i.location || "—"}</td>
                      <td className="px-4 py-3">
                        <StatusBadge status={i.status} />
                        {followUp(i)}
                      </td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-600">{formatDateTime(i.createdAt, timeZone)}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-600">{formatDateTime(i.updatedAt, timeZone)}</td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1.5">
                          <button onClick={() => open(i.id)} className={actionClass}>View</button>
                          {contactLinks(i)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <ul className="divide-y divide-mist-line md:hidden">
              {data.inquiries.map((i) => (
                <li key={i.id} onClick={() => open(i.id)} className="cursor-pointer px-4 py-4 active:bg-mist/60">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-semibold text-ink">{i.name}</p>
                      <p className="text-xs text-slate-400">{formatInquiryId(i.id)} · {i.inquiryType}</p>
                    </div>
                    <StatusBadge status={i.status} />
                  </div>
                  <p className="mt-2 text-sm text-slate-700">
                    {i.mobile}
                    {i.location ? ` · ${i.location}` : ""}
                  </p>
                  {followUp(i)}
                  <p className="mt-1 text-xs text-slate-500">
                    Created {formatDateTime(i.createdAt, timeZone)} · Updated {formatDateTime(i.updatedAt, timeZone)}
                  </p>
                  <div className="mt-3 flex gap-1.5">
                    <button onClick={() => open(i.id)} className={actionClass}>View</button>
                    {contactLinks(i)}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.total > 0 && (
          <div className="flex items-center justify-between gap-3 border-t border-mist-line px-4 py-3 text-sm text-slate-600">
            <span>
              {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, data.total)} of {data.total}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1 || loading}
                onClick={() => setPage((p) => p - 1)}
                className={`${actionClass} disabled:cursor-not-allowed disabled:opacity-40`}
              >
                Previous
              </button>
              <button
                disabled={page >= data.totalPages || loading}
                onClick={() => setPage((p) => p + 1)}
                className={`${actionClass} disabled:cursor-not-allowed disabled:opacity-40`}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default InquiriesPage;
