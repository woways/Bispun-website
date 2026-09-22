import { useState } from "react";
import { site } from "../data/site";
import Icon from "../components/Icon";

const LAST_UPDATED = "September 22, 2026";

function PageIntro({ eyebrow, title, description }) {
  return (
    <div className="border-b border-slate-200 bg-slate-50/70">
      <div className="container-x py-14 sm:py-16">
        <div className="max-w-3xl">
          <div className="text-sm font-bold uppercase tracking-widest text-brand-600">{eyebrow}</div>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">{description}</p>
        </div>
      </div>
    </div>
  );
}

function PolicySection({ title, children }) {
  return (
    <section className="border-b border-slate-100 py-7 last:border-0">
      <h2 className="text-xl font-bold tracking-tight text-slate-950">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-slate-600 sm:text-[15px]">{children}</div>
    </section>
  );
}

function PolicyShell({ children }) {
  return (
    <div className="container-x py-10 sm:py-14">
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white px-6 py-2 shadow-sm sm:px-9">
        {children}
      </div>
    </div>
  );
}

export function PrivacyPolicyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Legal"
        title="Privacy Policy"
        description="How Bispun handles information submitted through this website and our sales or demo process."
      />
      <PolicyShell>
        <PolicySection title="1. Information we collect">
          <p>
            When you contact us, begin or submit a demo request, or otherwise communicate with Bispun, we may collect information you provide such as your name, work email, phone number, company details, team size, preferred demo time and enquiry details.
          </p>
          <p>
            During the Book a Demo flow, contact details you enter may be saved before you complete all later steps so our team can follow up on your enquiry even if the form is not fully completed.
          </p>
          <p>
            Our hosting and security providers may also process basic technical information required to deliver and protect the website, such as request, device, browser or network information.
          </p>
        </PolicySection>

        <PolicySection title="2. How we use information">
          <p>We use information to respond to enquiries, arrange product demonstrations, understand business requirements, recommend relevant CRM options, provide requested support and maintain the security and reliability of our services.</p>
          <p>We may also use the details you provide to follow up about the Bispun CRM when your enquiry indicates an interest in the product.</p>
        </PolicySection>

        <PolicySection title="3. How information is shared">
          <p>
            We do not sell personal information. Information may be processed by service providers that support our website, hosting, database, communications, email or CRM infrastructure where needed to operate the service.
          </p>
          <p>We may also disclose information when required by applicable law or to protect the security and rights of Bispun, our users or others.</p>
        </PolicySection>

        <PolicySection title="4. Data retention">
          <p>
            We retain enquiry and business-contact information only for as long as reasonably necessary for the purpose it was collected, including sales follow-up, customer support, business records, security and legal obligations.
          </p>
        </PolicySection>

        <PolicySection title="5. Security">
          <p>
            We use reasonable technical and organisational measures intended to protect information. No internet transmission or storage system can be guaranteed to be completely secure.
          </p>
        </PolicySection>

        <PolicySection title="6. Your choices">
          <p>
            You may contact us to ask about, correct or request deletion of information you have provided, subject to applicable legal and business-record requirements.
          </p>
        </PolicySection>

        <PolicySection title="7. Children">
          <p>Bispun is a business CRM website and is not intended for use by children.</p>
        </PolicySection>

        <PolicySection title="8. Changes to this policy">
          <p>We may update this policy as the website, CRM or our business processes change. The latest version will be posted on this page.</p>
        </PolicySection>

        <PolicySection title="9. Contact">
          <p>
            Privacy questions can be sent to <a className="font-semibold text-brand-700 hover:text-brand-800" href={`mailto:${site.brand.email}`}>{site.brand.email}</a>.
          </p>
          <p className="text-xs text-slate-400">Last updated: {LAST_UPDATED}</p>
        </PolicySection>
      </PolicyShell>
    </>
  );
}

export function TermsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Legal"
        title="Terms & Conditions"
        description="Terms for using the Bispun website and requesting information, demonstrations or access to the CRM."
      />
      <PolicyShell>
        <PolicySection title="1. Website use">
          <p>
            This website provides information about Bispun CRM, its capabilities, plans and ways to contact our team. By using the website, you agree to use it lawfully and not attempt to interfere with its security, availability or operation.
          </p>
        </PolicySection>

        <PolicySection title="2. Demo and contact requests">
          <p>
            A Book a Demo submission is a request to speak with our team. A preferred date or time is not guaranteed until it is confirmed by Bispun.
          </p>
          <p>
            Contact details entered during the demo process may be retained for legitimate follow-up even if you do not complete every step of the request.
          </p>
        </PolicySection>

        <PolicySection title="3. Sign up and CRM access">
          <p>
            The Sign Up action may direct you to the Bispun CRM portal. Access to the CRM, account activation, subscriptions, onboarding and paid services may be subject to additional commercial or service terms presented during the purchasing or onboarding process.
          </p>
        </PolicySection>

        <PolicySection title="4. Plans and pricing">
          <p>
            Website pricing and feature descriptions are provided for general information. Final pricing, taxes, scope, implementation requirements, customisation, renewal terms and included services may be confirmed in the applicable order, proposal or agreement.
          </p>
        </PolicySection>

        <PolicySection title="5. Product information">
          <p>
            We aim to keep website information accurate and current, but product screens, features, availability and workflows may change as Bispun evolves. Website visuals may use neutral or illustrative data to demonstrate the interface.
          </p>
        </PolicySection>

        <PolicySection title="6. Intellectual property">
          <p>
            The Bispun name, website content, interface designs, software, branding and related materials are protected by applicable intellectual-property rights. They may not be copied, resold or exploited without permission except where permitted by law.
          </p>
        </PolicySection>

        <PolicySection title="7. Third-party services">
          <p>
            Bispun may rely on third-party hosting, database, communications or infrastructure providers. Their availability and terms may affect parts of the service outside our direct control.
          </p>
        </PolicySection>

        <PolicySection title="8. Disclaimer and limitation">
          <p>
            The public website is provided for informational purposes. To the extent permitted by applicable law, Bispun is not responsible for indirect or consequential losses arising solely from reliance on public website content or temporary website unavailability.
          </p>
          <p>Any paid CRM relationship will be governed by the commercial terms agreed for that service.</p>
        </PolicySection>

        <PolicySection title="9. Changes">
          <p>We may update these website terms when our services or business processes change. Continued use of the website after an update is subject to the latest published version.</p>
        </PolicySection>

        <PolicySection title="10. Contact">
          <p>
            Questions about these terms can be sent to <a className="font-semibold text-brand-700 hover:text-brand-800" href={`mailto:${site.brand.email}`}>{site.brand.email}</a>.
          </p>
          <p className="text-xs text-slate-400">Last updated: {LAST_UPDATED}</p>
        </PolicySection>
      </PolicyShell>
    </>
  );
}

export function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const submit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Bispun website enquiry${form.company ? ` - ${form.company}` : ""}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company || "Not provided"}\n\nMessage:\n${form.message}`
    );
    window.location.href = `mailto:${site.brand.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Talk to the Bispun team."
        description="Tell us what you want to improve in your lead, admissions, revenue or team workflow and we’ll point you to the right next step."
      />

      <div className="container-x py-12 sm:py-16">
        <div className="grid gap-8 lg:grid-cols-[.75fr_1.25fr] lg:items-start">
          <div className="space-y-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <Icon name="Headphones" size={19} />
              </span>
              <h2 className="mt-4 text-lg font-bold text-slate-950">General enquiry</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">For product, partnership, pricing or support-related questions.</p>
              <a className="mt-4 inline-flex font-semibold text-brand-700 hover:text-brand-800" href={`mailto:${site.brand.email}`}>{site.brand.email}</a>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-950 p-6 text-white shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                <Icon name="ArrowUpRight" size={19} />
              </span>
              <h2 className="mt-4 text-lg font-bold">Want a product walkthrough?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">Book a focused demo around your team, workflow and business requirements.</p>
              <a href="/#demo" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700">
                Book a Demo <Icon name="ArrowRight" size={15} />
              </a>
            </div>
          </div>

          <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div>
              <div className="text-sm font-bold uppercase tracking-widest text-brand-600">Send a message</div>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-950">How can we help?</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">Submitting this form opens your email app with the message prepared for Bispun.</p>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-slate-700">
                Name
                <input required value={form.name} onChange={update("name")} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3.5 font-normal outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100" placeholder="Your name" />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Work email
                <input required type="email" value={form.email} onChange={update("email")} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3.5 font-normal outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100" placeholder="you@company.com" />
              </label>
            </div>

            <label className="mt-5 block text-sm font-semibold text-slate-700">
              Company <span className="font-normal text-slate-400">(optional)</span>
              <input value={form.company} onChange={update("company")} className="mt-2 h-11 w-full rounded-xl border border-slate-200 px-3.5 font-normal outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100" placeholder="Company name" />
            </label>

            <label className="mt-5 block text-sm font-semibold text-slate-700">
              Message
              <textarea required rows="6" value={form.message} onChange={update("message")} className="mt-2 w-full resize-y rounded-xl border border-slate-200 px-3.5 py-3 font-normal outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100" placeholder="Tell us what you want to manage or improve..." />
            </label>

            <button type="submit" className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 text-sm font-semibold text-white shadow-sm shadow-brand-600/20 transition hover:bg-brand-700">
              Prepare email <Icon name="ArrowRight" size={15} />
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
