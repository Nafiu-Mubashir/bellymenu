import { NextRequest, NextResponse } from "next/server";
import type { BookingFormData } from "@/components/booking/BookingForm";

// ─── Email HTML builder ───────────────────────────────────────────────────────
function buildAdminEmail(data: BookingFormData): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr>
          <td style="padding:10px 16px;background:#f9fafb;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;white-space:nowrap;width:130px;border-bottom:1px solid #f3f4f6">${label}</td>
          <td style="padding:10px 16px;font-size:14px;color:#111827;border-bottom:1px solid #f3f4f6">${value}</td>
        </tr>`
      : "";

  const eventLabel: Record<string, string> = {
    wedding: "💍 Wedding Reception",
    corporate: "🏢 Corporate Event",
    birthday: "🎂 Birthday Party",
    private: "🍽️ Private Dining",
    outdoor: "🌿 Outdoor Event",
    cocktail: "🥂 Cocktail Reception",
    graduation: "🎓 Graduation",
    other: "✨ Other",
  };

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">

        <!-- Header -->
        <tr>
          <td style="background:#16a34a;padding:28px 32px">
            <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.7)">Bellymenu Kitchen</p>
            <h1 style="margin:6px 0 0;font-size:22px;font-weight:700;color:#fff">New Quote Request</h1>
          </td>
        </tr>

        <!-- Alert strip -->
        <tr>
          <td style="background:#dcfce7;padding:12px 32px;border-bottom:1px solid #bbf7d0">
            <p style="margin:0;font-size:13px;color:#15803d;font-weight:500">
              📋 A new catering enquiry has been submitted via the website. Please respond within 24 hours.
            </p>
          </td>
        </tr>

        <!-- Contact info -->
        <tr><td style="padding:28px 32px 0">
          <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af">Contact Information</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f3f4f6;border-radius:10px;overflow:hidden">
            ${row("Full Name", data.fullName)}
            ${row("Email", `<a href="mailto:${data.email}" style="color:#16a34a">${data.email}</a>`)}
            ${row("Phone", `<a href="tel:${data.phone}" style="color:#16a34a">${data.phone}</a>`)}
          </table>
        </td></tr>

        <!-- Event info -->
        <tr><td style="padding:24px 32px 0">
          <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af">Event Details</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #f3f4f6;border-radius:10px;overflow:hidden">
            ${row("Event Type", eventLabel[data.eventType] ?? data.eventType)}
            ${row("Event Date", data.eventDate || "Not specified")}
            ${row("Guest Count", data.guestCount || "Not specified")}
            ${row("Location", data.location || "Not specified")}
            ${row("Budget", data.budget || "Not specified")}
            ${row("Services", data.services?.join(", ") || "Not specified")}
            ${row("Heard Via", data.hearAboutUs || "Not specified")}
          </table>
        </td></tr>

        <!-- Message -->
        ${data.message ? `
        <tr><td style="padding:24px 32px 0">
          <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af">Additional Notes</p>
          <div style="background:#f9fafb;border:1px solid #f3f4f6;border-radius:10px;padding:16px;font-size:14px;color:#374151;line-height:1.7">
            ${data.message.replace(/\n/g, "<br>")}
          </div>
        </td></tr>
        ` : ""}

        <!-- Action buttons -->
        <tr><td style="padding:28px 32px">
          <table cellpadding="0" cellspacing="0">
            <tr>
              <td style="padding-right:10px">
                <a href="mailto:${data.email}?subject=Re: Your Catering Quote Request — Bellymenu Kitchen"
                   style="display:inline-block;background:#16a34a;color:#fff;padding:12px 24px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none">
                  Reply to ${data.fullName.split(" ")[0]}
                </a>
              </td>
              <td>
                <a href="https://wa.me/${data.phone.replace(/\D/g, "")}?text=${encodeURIComponent(`Hi ${data.fullName.split(" ")[0]}! Thanks for reaching out to Bellymenu Kitchen. We've received your catering request and will send you a personalised proposal shortly. 🍽️`)}"
                   style="display:inline-block;background:#25D366;color:#fff;padding:12px 24px;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none">
                  WhatsApp Client
                </a>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:16px 32px;border-top:1px solid #f3f4f6">
            <p style="margin:0;font-size:11px;color:#9ca3af">
              Submitted: ${new Date().toLocaleString("en-NG", { timeZone: "Africa/Lagos", dateStyle: "full", timeStyle: "short" })} WAT
              · Bellymenu Kitchen automated notification
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Client confirmation email ────────────────────────────────────────────────
function buildClientEmail(data: BookingFormData): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">

        <!-- Header -->
        <tr>
          <td style="background:#16a34a;padding:36px 32px;text-align:center">
            <div style="width:56px;height:56px;background:rgba(255,255,255,0.15);border-radius:14px;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:28px">🍽️</div>
            <h1 style="margin:0;font-size:24px;font-weight:700;color:#fff">We've Got Your Request!</h1>
            <p style="margin:8px 0 0;font-size:14px;color:rgba(255,255,255,0.75)">Bellymenu Kitchen</p>
          </td>
        </tr>

        <!-- Body -->
        <tr><td style="padding:36px 32px">
          <p style="margin:0 0 20px;font-size:16px;color:#111827;font-weight:600">
            Hi ${data.fullName.split(" ")[0]},
          </p>
          <p style="margin:0 0 16px;font-size:14px;color:#4b5563;line-height:1.7">
            Thank you for reaching out to Bellymenu Kitchen! We've received your catering request for your
            <strong>${data.eventType}</strong> and we're excited to work with you.
          </p>
          <p style="margin:0 0 24px;font-size:14px;color:#4b5563;line-height:1.7">
            A member of our team will be in touch within <strong>24 hours</strong> with a personalised proposal.
            In the meantime, feel free to reach us directly:
          </p>

          <!-- Contact options -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px">
            <tr>
              <td style="padding:0 6px 0 0" width="50%">
                <a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "2348012345678"}"
                   style="display:block;background:#dcfce7;border:1px solid #bbf7d0;border-radius:12px;padding:14px;text-align:center;text-decoration:none">
                  <p style="margin:0 0 4px;font-size:18px">💬</p>
                  <p style="margin:0;font-size:12px;font-weight:600;color:#15803d">WhatsApp Us</p>
                </a>
              </td>
              <td style="padding:0 0 0 6px" width="50%">
                <a href="mailto:hello@bellymenukitchen.com"
                   style="display:block;background:#f9fafb;border:1px solid #f3f4f6;border-radius:12px;padding:14px;text-align:center;text-decoration:none">
                  <p style="margin:0 0 4px;font-size:18px">📧</p>
                  <p style="margin:0;font-size:12px;font-weight:600;color:#374151">Email Us</p>
                </a>
              </td>
            </tr>
          </table>

          <!-- What happens next -->
          <div style="background:#f9fafb;border-radius:12px;padding:20px;border:1px solid #f3f4f6">
            <p style="margin:0 0 14px;font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#9ca3af">What Happens Next</p>
            ${["Our team reviews your request and prepares a custom proposal",
               "We contact you within 24 hours via phone or email",
               "We walk you through menu options and pricing together",
               "You confirm the booking — and we start planning your event!"]
              .map((s, i) => `
            <div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:${i < 3 ? "10px" : "0"}">
              <div style="min-width:22px;height:22px;background:#16a34a;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#fff;margin-top:1px">${i + 1}</div>
              <p style="margin:0;font-size:13px;color:#4b5563;line-height:1.6">${s}</p>
            </div>`).join("")}
          </div>
        </td></tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:20px 32px;border-top:1px solid #f3f4f6;text-align:center">
            <p style="margin:0 0 6px;font-size:13px;font-weight:600;color:#111827">Bellymenu Kitchen</p>
            <p style="margin:0;font-size:12px;color:#9ca3af">Abuja, Nigeria · hello@bellymenukitchen.com</p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as BookingFormData;
    const { fullName, email, phone, eventType, guestCount } = body;

    // Server-side validation
    if (!fullName || !email || !phone || !eventType || !guestCount) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // ── Send via Resend ──────────────────────────────────────────────────────
    // Install: npm install resend
    // Set env: RESEND_API_KEY, BOOKING_EMAIL, RESEND_FROM_EMAIL

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (RESEND_API_KEY) {
      const { Resend } = await import("resend");
      const resend = new Resend(RESEND_API_KEY);

      const fromEmail = process.env.RESEND_FROM_EMAIL ?? "noreply@bellymenukitchen.com";
      const toEmail   = process.env.BOOKING_EMAIL      ?? "hello@bellymenukitchen.com";

      // Fire both emails in parallel
      await Promise.all([
        // Admin notification
        resend.emails.send({
          from:    `Bellymenu Website <${fromEmail}>`,
          to:      [toEmail],
          replyTo: email,
          subject: `🍽️ New Quote Request — ${eventType} from ${fullName}`,
          html:    buildAdminEmail(body),
        }),
        // Client confirmation
        resend.emails.send({
          from:    `Bellymenu Kitchen <${fromEmail}>`,
          to:      [email],
          subject: "We've received your request — Bellymenu Kitchen",
          html:    buildClientEmail(body),
        }),
      ]);
    } else {
      // Dev fallback: log to console
      console.log("[Booking Request — no RESEND_API_KEY set]", {
        fullName, email, phone, eventType,
        eventDate: body.eventDate,
        guestCount, location: body.location,
        budget: body.budget,
        services: body.services,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[Booking API Error]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
