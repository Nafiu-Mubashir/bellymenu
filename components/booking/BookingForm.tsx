"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Users, MapPin, MessageSquare,
  ChevronRight, CheckCircle2, Loader2, AlertCircle,
  User, Mail, Phone, ArrowLeft,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
export interface BookingFormData {
  fullName: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  location: string;
  budget: string;
  services: string[];
  hearAboutUs: string;
  message: string;
}

type FieldError = Partial<Record<keyof BookingFormData, string>>;
type Status = "idle" | "loading" | "success" | "error";
type Step = 1 | 2 | 3;

// ─── Options ──────────────────────────────────────────────────────────────────
const EVENT_TYPES = [
  { value: "wedding",    label: "💍 Wedding Reception" },
  { value: "corporate",  label: "🏢 Corporate Event" },
  { value: "birthday",   label: "🎂 Birthday Party" },
  { value: "private",    label: "🍽️ Private Dining" },
  { value: "outdoor",    label: "🌿 Outdoor Event" },
  { value: "cocktail",   label: "🥂 Cocktail Reception" },
  { value: "graduation", label: "🎓 Graduation" },
  { value: "other",      label: "✨ Other" },
];

const GUEST_OPTIONS = [
  "Under 20", "20 – 50", "51 – 100",
  "101 – 200", "201 – 500", "500+",
];

const BUDGET_OPTIONS = [
  "Under ₦200,000",
  "₦200,000 – ₦500,000",
  "₦500,000 – ₦1,000,000",
  "₦1,000,000 – ₦3,000,000",
  "Above ₦3,000,000",
  "Not sure yet",
];

const HEAR_ABOUT_OPTIONS = [
  "Instagram", "Facebook", "Google Search",
  "TikTok", "Referral from friend", "Attended an event",
  "Other",
];

const SERVICES = [
  "Full Catering",  "Small Chops / Canapés",
  "Live Stations",  "Dessert Table",
  "Drinks Bar",     "Service Staff Only",
];

// ─── Validation ───────────────────────────────────────────────────────────────
function validateStep(step: Step, data: BookingFormData): FieldError {
  const errors: FieldError = {};
  if (step >= 1) {
    if (!data.fullName.trim())
      errors.fullName = "Please enter your name";
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
      errors.email = "Please enter a valid email address";
    if (!data.phone.trim() || data.phone.replace(/\D/g, "").length < 10)
      errors.phone = "Please enter a valid phone number";
  }
  if (step >= 2) {
    if (!data.eventType)
      errors.eventType = "Please select an event type";
    if (!data.guestCount)
      errors.guestCount = "Please select a guest count";
  }
  return errors;
}

// ─── Reusable field wrapper ───────────────────────────────────────────────────
function Field({
  label, error, required = false, children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-neutral-700 tracking-wide mb-1.5 uppercase">
        {label}
        {required && <span className="text-green-600 ml-0.5">*</span>}
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

// ─── Input class helper ───────────────────────────────────────────────────────
const inputCls = (err?: string) =>
  `w-full px-4 py-3 rounded-xl border text-sm text-neutral-800 font-light outline-none transition-all duration-200 bg-white ${
    err
      ? "border-red-300 focus:border-red-400 focus:ring-2 focus:ring-red-100"
      : "border-neutral-200 focus:border-green-500 focus:ring-2 focus:ring-green-100 hover:border-neutral-300"
  } placeholder:text-neutral-400`;

// ─── Step indicator ───────────────────────────────────────────────────────────
const STEP_LABELS = ["Your Details", "Event Info", "Final Touches"];

function StepIndicator({ current }: { current: Step }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {STEP_LABELS.map((label, i) => {
        const stepNum = (i + 1) as Step;
        const isDone = stepNum < current;
        const isActive = stepNum === current;

        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                  isDone
                    ? "bg-green-600 text-white"
                    : isActive
                    ? "bg-green-600 text-white ring-4 ring-green-100"
                    : "bg-neutral-100 text-neutral-400"
                }`}
              >
                {isDone ? <CheckCircle2 size={15} /> : stepNum}
              </div>
              <span
                className={`text-[10px] font-medium tracking-wide whitespace-nowrap ${
                  isActive ? "text-green-700" : isDone ? "text-neutral-600" : "text-neutral-400"
                }`}
              >
                {label}
              </span>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div
                className={`flex-1 h-px mx-2 mb-5 transition-colors duration-300 ${
                  isDone ? "bg-green-500" : "bg-neutral-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Pill toggle button ───────────────────────────────────────────────────────
function PillToggle({
  label, active, onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-200 ${
        active
          ? "bg-green-600 border-green-600 text-white shadow-sm"
          : "border-neutral-200 text-neutral-600 hover:border-green-400 hover:text-green-700 bg-white"
      }`}
    >
      {label}
    </button>
  );
}

const INITIAL: BookingFormData = {
  fullName: "", email: "", phone: "", eventType: "",
  eventDate: "", guestCount: "", location: "", budget: "",
  services: [], hearAboutUs: "", message: "",
};

// ─── Main component ───────────────────────────────────────────────────────────
export default function BookingForm() {
  const [form, setForm] = useState<BookingFormData>(INITIAL);
  const [errors, setErrors] = useState<FieldError>({});
  const [status, setStatus] = useState<Status>("idle");
  const [step, setStep] = useState<Step>(1);

  const set =
    (field: keyof BookingFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const toggle = (field: "services", value: string) =>
    setForm((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? (prev[field] as string[]).filter((v) => v !== value)
        : [...(prev[field] as string[]), value],
    }));

  const goNext = () => {
    const errs = validateStep(step, form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) {
      setStep((s) => Math.min(s + 1, 3) as Step);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    setStep((s) => Math.max(s - 1, 1) as Step);
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateStep(3, form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Submission failed");
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
        className="bg-white border border-green-100 rounded-2xl p-10 md:p-14 text-center shadow-sm"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle2 size={38} className="text-green-600" />
        </motion.div>

        <h3 className="font-playfair text-3xl font-semibold text-neutral-900 mb-3">
          Request Sent!
        </h3>
        <p className="text-sm text-neutral-500 font-light leading-relaxed max-w-sm mx-auto mb-2">
          Thank you, <span className="font-medium text-neutral-700">{form.fullName.split(" ")[0]}</span>! We've received your request and will be in touch within 24 hours.
        </p>
        <p className="text-xs text-neutral-400 font-light mb-8">
          A confirmation has been sent to <span className="text-neutral-600">{form.email}</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348012345678"}?text=${encodeURIComponent(`Hi! I just submitted a quote request for a ${form.eventType} event. Just confirming you received it!`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.832L.057 23.786a.5.5 0 00.657.657l5.954-1.466A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.693-.503-5.233-1.381l-.376-.22-3.532.869.888-3.532-.22-.376A9.955 9.955 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
            </svg>
            Confirm on WhatsApp
          </a>
          <button
            onClick={() => { setForm(INITIAL); setStep(1); setStatus("idle"); }}
            className="inline-flex items-center justify-center gap-2 border border-neutral-200 text-neutral-600 hover:border-green-500 hover:text-green-700 px-6 py-3 rounded-full text-sm font-semibold transition-all"
          >
            Submit another request
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Step indicator */}
      <StepIndicator current={step} />

      <AnimatePresence mode="wait">
        {/* ── Step 1: Personal details ── */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <div className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-5">
              <div className="flex items-center gap-3 pb-1 border-b border-neutral-100">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                  <User size={15} className="text-green-600" />
                </div>
                <h3 className="font-semibold text-neutral-900 text-sm tracking-wide">
                  Your Contact Details
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Full Name" error={errors.fullName} required>
                  <input
                    type="text" value={form.fullName} onChange={set("fullName")}
                    placeholder="Amara Johnson"
                    className={inputCls(errors.fullName)}
                    autoComplete="name"
                  />
                </Field>

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

                <Field label="Phone Number" error={errors.phone} required>
                  <div className="relative sm:col-span-2">
                    <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                    <input
                      type="tel" value={form.phone} onChange={set("phone")}
                      placeholder="+234 801 234 5678"
                      className={`${inputCls(errors.phone)} pl-9`}
                      autoComplete="tel"
                    />
                  </div>
                </Field>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={goNext}
                className="group inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/30"
              >
                Continue to Event Details
                <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Step 2: Event details ── */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <div className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-1 border-b border-neutral-100">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                  <Calendar size={15} className="text-green-600" />
                </div>
                <h3 className="font-semibold text-neutral-900 text-sm tracking-wide">
                  Event Details
                </h3>
              </div>

              {/* Event type — card grid */}
              <Field label="Event Type" error={errors.eventType} required>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-1">
                  {EVENT_TYPES.map(({ value, label }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm((p) => ({ ...p, eventType: value }))}
                      className={`p-3 rounded-xl text-xs font-semibold border transition-all duration-200 text-left leading-tight ${
                        form.eventType === value
                          ? "bg-green-600 border-green-600 text-white shadow-md"
                          : "border-neutral-200 text-neutral-600 hover:border-green-300 hover:bg-green-50/50 bg-white"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </Field>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Event Date">
                  <div className="relative">
                    <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                    <input
                      type="date" value={form.eventDate} onChange={set("eventDate")}
                      min={new Date().toISOString().split("T")[0]}
                      className={`${inputCls()} pl-9`}
                    />
                  </div>
                </Field>

                <Field label="Event Location / City">
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
                    <input
                      type="text" value={form.location} onChange={set("location")}
                      placeholder="e.g. Abuja, Lagos…"
                      className={`${inputCls()} pl-9`}
                    />
                  </div>
                </Field>
              </div>

              {/* Guest count — pill toggles */}
              <Field label="Estimated Guest Count" error={errors.guestCount} required>
                <div className="flex flex-wrap gap-2 mt-1">
                  {GUEST_OPTIONS.map((g) => (
                    <PillToggle
                      key={g}
                      label={g}
                      active={form.guestCount === g}
                      onClick={() => setForm((p) => ({ ...p, guestCount: g }))}
                    />
                  ))}
                </div>
              </Field>

              {/* Budget */}
              <Field label="Approximate Budget">
                <div className="flex flex-wrap gap-2 mt-1">
                  {BUDGET_OPTIONS.map((b) => (
                    <PillToggle
                      key={b}
                      label={b}
                      active={form.budget === b}
                      onClick={() => setForm((p) => ({ ...p, budget: b }))}
                    />
                  ))}
                </div>
              </Field>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-800 transition-colors"
              >
                <ArrowLeft size={14} />
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                className="group inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/30"
              >
                Continue
                <ChevronRight size={15} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Step 3: Final touches ── */}
        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            <div className="bg-white border border-neutral-100 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-1 border-b border-neutral-100">
                <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center">
                  <MessageSquare size={15} className="text-green-600" />
                </div>
                <h3 className="font-semibold text-neutral-900 text-sm tracking-wide">
                  Final Touches
                </h3>
              </div>

              {/* Services */}
              <Field label="Services Interested In">
                <div className="flex flex-wrap gap-2 mt-1">
                  {SERVICES.map((svc) => (
                    <PillToggle
                      key={svc}
                      label={svc}
                      active={form.services.includes(svc)}
                      onClick={() => toggle("services", svc)}
                    />
                  ))}
                </div>
              </Field>

              {/* How did you hear */}
              <Field label="How Did You Hear About Us?">
                <div className="flex flex-wrap gap-2 mt-1">
                  {HEAR_ABOUT_OPTIONS.map((h) => (
                    <PillToggle
                      key={h}
                      label={h}
                      active={form.hearAboutUs === h}
                      onClick={() => setForm((p) => ({ ...p, hearAboutUs: h }))}
                    />
                  ))}
                </div>
              </Field>

              {/* Message */}
              <Field label="Additional Notes / Vision">
                <div className="relative">
                  <MessageSquare size={14} className="absolute left-3.5 top-3.5 text-neutral-400 pointer-events-none" />
                  <textarea
                    value={form.message}
                    onChange={set("message")}
                    rows={5}
                    placeholder="Tell us about your vision, theme, special dietary requirements, menu preferences, or anything else we should know to make your event perfect…"
                    className={`${inputCls()} pl-9 resize-none`}
                  />
                </div>
              </Field>
            </div>

            {/* Review summary */}
            <div className="bg-neutral-50 border border-neutral-100 rounded-2xl p-5">
              <p className="text-xs font-semibold text-neutral-700 tracking-wider uppercase mb-3">
                Your Request Summary
              </p>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {[
                  { label: "Name",     value: form.fullName },
                  { label: "Email",    value: form.email },
                  { label: "Event",    value: EVENT_TYPES.find(e => e.value === form.eventType)?.label.replace(/^\S+\s/, "") ?? form.eventType },
                  { label: "Date",     value: form.eventDate || "Not specified" },
                  { label: "Guests",   value: form.guestCount || "Not specified" },
                  { label: "Location", value: form.location || "Not specified" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-[10px] text-neutral-400 uppercase tracking-wide">{label}</p>
                    <p className="text-sm font-medium text-neutral-700 truncate">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Error */}
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

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={goBack}
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-800 transition-colors"
              >
                <ArrowLeft size={14} />
                Back
              </button>
              <button
                type="submit"
                disabled={status === "loading"}
                className="group inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-neutral-300 text-white px-8 py-3.5 rounded-full text-sm font-bold tracking-wide transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/30 disabled:cursor-not-allowed disabled:transform-none"
              >
                {status === "loading" ? (
                  <><Loader2 size={15} className="animate-spin" />Sending…</>
                ) : (
                  <><ChevronRight size={15} />Submit Quote Request</>
                )}
              </button>
            </div>

            <p className="text-center text-xs text-neutral-400 font-light">
              We'll respond within 24 hours · No commitment required · Your details are private
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
