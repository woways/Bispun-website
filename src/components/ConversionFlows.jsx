import { useEffect, useMemo, useState } from "react";
import { site } from "../data/site";
import Icon from "./Icon";
import { submitDemoRequest, submitSignupRequest } from "../lib/api";

const inputClass =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100";
const labelClass = "text-xs font-bold uppercase tracking-[0.08em] text-slate-500";

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
                  A short guided flow keeps setup simple and gives your team the right next step without unnecessary forms.
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
                  <span className="font-bold text-white">Short, guided setup.</span> Only the details needed to understand your team, recommend the right plan and make onboarding more relevant.
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

function SignupFlow({ initialPlan, onClose, onBookDemo }) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    fullName: "",
    workEmail: "",
    phone: "",
    companyName: "",
    role: "",
    businessType: "",
    teamSize: "",
    monthlyLeads: "",
    needs: [],
  });
  const [selectedPlan, setSelectedPlan] = useState(initialPlan || "");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [requestId, setRequestId] = useState("");

  const recommendation = useMemo(() => {
    const advancedSignals =
      form.teamSize === "51+" ||
      form.monthlyLeads === "2000+" ||
      form.needs.includes("Customization & white-label");
    if (advancedSignals) return "Advanced";

    const proSignals =
      form.teamSize === "21-50" ||
      form.monthlyLeads === "500-1999" ||
      form.needs.includes("Walk-ins & counselling") ||
      form.needs.includes("Advanced analytics");
    if (proSignals) return "Pro";

    return "Basic";
  }, [form]);

  useEffect(() => {
    if (step === 3 && !selectedPlan) setSelectedPlan(recommendation);
  }, [step, recommendation, selectedPlan]);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const toggleNeed = (need) => {
    setForm((current) => ({
      ...current,
      needs: current.needs.includes(need)
        ? current.needs.filter((item) => item !== need)
        : [...current.needs, need],
    }));
  };

  const validateStepOne = () => {
    const nextErrors = {};
    if (!form.fullName.trim()) nextErrors.fullName = "Required";
    if (!form.companyName.trim()) nextErrors.companyName = "Required";
    if (!/^\S+@\S+\.\S+$/.test(form.workEmail)) nextErrors.workEmail = "Enter a valid email";
    if (!form.phone.trim()) nextErrors.phone = "Required";
    if (!form.role) nextErrors.role = "Required";
    if (!form.businessType) nextErrors.businessType = "Required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const validateStepTwo = () => {
    const nextErrors = {};
    if (!form.teamSize) nextErrors.teamSize = "Required";
    if (!form.monthlyLeads) nextErrors.monthlyLeads = "Required";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const next = async () => {
    setSubmitError("");
    if (step === 1 && !validateStepOne()) return;
    if (step === 2 && !validateStepTwo()) return;

    if (step === 3) {
      const planToSubmit = selectedPlan || recommendation;
      setSubmitting(true);
      try {
        const result = await submitSignupRequest({
          ...form,
          recommendedPlan: recommendation,
          selectedPlan: planToSubmit,
        });
        setRequestId(result.requestId || "");
        setErrors({});
        setStep(4);
      } catch (error) {
        setErrors(error.fields || {});
        setSubmitError(error.message || "We couldn't submit your request. Please try again.");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    setErrors({});
    setStep((current) => Math.min(4, current + 1));
  };

  const back = () => {
    setErrors({});
    setStep((current) => Math.max(1, current - 1));
  };

  const plan = site.pricing.plans.find((item) => item.name === (selectedPlan || recommendation));

  return (
    <ModalShell title="Set up the right Bispun path for your company." eyebrow="Sign up" step={step} totalSteps={4} onClose={onClose}>
      {step === 1 && (
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">Step 1 · Company</div>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">Tell us who is setting up the workspace.</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">We keep this first step short so you can move quickly into the setup recommendation.</p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <Field label="Your name">
              <input className={inputClass} value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Full name" />
              {errors.fullName && <span className="mt-1 block text-xs text-rose-500">{errors.fullName}</span>}
            </Field>
            <Field label="Company name">
              <input className={inputClass} value={form.companyName} onChange={(e) => update("companyName", e.target.value)} placeholder="Company / consultancy" />
              {errors.companyName && <span className="mt-1 block text-xs text-rose-500">{errors.companyName}</span>}
            </Field>
            <Field label="Work email">
              <input type="email" className={inputClass} value={form.workEmail} onChange={(e) => update("workEmail", e.target.value)} placeholder="name@company.com" />
              {errors.workEmail && <span className="mt-1 block text-xs text-rose-500">{errors.workEmail}</span>}
            </Field>
            <Field label="Phone">
              <input type="tel" className={inputClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Business contact number" />
              {errors.phone && <span className="mt-1 block text-xs text-rose-500">{errors.phone}</span>}
            </Field>
            <Field label="Your role">
              <select className={inputClass} value={form.role} onChange={(e) => update("role", e.target.value)}>
                <option value="">Select role</option>
                <option>Owner / Founder</option>
                <option>Admin / Operations</option>
                <option>Manager</option>
                <option>Other</option>
              </select>
              {errors.role && <span className="mt-1 block text-xs text-rose-500">{errors.role}</span>}
            </Field>
            <Field label="Business type">
              <select className={inputClass} value={form.businessType} onChange={(e) => update("businessType", e.target.value)}>
                <option value="">Select business type</option>
                <option>Education consultancy</option>
                <option>Admissions / counselling business</option>
                <option>Service business</option>
                <option>Other</option>
              </select>
              {errors.businessType && <span className="mt-1 block text-xs text-rose-500">{errors.businessType}</span>}
            </Field>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">Step 2 · Business needs</div>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">What does your team need Bispun to control?</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">These answers are only used to suggest the most suitable plan and onboarding path.</p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <Field label="Team size">
              <select className={inputClass} value={form.teamSize} onChange={(e) => update("teamSize", e.target.value)}>
                <option value="">Select team size</option>
                <option>1-5</option>
                <option>6-20</option>
                <option>21-50</option>
                <option>51+</option>
              </select>
              {errors.teamSize && <span className="mt-1 block text-xs text-rose-500">{errors.teamSize}</span>}
            </Field>
            <Field label="Monthly lead volume">
              <select className={inputClass} value={form.monthlyLeads} onChange={(e) => update("monthlyLeads", e.target.value)}>
                <option value="">Select lead volume</option>
                <option value="0-99">Under 100</option>
                <option value="100-499">100-499</option>
                <option value="500-1999">500-1,999</option>
                <option value="2000+">2,000+</option>
              </select>
              {errors.monthlyLeads && <span className="mt-1 block text-xs text-rose-500">{errors.monthlyLeads}</span>}
            </Field>
          </div>

          <div className="mt-7">
            <div className={labelClass}>Main priorities</div>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {["Lead & source tracking", "Admissions workflow", "Walk-ins & counselling", "Revenue & collections", "Advanced analytics", "Customization & white-label"].map((need) => {
                const checked = form.needs.includes(need);
                return (
                  <button
                    key={need}
                    type="button"
                    onClick={() => toggleNeed(need)}
                    className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition ${
                      checked ? "border-brand-300 bg-brand-50 text-brand-800" : "border-slate-200 bg-white text-slate-600 hover:border-brand-200"
                    }`}
                  >
                    <span className={`flex h-5 w-5 items-center justify-center rounded-md border ${checked ? "border-brand-600 bg-brand-600 text-white" : "border-slate-300"}`}>
                      {checked && <Icon name="Check" size={13} />}
                    </span>
                    {need}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">Step 3 · Plan</div>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">Choose the plan you want to continue with.</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">Based on the team size and workflows you selected, our recommendation is shown below. You can still choose any plan.</p>

          <div className="mt-6 rounded-2xl border border-brand-200 bg-brand-50 p-4">
            <div className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">Recommended for your setup</div>
            <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
              <div className="text-xl font-extrabold text-brand-950">{recommendation}</div>
              <div className="text-sm font-semibold text-brand-800">
                {site.pricing.plans.find((item) => item.name === recommendation)?.price}/year
              </div>
            </div>
          </div>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {site.pricing.plans.map((item) => {
              const active = (selectedPlan || recommendation) === item.name;
              return (
                <button
                  type="button"
                  key={item.name}
                  onClick={() => setSelectedPlan(item.name)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    active ? "border-brand-400 bg-brand-50 shadow-sm" : "border-slate-200 bg-white hover:border-brand-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-extrabold text-slate-950">{item.name}</div>
                    {active && <span className="rounded-full bg-brand-600 px-2 py-1 text-[9px] font-black uppercase tracking-wide text-white">Selected</span>}
                  </div>
                  <div className="mt-3 text-2xl font-extrabold tracking-tight text-slate-950">{item.price}</div>
                  <div className="text-xs text-slate-400">{item.period}</div>
                  <div className="mt-3 text-xs leading-5 text-slate-500">{item.blurb}</div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="flex min-h-[490px] items-center">
          <div className="w-full text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/20">
              <Icon name="Check" size={26} />
            </span>
            <div className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">Request received</div>
            <h3 className="mx-auto mt-2 max-w-xl text-3xl font-extrabold tracking-tight text-slate-950">Your Bispun onboarding request is in.</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
              We received the {plan?.name || recommendation} request for {form.companyName || "your company"}. Our team will contact you to confirm the next onboarding step. No payment or workspace activation has happened yet.
            </p>

            <div className="mx-auto mt-7 grid max-w-xl gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left sm:grid-cols-2">
              <div>
                <div className={labelClass}>Company</div>
                <div className="mt-1 text-sm font-bold text-slate-900">{form.companyName}</div>
              </div>
              <div>
                <div className={labelClass}>Selected plan</div>
                <div className="mt-1 text-sm font-bold text-slate-900">{plan?.name || recommendation} · {plan?.price}</div>
              </div>
              <div>
                <div className={labelClass}>Team size</div>
                <div className="mt-1 text-sm font-bold text-slate-900">{form.teamSize}</div>
              </div>
              <div>
                <div className={labelClass}>Contact</div>
                <div className="mt-1 truncate text-sm font-bold text-slate-900">{form.workEmail}</div>
              </div>
              {requestId && (
                <div className="sm:col-span-2">
                  <div className={labelClass}>Request reference</div>
                  <div className="mt-1 text-sm font-bold text-slate-900">{requestId.slice(-8).toUpperCase()}</div>
                </div>
              )}
            </div>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <button type="button" onClick={onBookDemo} className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-700">
                Book onboarding demo <Icon name="ArrowRight" size={15} />
              </button>
              <button type="button" onClick={onClose} className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700">
                Back to website
              </button>
            </div>
          </div>
        </div>
      )}

      {step < 4 && (
        <>
          {submitError && (
            <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
              {submitError}
            </div>
          )}
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-5">
            <button type="button" disabled={submitting} onClick={step === 1 ? onClose : back} className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50">
              {step === 1 ? "Cancel" : "Back"}
            </button>
            <button type="button" disabled={submitting} onClick={next} className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm shadow-brand-600/20 transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">
              {submitting ? "Submitting..." : step === 3 ? `Send ${selectedPlan || recommendation} request` : "Continue"}
              {!submitting && <Icon name="ArrowRight" size={15} />}
            </button>
          </div>
        </>
      )}
    </ModalShell>
  );
}

function DemoFlow({ onClose }) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [requestId, setRequestId] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    companyName: "",
    workEmail: "",
    phone: "",
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

  const next = async () => {
    setSubmitError("");
    const nextErrors = {};

    if (step === 1) {
      if (!form.fullName.trim()) nextErrors.fullName = "Required";
      if (!form.companyName.trim()) nextErrors.companyName = "Required";
      if (!/^\S+@\S+\.\S+$/.test(form.workEmail)) nextErrors.workEmail = "Enter a valid email";
      if (!form.phone.trim()) nextErrors.phone = "Required";
      if (!form.teamSize) nextErrors.teamSize = "Required";
    }

    if (step === 2) {
      if (!form.date) nextErrors.date = "Choose a date";
      if (!form.time) nextErrors.time = "Choose a time";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    if (step === 3) {
      setSubmitting(true);
      try {
        const result = await submitDemoRequest(form);
        setRequestId(result.requestId || "");
        setErrors({});
        setStep(4);
      } catch (error) {
        setErrors(error.fields || {});
        setSubmitError(error.message || "We couldn't submit your demo request. Please try again.");
      } finally {
        setSubmitting(false);
      }
      return;
    }

    setErrors({});
    setStep((current) => Math.min(3, current + 1));
  };

  const back = () => {
    setErrors({});
    setSubmitError("");
    setStep((current) => Math.max(1, current - 1));
  };

  return (
    <ModalShell title="See how Bispun fits your actual workflow." eyebrow="Book a demo" step={step} totalSteps={3} onClose={onClose}>
      {step === 1 && (
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">Step 1 · Your team</div>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">Tell us enough to make the demo relevant.</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">We’ll use this information to focus the session on your real operating workflow.</p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <Field label="Your name">
              <input className={inputClass} value={form.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Full name" />
              {errors.fullName && <span className="mt-1 block text-xs text-rose-500">{errors.fullName}</span>}
            </Field>
            <Field label="Company name">
              <input className={inputClass} value={form.companyName} onChange={(e) => update("companyName", e.target.value)} placeholder="Company / consultancy" />
              {errors.companyName && <span className="mt-1 block text-xs text-rose-500">{errors.companyName}</span>}
            </Field>
            <Field label="Work email">
              <input type="email" className={inputClass} value={form.workEmail} onChange={(e) => update("workEmail", e.target.value)} placeholder="name@company.com" />
              {errors.workEmail && <span className="mt-1 block text-xs text-rose-500">{errors.workEmail}</span>}
            </Field>
            <Field label="Phone">
              <input type="tel" className={inputClass} value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Business contact number" />
              {errors.phone && <span className="mt-1 block text-xs text-rose-500">{errors.phone}</span>}
            </Field>
            <Field label="Team size">
              <select className={inputClass} value={form.teamSize} onChange={(e) => update("teamSize", e.target.value)}>
                <option value="">Select team size</option>
                <option>1-5</option>
                <option>6-20</option>
                <option>21-50</option>
                <option>51+</option>
              </select>
              {errors.teamSize && <span className="mt-1 block text-xs text-rose-500">{errors.teamSize}</span>}
            </Field>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">Step 2 · Preferred time</div>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">Choose a convenient demo slot.</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">Choose a preferred date and time for a focused product walkthrough with your team.</p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <Field label="Preferred date">
              <input type="date" min={minDate} className={inputClass} value={form.date} onChange={(e) => update("date", e.target.value)} />
              {errors.date && <span className="mt-1 block text-xs text-rose-500">{errors.date}</span>}
            </Field>
            <Field label="Preferred time">
              <select className={inputClass} value={form.time} onChange={(e) => update("time", e.target.value)}>
                <option value="">Choose a time</option>
                <option>10:00 AM</option>
                <option>11:30 AM</option>
                <option>2:00 PM</option>
                <option>4:00 PM</option>
                <option>5:30 PM</option>
              </select>
              {errors.time && <span className="mt-1 block text-xs text-rose-500">{errors.time}</span>}
            </Field>
          </div>

          <Field label="Anything you want us to focus on?">
            <textarea className={`${inputClass} min-h-28 resize-y`} value={form.note} onChange={(e) => update("note", e.target.value)} placeholder="Example: lead source tracking, admissions workflow, team access, revenue visibility..." />
          </Field>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="text-xs font-bold uppercase tracking-[0.16em] text-brand-600">Step 3 · Review</div>
          <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">Review your demo request before sending.</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">Nothing is booked yet. Check the details below, then send the request to our team.</p>

          <div className="mt-7 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:grid-cols-2">
            <div>
              <div className={labelClass}>Name</div>
              <div className="mt-1 text-sm font-bold text-slate-900">{form.fullName}</div>
            </div>
            <div>
              <div className={labelClass}>Company</div>
              <div className="mt-1 text-sm font-bold text-slate-900">{form.companyName}</div>
            </div>
            <div>
              <div className={labelClass}>Work email</div>
              <div className="mt-1 truncate text-sm font-bold text-slate-900">{form.workEmail}</div>
            </div>
            <div>
              <div className={labelClass}>Phone</div>
              <div className="mt-1 text-sm font-bold text-slate-900">{form.phone}</div>
            </div>
            <div>
              <div className={labelClass}>Team size</div>
              <div className="mt-1 text-sm font-bold text-slate-900">{form.teamSize}</div>
            </div>
            <div>
              <div className={labelClass}>Preferred slot</div>
              <div className="mt-1 text-sm font-bold text-slate-900">{form.date} · {form.time}</div>
            </div>
            <div className="sm:col-span-2">
              <div className={labelClass}>Demo focus</div>
              <div className="mt-1 text-sm leading-6 text-slate-700">{form.note.trim() || "General product walkthrough"}</div>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm leading-6 text-brand-900">
            Your preferred time is a request only. Our team will confirm the final demo slot after receiving it.
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
            <h3 className="mx-auto mt-2 max-w-xl text-3xl font-extrabold tracking-tight text-slate-950">We received your preferred demo time.</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">Your request is saved. The preferred time is not a confirmed calendar booking yet; our team will contact you to confirm the slot.</p>

            <div className="mx-auto mt-7 grid max-w-xl gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left sm:grid-cols-2">
              <div>
                <div className={labelClass}>Company</div>
                <div className="mt-1 text-sm font-bold text-slate-900">{form.companyName}</div>
              </div>
              <div>
                <div className={labelClass}>Contact</div>
                <div className="mt-1 truncate text-sm font-bold text-slate-900">{form.workEmail}</div>
              </div>
              <div>
                <div className={labelClass}>Preferred date</div>
                <div className="mt-1 text-sm font-bold text-slate-900">{form.date}</div>
              </div>
              <div>
                <div className={labelClass}>Preferred time</div>
                <div className="mt-1 text-sm font-bold text-slate-900">{form.time}</div>
              </div>
              {requestId && (
                <div className="sm:col-span-2">
                  <div className={labelClass}>Request reference</div>
                  <div className="mt-1 text-sm font-bold text-slate-900">{requestId.slice(-8).toUpperCase()}</div>
                </div>
              )}
            </div>

            <button type="button" onClick={onClose} className="mt-7 inline-flex items-center justify-center rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-700">Back to website</button>
          </div>
        </div>
      )}

      {step < 4 && (
        <>
          {submitError && (
            <div className="mt-6 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
              {submitError}
            </div>
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
  const hash = window.location.hash.toLowerCase();
  if (hash === "#demo") return { type: "demo", plan: "" };
  if (hash.startsWith("#signup")) {
    const suffix = hash.replace("#signup", "").replace(/^[-/]/, "");
    const plan = site.pricing.plans.find((item) => item.name.toLowerCase() === suffix)?.name || "";
    return { type: "signup", plan };
  }
  return { type: "", plan: "" };
}

export default function ConversionFlows() {
  const [flow, setFlow] = useState({ type: "", plan: "" });

  useEffect(() => {
    const sync = () => setFlow(parseFlowFromHash());
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const close = () => {
    setFlow({ type: "", plan: "" });
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  };

  const openDemo = () => {
    window.location.hash = "demo";
    setFlow({ type: "demo", plan: "" });
  };

  if (flow.type === "signup") {
    return <SignupFlow initialPlan={flow.plan} onClose={close} onBookDemo={openDemo} />;
  }
  if (flow.type === "demo") return <DemoFlow onClose={close} />;
  return null;
}
