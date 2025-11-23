import { Resend } from "resend";
import { render } from "@react-email/render";
import { MagicLinkEmail } from "./templates";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendMagicLinkEmail(email: string, url: string) {
  if (process.env.NODE_ENV === "development") {
    console.log(`🔗 Magic link para ${email}: ${url}`);
    return;
  }

  try {
    const html = await render(MagicLinkEmail({ url }));

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: email,
      subject: "Acesse sua conta Spikeflow",
      html,
    });
    console.log(`✅ Magic link enviado para ${email}`);
  } catch (error) {
    console.error("❌ Erro ao enviar magic link:", error);
    throw error;
  }
}
