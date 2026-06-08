"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, Phone, MessageSquare,
  ChevronRight, CheckCircle2, Loader2, AlertCircle,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type FieldError = Partial<Record<keyof ContactFormData, string>>;
type Status = "idle" | "loading" | "success" | "error";

const SUBJECT_OPTIONS = [
  "General Enquiry",
  "Get a Quote",
  "Menu Discussion",
  "Partnerships",
  "Feedback",
  "Other",
];

// ─── Validation ───────────────────────────────────────────────────────────────
function validate(data: ContactFormData): FieldError {
  const errors: FieldError = {};
  if (!data.fullName.trim()) errors.fullName = "Please enter your name";
  if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Please enter a valid email";
  if (!data.message.trim() || data.message.trim().length < 10)
    errors.message = "Please write a message (at least 10 characters)";
  return errors;
}

// ─── Field wrapper ────────────────────────────────────────────────────────────
function Field({
  label, error, required = false, children,
}: {
  label: string; error?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-neutral-700 tracking-widest mb-1.5 uppercase">
        {label}{required && <span className="text-green-600 ml-0.5">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-1.5 mt-1.5 text-xs text-red-500 overflow-hidden"
          >
            <AlertCircle size={11} className="flex-shrink-0" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputCls = (err?: string) =>
  `w-full px-4 py-3 rounded-xl border text-sm text-neutral-800 font-light outline-none transition-all duration-200 bg-white ${
    err
      ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
      : "border-neutral-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 hover:border-neutral-300"
  } placeholder:text-neutral-400`;

const INITIAL: ContactFormData = {
  fullName: "", email: "", phone: "", subject: "", message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(INITIAL);
  const [errors, setErrors] = useState<FieldError>({});
  const [status, setStatus] = useState<Status>("idle");

  const set =
    (field: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  // ── Success ────────────────────────────────────────────────────────────────
  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white border border-green-100 rounded-2xl p-10 text-center shadow-sm"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5"
        >
          <CheckCircle2 size={32} className="text-green-600" />
        </motion.div>
        <h3 className="font-playfair text-2xl font-semibold text-neutral-900 mb-2">
          Message Sent!
        </h3>
        <p className="text-sm text-neutral-500 font-light leading-relaxed max-w-xs mx-auto mb-6">
          Thanks,{" "}
          <span className="font-medium text-neutral-700">
            {form.fullName.split(" ")[0]}
          </span>
          ! We'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => { setForm(INITIAL); setStatus("idle"); }}
          className="text-xs font-medium text-green-600 hover:underline"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-5">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Name */}
          <Field label="Full Name" error={errors.fullName} required>
            <div className="relative">
              <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <input
                type="text" value={form.fullName} onChange={set("fullName")}
                placeholder="Amara Johnson"
                className={`${inputCls(errors.fullName)} pl-9`}
                autoComplete="name"
              />
            </div>
          </Field>

          {/* Email */}
          <Field label="Email Address" error={errors.email} required>
            <div className="relative">
              <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <input
                type="email" value={form.email} onChange={set("email")}
                placeholder="amara@example.com"
                className={`${inputCls(errors.email)} pl-9`}
                autoComplete="email"
              />
            </div>
          </Field>

          {/* Phone */}
          <Field label="Phone Number (optional)">
            <div className="relative">
              <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <input
                type="tel" value={form.phone} onChange={set("phone")}
                placeholder="+234 801 234 5678"
                className={`${inputCls()} pl-9`}
                autoComplete="tel"
              />
            </div>
          </Field>

          {/* Subject */}
          <Field label="Subject">
            <div className="relative">
              <select
                value={form.subject} onChange={set("subject")}
                className={`${inputCls()} appearance-none pr-9`}
              >
                <option value="">Select a topic…</option>
                {SUBJECT_OPTIONS.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <ChevronRight
                size={13}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 rotate-90 text-neutral-400 pointer-events-none"
              />
            </div>
          </Field>
        </div>

        {/* Message */}
        <Field label="Your Message" error={errors.message} required>
          <div className="relative">
            <MessageSquare
              size={14}
              className="absolute left-3.5 top-3.5 text-neutral-400 pointer-events-none"
            />
            <textarea
              value={form.message} onChange={set("message")}
              rows={5}
              placeholder="Tell us what's on your mind — we love to hear from our community…"
              className={`${inputCls(errors.message)} pl-9 resize-none`}
            />
          </div>
          {/* Character count */}
          <p className="text-right text-[11px] text-neutral-400 mt-1 font-light">
            {form.message.length} characters
          </p>
        </Field>
      </div>

      {/* Error state */}
      <AnimatePresence>
        {status === "error" && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3"
          >
            <AlertCircle size={15} className="flex-shrink-0" />
            Something went wrong. Please try again or reach us on WhatsApp.
          </motion.p>
        )}
      </AnimatePresence>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-neutral-200 disabled:cursor-not-allowed text-white py-4 rounded-full text-sm font-bold tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/25"
      >
        {status === "loading" ? (
          <><Loader2 size={15} className="animate-spin" />Sending…</>
        ) : (
          <><ChevronRight size={15} />Send Message</>
        )}
      </button>

      <p className="text-center text-xs text-neutral-400 font-light">
        We'll reply within 24 hours · Your details are kept private
      </p>
    </form>
  );
}
