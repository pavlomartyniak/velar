import { NextResponse } from "next/server";
import { formatLeadMessage, sendTelegramMessage } from "@/lib/telegram";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.name !== "string" || typeof body.phone !== "string") {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const message = formatLeadMessage({
    name: body.name,
    phone: body.phone,
    source: typeof body.source === "string" ? body.source : "site",
    configurator: body.configurator,
  });

  const delivered = await sendTelegramMessage(message);

  return NextResponse.json({ ok: true, delivered });
}
