import { Resend } from "resend";
import { NextResponse } from "next/server";

const TO = "adsolemai@gmail.com";
// Update RESEND_FROM_EMAIL in Vercel env vars once you verify a sending domain.
// Until then the default "onboarding@resend.dev" works for Resend account testing.
const FROM = process.env.RESEND_FROM_EMAIL ?? "AdSolem <onboarding@resend.dev>";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, company, service, message } = body;

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json({ error: "Service unavailable." }, { status: 503 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `New enquiry — ${name}${company ? ` · ${company}` : ""}`,
      html: buildEmail({ name, email, company, service, message }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

function buildEmail({
  name,
  email,
  company,
  service,
  message,
}: {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
}) {
  const rows: [string, string][] = [
    ["Name", name],
    ["Email", `<a href="mailto:${email}" style="color:#c9a84c">${email}</a>`],
    ...(company ? [["Company", company] as [string, string]] : []),
    ...(service ? [["Service", service] as [string, string]] : []),
  ];

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#05070b;font-family:system-ui,sans-serif;color:#f8f7f4">
  <div style="max-width:560px;margin:40px auto;padding:0 24px">
    <div style="margin-bottom:28px">
      <p style="margin:0;color:#c9a84c;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase">AdSolem</p>
      <h1 style="margin:8px 0 0;font-size:22px;font-weight:700;color:#f8f7f4">New enquiry</h1>
    </div>
    <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
      ${rows
        .map(
          ([label, value]) => `
      <tr>
        <td style="padding:10px 0;color:rgba(248,247,244,.5);font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;width:90px;vertical-align:top">${label}</td>
        <td style="padding:10px 0;color:#f8f7f4;font-size:14px;border-bottom:1px solid rgba(255,255,255,.06)">${value}</td>
      </tr>`
        )
        .join("")}
    </table>
    <div style="background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);border-radius:12px;padding:20px">
      <p style="margin:0;color:#f8f7f4;font-size:14px;line-height:1.75;white-space:pre-wrap">${message}</p>
    </div>
    <p style="margin:32px 0 0;color:rgba(248,247,244,.28);font-size:11px">Sent via adsolem.vercel.app contact form</p>
  </div>
</body>
</html>`;
}
