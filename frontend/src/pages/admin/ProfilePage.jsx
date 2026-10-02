import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../../App";
import { setUserData } from "../../redux/userSlice";
import { DEFAULT_TIMEZONE, getTimezones } from "../../utils/dateTime";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300 focus:border-black focus:bg-white focus:ring-4 focus:ring-black/10";
const labelClass = "text-sm font-semibold text-gray-800";
const cardClass =
  "flex flex-col gap-6 rounded-2xl border border-mist-line bg-white p-6 sm:p-8";

const photoUrl = (raw) =>
  raw ? (/^(https?:|data:)/.test(raw) ? raw : serverUrl + "/" + raw.replace(/^\//, "")) : null;

function SaveButton({ loading, children, className = "mt-auto py-3" }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={`flex items-center justify-center rounded-xl bg-[#c4161c] font-semibold text-white shadow-lg shadow-[#c4161c]/30 transition hover:bg-[#a51217] disabled:opacity-70 ${className}`}
    >
      {loading ? <ClipLoader size={24} color="white" /> : children}
    </button>
  );
}

function ProfilePage() {
  const { userData } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [timezone, setTimezone] = useState(DEFAULT_TIMEZONE);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    setName(userData?.name || "");
    setEmail(userData?.email || "");
    setTimezone(userData?.timezone || DEFAULT_TIMEZONE);
  }, [userData]);

  useEffect(() => {
    if (!file) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const toastError = (message) =>
    toast.error(message, { position: "top-center", autoClose: 2000 });

  const handleFile = (e) => {
    const picked = e.target.files?.[0];
    if (!picked) return;
    if (!/^image\/(jpeg|png|webp)$/.test(picked.type)) {
      return toastError("Only JPG, PNG or WEBP images are allowed");
    }
    if (picked.size > 2 * 1024 * 1024) return toastError("Image must be 2MB or smaller");
    setFile(picked);
  };

  const save = async (form, setLoading, onDone) => {
    setLoading(true);
    try {
      const result = await axios.put(serverUrl + "/api/auth/profile", form, {
        withCredentials: true,
      });
      dispatch(setUserData(result.data.user));
      onDone();
      toast.success(result.data.message, { position: "top-center", autoClose: 1500 });
    } catch (error) {
      console.log(error);
      toastError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return toastError("Name is required");
    const form = new FormData();
    form.append("name", name.trim());
    form.append("email", email.trim());
    form.append("timezone", timezone);
    if (file) form.append("photo", file);
    save(form, setProfileLoading, () => {
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password.length < 8) return toastError("Password must be at least 8 characters");
    if (password !== confirmPassword) return toastError("Passwords do not match");
    const form = new FormData();
    form.append("password", password);
    save(form, setPasswordLoading, () => {
      setPassword("");
      setConfirmPassword("");
    });
  };

  const shown = preview || photoUrl(userData?.photo);

  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-2">
      {/* Left: profile details */}
      <form onSubmit={handleProfileSubmit} className={cardClass}>
        <h2 className="text-lg font-bold text-ink">Profile details</h2>

        <div className="flex items-center gap-5">
          {shown ? (
            <img src={shown} alt="Profile" className="h-24 w-24 rounded-full object-cover ring-2 ring-mist-line" />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-900 text-3xl font-extrabold uppercase text-white">
              {(name.trim()[0] || "A").toUpperCase()}
            </div>
          )}
          <div className="flex flex-col gap-1.5">
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFile}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="rounded-lg border border-mist-line px-4 py-2 text-sm font-semibold text-ink hover:bg-slate-50"
            >
              {shown ? "Change photo" : "Upload photo"}
            </button>
            <p className="text-xs text-slate-500">JPG, PNG or WEBP, up to 2MB.</p>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className={labelClass}>Name</label>
          <input id="name" className={inputClass} value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className={labelClass}>Email</label>
          <input id="email" type="email" className={inputClass} value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="timezone" className={labelClass}>Timezone</label>
          <select id="timezone" className={inputClass} value={timezone} onChange={(e) => setTimezone(e.target.value)}>
            {(getTimezones().includes(timezone) ? getTimezones() : [timezone, ...getTimezones()]).map((tz) => (
              <option key={tz}>{tz}</option>
            ))}
          </select>
          <p className="text-xs text-slate-500">All inquiry dates and times are shown in this timezone.</p>
        </div>

        <div className="mt-auto flex justify-end">
          <SaveButton loading={profileLoading} className="px-5 py-2 text-sm">Save profile</SaveButton>
        </div>
      </form>

      {/* Right: change password */}
      <form onSubmit={handlePasswordSubmit} className={cardClass}>
        <div>
          <h2 className="text-lg font-bold text-ink">Change password</h2>
          <p className="mt-1 text-sm text-slate-500">No need to enter your old password.</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className={labelClass}>New password</label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className={inputClass}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirmPassword" className={labelClass}>Confirm password</label>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Re-enter new password"
            className={inputClass}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input type="checkbox" checked={showPassword} onChange={(e) => setShowPassword(e.target.checked)} />
            Show passwords
          </label>

          <SaveButton loading={passwordLoading} className="px-5 py-2 text-sm">Update password</SaveButton>
        </div>
      </form>
    </div>
  );
}

export default ProfilePage;
