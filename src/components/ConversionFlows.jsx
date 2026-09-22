import { useEffect, useMemo, useState } from "react";
import { site } from "../data/site";
import Icon from "./Icon";
import { saveWebsiteLead } from "../lib/api";

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100";
const labelClass = "text-xs font-bold uppercase tracking-[0.08em] text-slate-500";
const LEAD_SESSION_KEY = "bispun_website_demo_lead_session";

function getLeadSessionId() {
  try {
    const existing = window.localStorage.getItem(LEAD_SESSION_KEY);
    if (existing) return existing;

    const id =
      typeof window.crypto?.randomUUID === "function"
        ? window.crypto.randomUUID()
        : `lead-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;

    window.localStorage.setItem(LEAD_SESSION_KEY, id);
    return id;
  } catch {
    return `lead-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
  }
}

function clearLeadSession() {
  try {
    window.localStorage.removeItem(LEAD_SESSION_KEY);
  } catch {
    // Ignore browsers that block localStorage.
  }
}

function isValidContact(form) {
  return (
    form.fullName.trim().length >= 2 &&
    /^\S+@\S+\.\S+$/.test(form.workEmail.trim()) &&
    form.phone.replace(/\D/g, "").length >= 7
  );
}

function ModalShell({ title, eyebrow, step, totalSteps, onClose, children }) {
  useEffect(() => {
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = oldOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-slate-950/55 p-0 backdrop-blur-sm sm:p-5">
      <div className="flex min-h-full items-center justify-center">
        <div className="relative min-h-screen w-full overflow-hidden bg-white shadow-2xl sm:min-h-0 sm:max-w-5xl sm:rounded-[28px] sm:border sm:border-white/60">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/90 text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-950"
            aria-label="Close"
          >
            <Icon name="X" size={18} />
          </button>

          <div className="grid min-h-[650px] lg:grid-cols-[0.38fr_0.62fr]">
            <aside className="relative overflow-hidden bg-slate-950 px-6 py-8 text-white sm:px-8 lg:px-9 lg:py-10">
              <div className="pointer-events-none absolute -left-24 top-0 h-56 w-56 rounded-full bg-brand-600/25 blur-3xl" />
              <div className="pointer-events-none absolute -right-20 bottom-10 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl" />
              <div className="relative">
                <a href="#top" onClick={onClose} className="inline-flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-sm font-extrabold">BI</span>
                  <span className="text-lg font-extrabold tracking-tight">{site.brand.name}</span>
                </a>

                <div className="mt-12 text-xs font-bold uppercase tracking-[0.16em] text-brand-300">{eyebrow}</div>
                <h2 className="mt-4 max-w-sm text-3xl font-extrabold leading-tight tracking-tight">{title}</h2>
                <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
                  Tell us how to reach you, choose a preferred time, then review the request before sending it.
                </p>

                <div className="mt-10 space-y-3">
                  {Array.from({ length: totalSteps }).map((_, index) => {
                    const number = index + 1;
                    const active = number === step;
                    const done = number < step;
                    return (
                      <div key={number} className="flex items-center gap-3">
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black transition ${
                            done
                              ? "bg-brand-600 text-white"
                              : active
                                ? "bg-white text-slate-950"
                                : "border border-white/15 bg-white/5 text-slate-400"
                          }`}
                        >
                          {done ? <Icon name="Check" size={15} /> : number}
                        </span>
                        <div className={`h-px flex-1 ${number <= step ? "bg-brand-500/60" : "bg-white/10"}`} />
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs leading-5 text-slate-300">
                  <span className="font-bold text-white">No lost enquiries.</span> Once your name, phone number and email are valid, your contact details are securely saved so our team can follow up even if you leave before finishing the booking.
                </div>
              </div>
            </aside>

            <div className="px-5 pb-8 pt-16 sm:px-8 lg:px-10 lg:pb-10 lg:pt-10">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className={labelClass}>{label}</span>
      {children}
    </label>
  );
}

function DemoFlow({ onClose }) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [leadId, setLeadId] = useState("");
  const [autoSaveState, setAutoSaveState] = useState("idle");
  const [leadSessionId] = useState(() => getLeadSessionId());
  const [form, setForm] = useState({
    fullName: "",
    workEmail: "",
    phone: "",
    companyName: "",
    teamSize: "",
    date: "",
    time: "",
    note: "",
  });

  const minDate = useMemo(() => {
    const now = new Date();
    const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  }, []);

  const update = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
    setSubmitError("");
  };

  // Capture the lead as soon as the three core contact fields are valid.
  // This is intentionally independent of the Continue button so abandoned
  // demo flows still appear in the CRM Super Admin -> Website Leads section.
  useEffect(() => {
    if (step !== 1 || !isValidContact(form)) return undefined;

    setAutoSaveState("saving");
    const timer = window.setTimeout(async () => {
      try {
        const result = await saveWebsiteLead(
          {
            sessionId: leadSessionId,
            fullName: form.fullName.trim(),
            email: form.workEmail.trim(),
            phone: form.phone.trim(),
            companyName: form.companyName.trim(),
            teamSize: form.teamSize,
            lastStep: 1,
            demoRequested: false,
          },
          { keepalive: true }
        );
        setLeadId(result.lead?.id || "");
        setAutoSaveState("saved");
      } catch {
        setAutoSaveState("error");
      }
    }, 650);

    return () => window.clearTimeout(timer);
  }, [
    step,
    leadSessionId,
    form.fullName,
    form.workEmail,
    form.phone,
    form.companyName,
    form.teamSize,
  ]);

  const saveProgress = async (lastStep, demoRequested = false) => {
    const result = await saveWebsiteLead({
      sessionId: leadSessionId,
      fullName: form.fullName.trim(),
      email: form.workEmail.trim(),
      phone: form.phone.trim(),
      companyName: form.companyName.trim(),
      teamSize: form.teamSize,
      preferredDate: form.date || null,
      preferredTime: form.time || null,
      note: form.note.trim(),
      lastStep,
      demoRequested,
    });
    setLeadId(result.lead?.id || leadId);
    return result;
  };

  const next = async () => {
    setSubmitError("");
    const nextErrors = {};

    if (step === 1) {
      if (!form.fullName.trim()) nextErrors.fullName = "Required";
      if (!/^\S+@\S+\.\S+$/.test(form.workEmail.trim())) nextErrors.workEmail = "Enter a valid email";
      if (form.phone.replace(/\D/g, "").length < 7) nextErrors.phone = "Enter a valid phone number";
    }

    if (step === 2) {
      if (!form.date) nextErrors.date = "Choose a date";
      if (!form.time) nextErrors.time = "Choose a time";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    if (step === 1) {
      try {
        setAutoSaveState("saving");
        await saveProgress(1, false);
        setAutoSaveState("saved");
      } catch {
        // Do not block the visitor. Final submit retries the same CRM save.
        setAutoSaveState("error");
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      try {
        await saveProgress(2, false);
      } catch {
        // The core contact lead is already captured when possible. Continue
        // to review and retry all data on the final submit.
      }
      setStep(3);
      return;
    }

    if (step === 3) {
      setSubmitting(true);
      try {
        await saveProgress(3, true);
        clearLeadSession();
        setErrors({});
        setStep(4);
      } catch (error) {
        setErrors(error.fields || {});
        setSubmitError(error.message || "We couldn't submit your demo request. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  const back = () => {
    setErrors({});
    setSubmitError("");
    setStep((current) => Math.max(1, current - 1));
  };

  return (
    <ModalShell title="See how Bispun fits your actual workflow." eyebrow="Book a demo" step={Math.min(step, 3)} totalSteps={3} onClose={onClose}>
      {step === 1 && (
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">Step 1 · Contact</div>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">How can our team reach you?</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Your contact is saved automatically once your name, phone and email are valid. You do not have to finish all three steps for us to receive the enquiry.
          </p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <Field label="Your name">
              <input className={inputClass} value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Full name" />
              {errors.fullName && <span className="mt-1 block text-xs text-rose-500">{errors.fullName}</span>}
            </Field>
            <Field label="Phone number">
              <input type="tel" className={inputClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 98765 43210" />
              {errors.phone && <span className="mt-1 block text-xs text-rose-500">{errors.phone}</span>}
            </Field>
            <Field label="Work email">
              <input type="email" className={inputClass} value={form.workEmail} onChange={(e) => update("workEmail", e.target.value)} placeholder="name@company.com" />
              {errors.workEmail && <span className="mt-1 block text-xs text-rose-500">{errors.workEmail}</span>}
            </Field>
            <Field label="Company name (optional)">
              <input className={inputClass} value={form.companyName} onChange={(e) => update("companyName", e.target.value)} placeholder="Company / consultancy" />
            </Field>
          </div>

          <div className="mt-4 min-h-5 text-xs font-semibold">
            {autoSaveState === "saving" && <span className="text-slate-400">Saving contact...</span>}
            {autoSaveState === "saved" && (
              <span className="inline-flex items-center gap-1.5 text-emerald-600"><Icon name="Check" size={13} /> Contact saved</span>
            )}
            {autoSaveState === "error" && (
              <span className="text-amber-600">We’ll retry when you continue.</span>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">Step 2 · Preferred time</div>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">Choose when you would like to speak with us.</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">This is your preferred slot. Our team will confirm the final demo time with you.</p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <Field label="Team size (optional)">
              <select className={inputClass} value={form.teamSize} onChange={(e) => update("teamSize", e.target.value)}>
                <option value="">Select team size</option>
                <option value="1-5">1-5</option>
                <option value="6-20">6-20</option>
                <option value="21-50">21-50</option>
                <option value="51+">51+</option>
              </select>
            </Field>
            <div className="hidden sm:block" />
            <Field label="Preferred date">
              <input type="date" min={minDate} className={inputClass} value={form.date} onChange={(e) => update("date", e.target.value)} />
              {errors.date && <span className="mt-1 block text-xs text-rose-500">{errors.date}</span>}
            </Field>
            <Field label="Preferred time">
              <select className={inputClass} value={form.time} onChange={(e) => update("time", e.target.value)}>
                <option value="">Select a time</option>
                <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
              </select>
              {errors.time && <span className="mt-1 block text-xs text-rose-500">{errors.time}</span>}
            </Field>
          </div>

          <div className="mt-6">
            <div className={labelClass}>What should we focus on? (optional)</div>
            <textarea
              rows={4}
              className={inputClass}
              value={form.note}
              onChange={(e) => update("note", e.target.value)}
              placeholder="Lead management, admissions, revenue, analytics, team control..."
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">Step 3 · Review & send</div>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">Review your demo request.</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">Your contact is already available to our team. Send this step to register your preferred demo slot as well.</p>

          <div className="mt-7 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2">
            <div><div className={labelClass}>Name</div><div className="mt-1 text-sm font-bold text-slate-900">{form.fullName}</div></div>
            <div><div className={labelClass}>Phone</div><div className="mt-1 text-sm font-bold text-slate-900">{form.phone}</div></div>
            <div><div className={labelClass}>Email</div><div className="mt-1 break-all text-sm font-bold text-slate-900">{form.workEmail}</div></div>
            <div><div className={labelClass}>Company</div><div className="mt-1 text-sm font-bold text-slate-900">{form.companyName || "—"}</div></div>
            <div><div className={labelClass}>Team size</div><div className="mt-1 text-sm font-bold text-slate-900">{form.teamSize || "—"}</div></div>
            <div><div className={labelClass}>Preferred slot</div><div className="mt-1 text-sm font-bold text-slate-900">{form.date} · {form.time}</div></div>
            <div className="sm:col-span-2"><div className={labelClass}>Demo focus</div><div className="mt-1 text-sm leading-6 text-slate-700">{form.note.trim() || "General product walkthrough"}</div></div>
          </div>

          <div className="mt-5 rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm leading-6 text-brand-900">
            Your preferred time is a request only. Our team will contact you to confirm the final slot.
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flex min-h-[490px] items-center">
          <div className="w-full text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/20">
              <Icon name="Check" size={26} />
            </span>
            <div className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">Demo request received</div>
            <h3 className="mx-auto mt-2 max-w-xl text-3xl font-extrabold tracking-tight text-slate-950">We received your demo request.</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
              Your details are now available to the Bispun team in Website Leads. We’ll contact you to confirm the demo slot.
            </p>
            {leadId && <div className="mt-4 text-xs font-semibold text-slate-400">Lead reference · {leadId.slice(-8).toUpperCase()}</div>}
            <button type="button" onClick={onClose} className="mt-7 inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-700">Back to website</button>
          </div>
        </div>
      )}

      {step < 4 && (
        <>
          {submitError && (
            <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{submitError}</div>
          )}
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
            <button type="button" disabled={submitting} onClick={step === 1 ? onClose : back} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50">
              {step === 1 ? "Cancel" : "Back"}
            </button>
            <button type="button" disabled={submitting} onClick={next} className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-600/20 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">
              {submitting ? "Submitting..." : step === 3 ? "Send demo request" : "Continue"}
              {!submitting && <Icon name="ArrowRight" size={15} />}
            </button>
          </div>
        </>
      )}
    </ModalShell>
  );
}

function parseFlowFromHash() {
  return window.location.hash.toLowerCase() === "#demo" ? "demo" : "";
}

export default function ConversionFlows() {
  const [flow, setFlow] = useState("");

  useEffect(() => {
    const sync = () => setFlow(parseFlowFromHash());
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const close = () => {
    setFlow("");
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  };

  if (flow === "demo") return <DemoFlow onClose={close} />;
  return null;
}
