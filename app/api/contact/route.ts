import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

function buildEmail(data: ContactFormData): string {
  const row = (label: string, value: string) =>
    `<tr>
      <td style="padding:10px 16px;background:#f9fafb;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;white-space:nowrap;width:120px;border-bottom:1px solid #f3f4f6">${label}</td>
      <td style="padding:10px 16px;font-size:14px;color:#111827;border-bottom:1px solid #f3f4f6">${value}</td>
    </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">
        <tr>
          <td style="background:#16a34a;padding:24px 32px">
            <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.65)">Bellymenu Kitchen</p>
            <h1 style="margin:6px 0 0;font-size:20px;font-weight:700;color:#fff">New Contact Message</h1>
          </td>
        </tr>
        <tr><td style="padding:28px 32px 0">
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f3f4f6;border-radius:10px;overflow:hidden">
            ${row("Name", data.fullName)}
            ${row("Email", `<a href="mailto:${data.email}" style="color:#16a34a">${data.email}</a>`)}
            ${data.phone ? row("Phone", `<a href="tel:${data.phone}" style="color:#16a34a">${data.phone}</a>`) : ""}
            ${data.subject ? row("Subject", data.subject) : ""}
          </table>
        </td></tr>
        <tr><td style="padding:20px 32px 0">
          <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af">Message</p>
          <div style="background:#f9fafb;border:1px solid #f3f4f6;border-radius:10px;padding:16px;font-size:14px;color:#374151;line-height:1.7">
            ${data.message.replace(/\n/g, "<br>")}
          </div>
        </td></tr>
        <tr><td style="padding:24px 32px">
          <a href="mailto:${data.email}?subject=Re: ${data.subject ?? "Your message to Bellymenu Kitchen"}"
             style="display:inline-block;background:#16a34a;color:#fff;padding:12px 24px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none">
            Reply to ${data.fullName.split(" ")[0]}
          </a>
        </td></tr>
        <tr>
          <td style="background:#f9fafb;padding:14px 32px;border-top:1px solid #f3f4f6">
            <p style="margin:0;font-size:11px;color:#9ca3af">
              ${new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos", dateStyle: "full", timeStyle: "short" })} WAT
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as ContactFormData;
    const { fullName, email, message } = body;

    if (!fullName?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(RESEND_API_KEY);
      await resend.emails.send({
        from:    `Bellymenu Website <${process.env.RESEND_FROM_EMAIL ?? "noreply@bellymenukitchen.com"}>`,
        to:      [process.env.CONTACT_EMAIL ?? process.env.BOOKING_EMAIL ?? "hello@bellymenukitchen.com"],
        replyTo: email,
        subject: `📩 New Contact: ${body.subject ?? "General Enquiry"} — ${fullName}`,
        html:    buildEmail(body),
      });
    } else {
      console.log("[Contact Form — no RESEND_API_KEY]", { fullName, email, subject: body.subject });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Contact API Error]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
