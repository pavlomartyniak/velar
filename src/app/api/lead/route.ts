import { NextResponse } from "next/server";
import { formatLeadMessage, sendTelegramMessage } from "@/lib/telegram";
import { formatDesignLeadMessage } from "@/lib/design-lead";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || typeof body.name !== "string" || typeof body.phone !== "string") {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const source = typeof body.source === "string" ? body.source : "site";

  let message: string;
  if (body.kind === "design") {
    message = formatDesignLeadMessage(body.name, body.phone, body.payload ?? {});
  } else {
    // construction / звичайна заявка (configurator — для зворотної сумісності)
    message = formatLeadMessage({
      name: body.name,
      phone: body.phone,
      source,
      configurator: body.payload ?? body.configurator,
    });
  }

  const delivered = await sendTelegramMessage(message);

  return NextResponse.json({ ok: true, delivered });
}
