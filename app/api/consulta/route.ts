import { NextResponse } from "next/server";
import { isValidCpf, onlyDigits } from "@/lib/cpf";
import { getProvedor } from "@/lib/consulta";
import { rateLimit } from "@/lib/rate-limit";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const ip =
    req.headers.get("x-real-ip") ?? req.headers.get("x-forwarded-for")?.split(",").pop()?.trim() ?? "local";
  if (!rateLimit(`ip:${ip}`)) {
    return NextResponse.json(
      { erro: "Você fez muitas consultas em pouco tempo. Tente de novo em 1 hora ou fale com a gente no WhatsApp." },
      { status: 429 },
    );
  }

  let body: { cpf?: string; nome?: string; whatsapp?: string; consentimento?: boolean };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ erro: "Requisição inválida." }, { status: 400 });
  }

  const cpf = onlyDigits(body.cpf ?? "");
  const nome = (body.nome ?? "").trim().slice(0, 120);
  const whatsapp = onlyDigits(body.whatsapp ?? "");

  if (!isValidCpf(cpf)) return NextResponse.json({ erro: "Esse CPF não é válido. Confira os números." }, { status: 400 });
  if (nome.length < 3) return NextResponse.json({ erro: "Digite seu nome completo." }, { status: 400 });
  if (whatsapp.length < 10) return NextResponse.json({ erro: "Digite um WhatsApp com DDD." }, { status: 400 });
  if (body.consentimento !== true) {
    return NextResponse.json({ erro: "Para consultar, confirme que o CPF é seu e aceite a política de privacidade." }, { status: 400 });
  }

  try {
    const resultado = await getProvedor().consultar(cpf);
    await enviarLead({ nome, whatsapp, cpf, resultado });
    return NextResponse.json(resultado, { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("[consulta] falha no provedor:", e instanceof Error ? e.message : e);
    return NextResponse.json(
      { erro: "A consulta está indisponível agora. Tente em alguns minutos ou chame a gente no WhatsApp." },
      { status: 502 },
    );
  }
}

async function enviarLead(lead: Record<string, unknown>) {
  const url = process.env.LEAD_WEBHOOK_URL;
  if (!url) return;
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ origem: "site-consulta", ...lead, criadoEm: new Date().toISOString() }),
      signal: AbortSignal.timeout(5000),
    });
  } catch (e) {
    console.error("[consulta] falha ao enviar lead:", e instanceof Error ? e.message : e);
  }
}
