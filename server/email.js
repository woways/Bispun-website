import nodemailer from "nodemailer";

let transporter;

function emailConfigReady() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_PORT &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.EMAIL_FROM_ADDRESS
  );
}

function getTransporter() {
  if (!emailConfigReady()) return null;
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: String(process.env.SMTP_SECURE).toLowerCase() === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function fromAddress() {
  const name = process.env.EMAIL_FROM_NAME || "Bispun";
  return `"${name}" <${process.env.EMAIL_FROM_ADDRESS}>`;
}

async function safeSend(message) {
  const mailer = getTransporter();
  if (!mailer) {
    console.warn("Email skipped: SMTP environment variables are not configured.");
    return false;
  }

  try {
    await mailer.sendMail({ from: fromAddress(), ...message });
    return true;
  } catch (error) {
    console.error("Email delivery failed:", error?.message || error);
    return false;
  }
}

export async function sendSignupEmails(request) {
  const needs = Array.isArray(request.needs) ? request.needs : [];
  const reference = request.id.slice(-8).toUpperCase();

  const customer = safeSend({
    to: request.workEmail,
    subject: "We received your Bispun onboarding request",
    text: `Hi ${request.fullName},\n\nWe received your Bispun onboarding request for ${request.companyName}. Selected plan: ${request.selectedPlan}. Reference: ${reference}.\n\nOur team will contact you to confirm the next onboarding step.\n\nBispun`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:620px;margin:auto">
        <h2 style="margin-bottom:8px">Thanks, ${escapeHtml(request.fullName)}.</h2>
        <p>We received the onboarding request for <strong>${escapeHtml(request.companyName)}</strong>.</p>
        <p><strong>Selected plan:</strong> ${escapeHtml(request.selectedPlan)}<br/>
        <strong>Reference:</strong> ${reference}</p>
        <p>Our team will contact you to confirm the next onboarding step. No payment or workspace activation has been completed yet.</p>
        <p style="color:#64748b">— Bispun</p>
      </div>`,
  });

  const admin = process.env.ADMIN_NOTIFICATION_EMAIL
    ? safeSend({
        to: process.env.ADMIN_NOTIFICATION_EMAIL,
        replyTo: request.workEmail,
        subject: `New Bispun signup request — ${request.companyName}`,
        text: `New signup request\n\nName: ${request.fullName}\nCompany: ${request.companyName}\nEmail: ${request.workEmail}\nPhone: ${request.phone}\nRole: ${request.role}\nBusiness type: ${request.businessType}\nTeam size: ${request.teamSize}\nMonthly leads: ${request.monthlyLeads}\nRecommended plan: ${request.recommendedPlan}\nSelected plan: ${request.selectedPlan}\nNeeds: ${needs.join(", ") || "None selected"}\nReference: ${reference}`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:680px;margin:auto">
            <h2>New website signup request</h2>
            <p><strong>Reference:</strong> ${reference}</p>
            <table cellpadding="7" cellspacing="0" style="border-collapse:collapse;width:100%">
              <tr><td><strong>Name</strong></td><td>${escapeHtml(request.fullName)}</td></tr>
              <tr><td><strong>Company</strong></td><td>${escapeHtml(request.companyName)}</td></tr>
              <tr><td><strong>Email</strong></td><td>${escapeHtml(request.workEmail)}</td></tr>
              <tr><td><strong>Phone</strong></td><td>${escapeHtml(request.phone)}</td></tr>
              <tr><td><strong>Role</strong></td><td>${escapeHtml(request.role)}</td></tr>
              <tr><td><strong>Business type</strong></td><td>${escapeHtml(request.businessType)}</td></tr>
              <tr><td><strong>Team size</strong></td><td>${escapeHtml(request.teamSize)}</td></tr>
              <tr><td><strong>Monthly leads</strong></td><td>${escapeHtml(request.monthlyLeads)}</td></tr>
              <tr><td><strong>Recommended plan</strong></td><td>${escapeHtml(request.recommendedPlan)}</td></tr>
              <tr><td><strong>Selected plan</strong></td><td>${escapeHtml(request.selectedPlan)}</td></tr>
              <tr><td><strong>Needs</strong></td><td>${escapeHtml(needs.join(", ") || "None selected")}</td></tr>
            </table>
          </div>`,
      })
    : Promise.resolve(false);

  return Promise.allSettled([customer, admin]);
}

export async function sendDemoEmails(request) {
  const reference = request.id.slice(-8).toUpperCase();
  const date = request.preferredDate.toISOString().slice(0, 10);

  const customer = safeSend({
    to: request.workEmail,
    subject: "We received your Bispun demo request",
    text: `Hi ${request.fullName},\n\nWe received your preferred Bispun demo request for ${date} at ${request.preferredTime}. Reference: ${reference}.\n\nThis is a preferred time request, not a confirmed calendar booking yet. Our team will contact you to confirm the slot.\n\nBispun`,
    html: `
      <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:620px;margin:auto">
        <h2>Demo request received.</h2>
        <p>Hi ${escapeHtml(request.fullName)}, we received your preferred demo time for <strong>${escapeHtml(request.companyName)}</strong>.</p>
        <p><strong>Preferred date:</strong> ${date}<br/>
        <strong>Preferred time:</strong> ${escapeHtml(request.preferredTime)}<br/>
        <strong>Reference:</strong> ${reference}</p>
        <p>This is not a confirmed calendar booking yet. Our team will contact you to confirm the slot.</p>
        <p style="color:#64748b">— Bispun</p>
      </div>`,
  });

  const admin = process.env.ADMIN_NOTIFICATION_EMAIL
    ? safeSend({
        to: process.env.ADMIN_NOTIFICATION_EMAIL,
        replyTo: request.workEmail,
        subject: `New Bispun demo request — ${request.companyName}`,
        text: `New demo request\n\nName: ${request.fullName}\nCompany: ${request.companyName}\nEmail: ${request.workEmail}\nPhone: ${request.phone}\nTeam size: ${request.teamSize}\nPreferred date: ${date}\nPreferred time: ${request.preferredTime}\nFocus: ${request.note || "Not provided"}\nReference: ${reference}`,
        html: `
          <div style="font-family:Arial,sans-serif;line-height:1.6;color:#0f172a;max-width:680px;margin:auto">
            <h2>New website demo request</h2>
            <p><strong>Reference:</strong> ${reference}</p>
            <table cellpadding="7" cellspacing="0" style="border-collapse:collapse;width:100%">
              <tr><td><strong>Name</strong></td><td>${escapeHtml(request.fullName)}</td></tr>
              <tr><td><strong>Company</strong></td><td>${escapeHtml(request.companyName)}</td></tr>
              <tr><td><strong>Email</strong></td><td>${escapeHtml(request.workEmail)}</td></tr>
              <tr><td><strong>Phone</strong></td><td>${escapeHtml(request.phone)}</td></tr>
              <tr><td><strong>Team size</strong></td><td>${escapeHtml(request.teamSize)}</td></tr>
              <tr><td><strong>Preferred date</strong></td><td>${date}</td></tr>
              <tr><td><strong>Preferred time</strong></td><td>${escapeHtml(request.preferredTime)}</td></tr>
              <tr><td><strong>Focus</strong></td><td>${escapeHtml(request.note || "Not provided")}</td></tr>
            </table>
          </div>`,
      })
    : Promise.resolve(false);

  return Promise.allSettled([customer, admin]);
}
