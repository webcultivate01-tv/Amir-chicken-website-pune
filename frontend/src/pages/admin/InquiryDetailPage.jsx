import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../../App";
import StatusBadge from "../../components/StatusBadge";
import { INQUIRY_STATUSES, formatInquiryId, inputClass } from "../../utils/inquiry";
import { DEFAULT_TIMEZONE, formatDateTime, fromLocalInput, toLocalInput } from "../../utils/dateTime";

const cardClass = "rounded-xl border border-mist-line bg-white p-5 sm:p-6";
const primaryBtn =
  "flex items-center justify-center rounded-lg bg-[#c4161c] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#a51217] disabled:cursor-not-allowed disabled:opacity-50";
const outlineBtn =
  "rounded-lg border border-mist-line bg-white px-3.5 py-2 text-sm font-semibold text-ink transition hover:border-brand/40 hover:bg-brand-soft hover:text-brand";

function Card({ title, children }) {
  return (
    <section className={cardClass}>
      <h2 className="mb-4 text-base font-bold text-ink">{title}</h2>
      {children}
    </section>
  );
}

function Field({ label, children }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="mt-1 break-words text-sm text-ink">{children}</dd>
    </div>
  );
}

const DOT = {
  created: "bg-blue-500",
  status: "bg-brand",
  note: "bg-amber-500",
  followup: "bg-orange-500",
};

function InquiryDetailPage() {
  const { id } = useParams();
  const { userData } = useSelector((state) => state.user);
  const timeZone = userData?.timezone || DEFAULT_TIMEZONE;

  const [inquiry, setInquiry] = useState(null);
  const [activities, setActivities] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [status, setStatus] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState("");

  const sync = (data) => {
    setInquiry(data.inquiry);
    setActivities(data.activities);
    setStatus(data.inquiry.status);
    setFollowUp(toLocalInput(data.inquiry.followUpAt, timeZone));
    setNote(data.inquiry.adminNote || "");
  };

  useEffect(() => {
    let cancelled = false;
    axios
      .get(`${serverUrl}/api/inquiries/${id}`, { withCredentials: true })
      .then((result) => !cancelled && sync(result.data))
      .catch((error) => {
        console.log(error);
        if (!cancelled) setNotFound(true);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  const toastError = (message) => toast.error(message, { position: "top-center", autoClose: 2000 });

  const save = async (which, body) => {
    setSaving(which);
    try {
      const result = await axios.patch(`${serverUrl}/api/inquiries/${id}`, body, { withCredentials: true });
      sync(result.data);
      toast.success(result.data.message, { position: "top-center", autoClose: 1200 });
    } catch (error) {
      console.log(error);
      toastError(error.response?.data?.message || "Something went wrong");
    } finally {
      setSaving("");
    }
  };

  if (notFound) {
    return (
      <div className={`${cardClass} text-center`}>
        <p className="font-semibold text-ink">Inquiry not found</p>
        <Link to="/admin/inquiries" className={`${outlineBtn} mt-4 inline-block`}>Back to inquiries</Link>
      </div>
    );
  }
  if (!inquiry) {
    return (
      <div className="flex justify-center py-20">
        <ClipLoader size={32} color="#4f46e5" />
      </div>
    );
  }

  const currentFollowUp = toLocalInput(inquiry.followUpAt, timeZone);
  const scheduleDirty = status !== inquiry.status || followUp !== currentFollowUp;
  const noteDirty = note.trim() !== (inquiry.adminNote || "");

  const saveSchedule = () => {
    const body = {};
    if (status !== inquiry.status) body.status = status;
    if (followUp !== currentFollowUp) body.followUpAt = fromLocalInput(followUp, timeZone);
    save("schedule", body);
  };

  const renderActivity = (a) => {
    if (a.type === "status") {
      const [from, to] = a.detail.split("|");
      return (
        <p className="text-sm text-ink">
          Status changed from <b>{from}</b> to <b>{to}</b>
        </p>
      );
    }
    if (a.type === "followup") {
      return (
        <p className="text-sm text-ink">
          {a.detail ? (
            <>Follow-up set for <b>{formatDateTime(a.detail, timeZone)}</b></>
          ) : (
            "Follow-up cleared"
          )}
        </p>
      );
    }
    if (a.type === "note") {
      return a.detail ? (
        <div className="text-sm text-ink">
          Note updated
          <p className="mt-1 whitespace-pre-wrap rounded-lg bg-mist/70 px-3 py-2 text-slate-700">{a.detail}</p>
        </div>
      ) : (
        <p className="text-sm text-ink">Note cleared</p>
      );
    }
    return <p className="text-sm text-ink">{a.detail}</p>;
  };

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <Link to="/admin/inquiries" className="text-sm font-semibold text-slate-500 hover:text-brand">
            ← All inquiries
          </Link>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-ink">{inquiry.name}</h1>
            <StatusBadge status={inquiry.status} />
          </div>
          <p className="mt-1 text-sm text-slate-500">{formatInquiryId(inquiry.id)} · {inquiry.inquiryType}</p>
        </div>
        <div className="flex gap-2">
          <a href={`tel:${inquiry.mobile}`} className={outlineBtn}>Call customer</a>
          <a href={`mailto:${inquiry.email}`} className={outlineBtn}>Email customer</a>
        </div>
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div className="flex flex-col gap-6">
          <Card title="Customer Information">
            <dl className="grid gap-5 sm:grid-cols-2">
              <Field label="Full name">{inquiry.name}</Field>
              <Field label="Mobile number">
                <a href={`tel:${inquiry.mobile}`} className="text-brand hover:underline">{inquiry.mobile}</a>
              </Field>
              <Field label="Email">
                <a href={`mailto:${inquiry.email}`} className="text-brand hover:underline">{inquiry.email}</a>
              </Field>
              <Field label="Location">{inquiry.location || "—"}</Field>
            </dl>
          </Card>

          <Card title="Inquiry Details">
            <dl className="grid gap-5 sm:grid-cols-2">
              <Field label="Inquiry ID">{formatInquiryId(inquiry.id)}</Field>
              <Field label="Inquiry type">{inquiry.inquiryType}</Field>
              <Field label="Received">{formatDateTime(inquiry.createdAt, timeZone)}</Field>
              <Field label="Last updated">{formatDateTime(inquiry.updatedAt, timeZone)}</Field>
            </dl>
            <p className="mb-1 mt-5 text-xs font-semibold uppercase tracking-wide text-slate-400">Message</p>
            <p className="whitespace-pre-wrap break-words rounded-lg bg-mist/70 px-4 py-3 text-sm leading-relaxed text-ink">
              {inquiry.message}
            </p>
          </Card>

          <Card title="Status & Follow-up">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="status" className="text-sm font-semibold text-slate-700">Lead status</label>
                <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className={inputClass}>
                  {INQUIRY_STATUSES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="followUp" className="text-sm font-semibold text-slate-700">Follow-up date & time</label>
                <input
                  id="followUp"
                  type="datetime-local"
                  value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-500">
                Times are in your timezone ({timeZone}).
                {followUp && (
                  <button type="button" onClick={() => setFollowUp("")} className="ml-2 font-semibold text-brand hover:underline">
                    Clear follow-up
                  </button>
                )}
              </p>
              <button onClick={saveSchedule} disabled={!scheduleDirty || saving === "schedule"} className={primaryBtn}>
                {saving === "schedule" ? <ClipLoader size={18} color="white" /> : "Save changes"}
              </button>
            </div>
          </Card>

          <Card title="Admin Notes">
            <textarea
              rows={4}
              maxLength={2000}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Customer interested in bulk chicken supply for restaurant."
              aria-label="Admin note"
              className={inputClass}
            />
            <div className="mt-3 flex justify-end">
              <button onClick={() => save("note", { adminNote: note })} disabled={!noteDirty || saving === "note"} className={primaryBtn}>
                {saving === "note" ? <ClipLoader size={18} color="white" /> : "Save note"}
              </button>
            </div>
          </Card>
        </div>

        <Card title="Activity Timeline">
          <ol className="relative flex flex-col gap-5 border-l border-mist-line pl-5">
            {activities.map((a) => (
              <li key={a.id} className="relative">
                <span className={`absolute -left-[25px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-white ${DOT[a.type] || "bg-slate-400"}`} />
                {renderActivity(a)}
                <p className="mt-1 text-xs text-slate-500">
                  {a.adminName || "Website"} · {formatDateTime(a.createdAt, timeZone)}
                </p>
              </li>
            ))}
          </ol>
        </Card>
      </div>
    </>
  );
}

export default InquiryDetailPage;
