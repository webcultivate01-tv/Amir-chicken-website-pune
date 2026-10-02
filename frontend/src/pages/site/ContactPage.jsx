import React, { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { serverUrl } from "../../App";
import { INQUIRY_TYPES } from "../../utils/inquiry";

const input = "w-full border border-mist-line rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-red-700";

const info = [
  ["📍", "Visit us", "Main Market Road, Your City"],
  ["📞", "Call us", "+91 98765 43210"],
  ["✉️", "Email", "hello@amirchicken.com"],
  ["🕖", "Hours", "Daily 7:00 AM – 10:00 PM"],
];

const ContactPage = () => {
  const [params] = useSearchParams();
  const product = params.get("product");
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    inquiryType: product ? "Product Enquiry" : "General Enquiry",
    location: "",
    message: product ? `I'd like to enquire about: ${product}` : "",
  });
  const [loading, setLoading] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(serverUrl + "/api/inquiries", form);
      toast.success(data.message);
      setForm({ ...form, name: "", email: "", mobile: "", location: "", message: "" });
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-extrabold">
        Contact <span className="text-red-700">Us</span>
      </h1>
      <p className="mt-2 text-slate-600">
        Questions, bulk orders or feedback — send us a message and we'll get back to you soon.
      </p>

      <div className="mt-10 grid md:grid-cols-5 gap-10">
        <div className="md:col-span-2 space-y-4">
          {info.map(([icon, title, text]) => (
            <div key={title} className="flex gap-4 border border-mist-line rounded-2xl p-4">
              <span className="text-2xl">{icon}</span>
              <div>
                <p className="font-bold">{title}</p>
                <p className="text-sm text-slate-600">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="md:col-span-3 border border-mist-line rounded-2xl p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <input className={input} placeholder="Your name *" required maxLength={100} value={form.name} onChange={set("name")} />
            <input className={input} type="email" placeholder="Email *" required value={form.email} onChange={set("email")} />
            <input className={input} placeholder="Mobile number *" required value={form.mobile} onChange={set("mobile")} />
            <input className={input} placeholder="Location / City" maxLength={150} value={form.location} onChange={set("location")} />
          </div>
          <select className={input} value={form.inquiryType} onChange={set("inquiryType")}>
            {INQUIRY_TYPES.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
          <textarea
            className={input}
            rows={5}
            placeholder="Your message *"
            required
            maxLength={2000}
            value={form.message}
            onChange={set("message")}
          />
          <button disabled={loading} className="bg-red-700 hover:bg-red-800 disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-lg">
            {loading ? "Sending…" : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactPage;
