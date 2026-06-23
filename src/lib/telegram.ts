import { ADDONS, HOUSE_STYLES, UTILITIES, computeBudget, formatCurrency, type ConfiguratorValues } from "@/features/configurator/schema";

const SOURCE_LABELS: Record<string, string> = {
  configurator: "Конфігуратор",
  design: "Сторінка проєктування",
};

const STYLE_LABELS: Record<string, string> = {
  classic: "Класика",
  neoclassic: "Неокласика",
  modern: "Модерн (сецесія)",
  minimalism: "Мінімалізм",
  toscana: "Тоскана",
};

const FINISH_LABELS: Record<string, string> = {
  standard: "Стандарт",
  premium: "Преміум",
  deluxe: "Делюкс",
};

const TIMELINE_LABELS: Record<string, string> = {
  standard: "Стандартний",
  fast: "Прискорений",
};

const WALL_LABELS: Record<string, string> = {
  aerated: "Газобетон",
  brick: "Цегла",
  monolith: "Монолітний залізобетон",
};

const ROOF_LABELS: Record<string, string> = {
  flat: "Плаский дах",
  pitched: "Похилий дах",
  mansard: "Мансардний дах",
};

const HEATING_LABELS: Record<string, string> = {
  gas: "Газове",
  heatPump: "Тепловий насос",
  electric: "Електричне",
};

const PLOT_LABELS: Record<string, string> = {
  have: "Є власна ділянка",
  search: "Потрібна допомога з ділянкою",
};

const TERRAIN_LABELS: Record<string, string> = {
  flat: "Рівна",
  slope: "З ухилом",
  complex: "Складний рельєф",
};

const FOUNDATION_LABELS: Record<string, string> = {
  slab: "Плитний фундамент",
  strip: "Стрічковий фундамент",
  pile: "Пальовий фундамент",
};

const BASEMENT_LABELS: Record<string, string> = {
  none: "Без цоколя",
  technical: "Технічний цоколь",
  living: "Житловий цоколь",
};

const WINDOWS_LABELS: Record<string, string> = {
  standard: "Стандартні вікна",
  energyEfficient: "Енергоефективні вікна",
  premium: "Преміум вікна",
};

const UTILITY_LABELS: Record<string, string> = {
  water: "Підключення води",
  gas: "Підключення газу",
  electricity: "Підключення електрики",
  sewage: "Підключення каналізації",
};

const ADDON_LABELS: Record<string, string> = {
  pool: "Басейн",
  spa: "SPA",
  garage: "Гараж",
  smartHome: "Smart Home",
  solar: "Сонячні панелі",
};

/* ── Англомовні дескриптори для AI-промпту візуалізації плану ── */

const STYLE_PROMPT_EN: Record<string, string> = {
  classic: "classic European architecture with a symmetrical, formal room layout",
  neoclassic: "neoclassical architecture with elegant proportions and a formal layout",
  modern: "Art Nouveau (secession) style with flowing, organic spatial planning",
  minimalism: "minimalist modern architecture with an open-plan, clean rectangular layout",
  toscana: "Tuscan villa architecture with warm, spacious living areas",
};

const FINISH_PROMPT_EN: Record<string, string> = {
  standard: "standard finishes",
  premium: "premium finishes",
  deluxe: "luxury deluxe finishes",
};

const ADDON_PROMPT_EN: Record<string, string> = {
  pool: "an outdoor swimming pool",
  spa: "a spa / wellness area",
  garage: "an attached garage",
  smartHome: "integrated smart-home systems",
  solar: "rooftop solar panels",
};

const FLOORS_PROMPT_EN: Record<string, string> = {
  "1": "single-story",
  "2": "two-story",
  "3": "three-story",
};

/** Детальний англомовний промпт для AI-генерації реалістичного плану будинку. */
export function buildFloorPlanPrompt(v: Partial<ConfiguratorValues>): string {
  const floors = v.floors ?? "2";
  const floorsWord = FLOORS_PROMPT_EN[floors] ?? `${floors}-story`;
  const area = v.area ?? 220;
  const bedrooms = (v.bedrooms ?? "3").replace("+", " or more");
  const style = v.style ? STYLE_PROMPT_EN[v.style] : "premium contemporary architecture";
  const finish = v.finish ? FINISH_PROMPT_EN[v.finish] : "standard finishes";

  const extras = ADDONS.filter((addon) => v.addons?.[addon.key])
    .map((addon) => ADDON_PROMPT_EN[addon.key])
    .filter(Boolean);

  const rooms = [
    "a spacious living room",
    "an open kitchen with a dining area",
    `${bedrooms} bedrooms including a master suite with en-suite bathroom and walk-in closet`,
    "additional bathrooms",
    "an entrance hall and hallways",
    "a utility / technical room",
  ];
  if (v.addons?.garage) rooms.push("an integrated garage");
  if (v.addons?.spa) rooms.push("a spa / wellness zone");
  if (v.addons?.pool) rooms.push("a terrace with access to an outdoor pool");

  const floorsNote =
    floors === "1"
      ? "Show the single floor level."
      : `Show all ${floors} floor levels arranged side by side, each clearly labeled.`;

  const extrasSentence = extras.length
    ? ` The house also features ${extras.join(", ")}.`
    : "";

  return [
    `Detailed top-down 2D architectural floor plan of a ${floorsWord} private premium house,`,
    `total living area approximately ${area} square meters, ${style}, ${finish}.`,
    `The layout includes: ${rooms.join(", ")}.${extrasSentence}`,
    floorsNote,
    "Professional architectural blueprint style: clean black lines on a white background,",
    "accurate wall thicknesses, room labels in English, furniture layout, door and window openings,",
    "dimension lines and measurements, scale bar, north arrow, orthographic top view.",
    "Highly detailed, precise, realistic technical drawing.",
  ].join(" ");
}

export const escapeHtml = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export interface LeadPayload {
  name: string;
  phone: string;
  source: string;
  configurator?: Partial<ConfiguratorValues>;
}

export function formatLeadMessage({ name, phone, source, configurator }: LeadPayload): string {
  const lines = [
    "🆕 <b>Нова заявка з сайту Velar</b>",
    `Джерело: ${SOURCE_LABELS[source] ?? source}`,
    "",
    `👤 Ім'я: ${name}`,
    `📞 Телефон: ${phone}`,
  ];

  if (configurator?.style) {
    const style = HOUSE_STYLES.find((s) => s.value === configurator.style);
    const budget = computeBudget(configurator);
    const addons = ADDONS.filter((addon) => configurator.addons?.[addon.key]).map(
      (addon) => ADDON_LABELS[addon.key],
    );
    const utilities = UTILITIES.filter(
      (utility) => configurator.utilities?.[utility.key],
    ).map((utility) => UTILITY_LABELS[utility.key]);

    lines.push(
      "",
      "🏠 <b>Параметри з конфігуратора:</b>",
      `Стиль: ${style ? STYLE_LABELS[style.value] : "—"}`,
      `Площа: ${configurator.area ?? "—"} м²`,
      `Поверхи: ${configurator.floors ?? "—"}`,
      `Спальні: ${configurator.bedrooms ?? "—"}`,
      `Оздоблення: ${configurator.finish ? FINISH_LABELS[configurator.finish] : "—"}`,
      `Термін: ${configurator.timeline ? TIMELINE_LABELS[configurator.timeline] : "—"}`,
      `Стіни: ${configurator.wallMaterial ? WALL_LABELS[configurator.wallMaterial] : "—"}`,
      `Дах: ${configurator.roof ? ROOF_LABELS[configurator.roof] : "—"}`,
      `Опалення: ${configurator.heating?.length ? configurator.heating.map((h) => HEATING_LABELS[h]).join(", ") : "—"}`,
      `Ділянка: ${configurator.plotStatus ? PLOT_LABELS[configurator.plotStatus] : "—"}`,
      `Рельєф: ${configurator.terrain ? TERRAIN_LABELS[configurator.terrain] : "—"}`,
      `Фундамент: ${configurator.foundation ? FOUNDATION_LABELS[configurator.foundation] : "—"}`,
      `Мережі, що потребують підключення: ${utilities.length ? utilities.join(", ") : "—"}`,
      `Цоколь: ${configurator.basement ? BASEMENT_LABELS[configurator.basement] : "—"}`,
      `Вікна: ${configurator.windows ? WINDOWS_LABELS[configurator.windows] : "—"}`,
      `Опції: ${addons.length ? addons.join(", ") : "—"}`,
      `Орієнтовний бюджет: ${formatCurrency(budget.min)} – ${formatCurrency(budget.max)}`,
      "",
      "🎨 <b>Промпт для AI-візуалізації плану</b> (скопіюйте та надішліть ШІ):",
      `<pre>${escapeHtml(buildFloorPlanPrompt(configurator))}</pre>`,
    );
  }

  return lines.join("\n");
}

/** Надсилає заявку у Telegram. Без налаштованого токена — лише логує на сервері. */
export async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("[lead] TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID не налаштовані — заявка не надіслана:\n", text);
    return false;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
    return response.ok;
  } catch {
    return false;
  }
}
