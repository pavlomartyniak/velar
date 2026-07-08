import { escapeHtml } from "./telegram";

const SERVICE_LABELS: Record<string, string> = {
  interior: "Дизайн інтер'єру",
  landscape: "Ландшафтний дизайн",
};

const TIER_LABELS: Record<string, Record<string, string>> = {
  interior: {
    basic: "Планування (без 3D)",
    standard: "Повний проєкт (з 3D)",
    premium: "Авторський нагляд",
  },
  landscape: {
    basic: "Ескізний проєкт",
    standard: "З 3D-візуалізацією",
    premium: "Преміум / авторський нагляд",
  },
};

export interface ServiceLeadPayload {
  service?: string;
  tier?: string;
}

/** Заявка на окрему послугу (дизайн інтер'єру / ландшафту) — без прив'язки до нашого проєкту будинку. */
export function formatServiceLeadMessage(
  name: string,
  phone: string,
  payload: ServiceLeadPayload,
): string {
  const service = payload.service ? SERVICE_LABELS[payload.service] ?? payload.service : "—";
  const tier =
    payload.service && payload.tier
      ? TIER_LABELS[payload.service]?.[payload.tier] ?? payload.tier
      : undefined;

  const lines = [
    "🆕 <b>Заявка на окрему послугу</b>",
    "",
    `👤 Ім'я: ${escapeHtml(name)}`,
    `📞 Телефон: ${escapeHtml(phone)}`,
    "",
    `🛋️ Послуга: ${escapeHtml(service)}`,
  ];
  if (tier) lines.push(`📐 Обраний тариф: ${escapeHtml(tier)}`);
  lines.push("", "ℹ️ Клієнт звернувся окремо — будинок міг бути спроєктований і побудований не нами.");

  return lines.join("\n");
}
