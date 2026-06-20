import {
  SPECIAL_ROOMS,
  computeDesignPrice,
  formatDesignCurrency,
  type DesignConfiguratorValues,
} from "@/features/design-configurator/schema";
import { escapeHtml } from "./telegram";

/* ── Українські лейбли для повідомлення в Telegram ── */

const PLOT_STATUS: Record<string, string> = {
  have: "Є власна ділянка",
  buying: "В процесі купівлі",
  searching: "У пошуку ділянки",
};
const TERRAIN: Record<string, string> = {
  flat: "Рівна",
  slope: "З ухилом",
  complex: "Складний рельєф",
};
const SURVEY: Record<string, string> = {
  done: "Геодезія/геологія є",
  needHelp: "Потрібна допомога з вишукуваннями",
};
const FLOORS: Record<string, string> = {
  "1": "1 поверх",
  mansard: "Мансардний",
  "2": "2 поверхи",
  "3": "3 поверхи",
};
const BASEMENT: Record<string, string> = {
  none: "Без цоколя",
  technical: "Технічний цоколь",
  living: "Житловий цоколь",
};
const GARAGE: Record<string, string> = {
  none: "Без гаража",
  integrated1: "Вбудований на 1 авто",
  integrated2: "Вбудований на 2 авто",
  separate: "Окремий гараж",
};
const HOUSEHOLD: Record<string, string> = {
  single: "Одна сім'я",
  multiGen: "Кілька поколінь",
};
const KITCHEN: Record<string, string> = {
  separate: "Окрема кухня",
  open: "Кухня-вітальня",
  island: "Кухня з островом",
};
const STYLE: Record<string, string> = {
  minimalism: "Мінімалізм",
  modern: "Модерн",
  toscana: "Тоскана",
  neoclassic: "Неокласика",
  classic: "Класика",
  baroque: "Бароко",
};
const ROOF: Record<string, string> = {
  flat: "Плаский",
  pitched: "Похилий",
  mansard: "Мансардний",
  complex: "Складний (багатоскатний)",
};
const FACADE: Record<string, string> = {
  simple: "Простий фасад",
  moderate: "Помірно деталізований",
  complex: "Складний фасад",
};
const HEATING: Record<string, string> = {
  gas: "Газове",
  heatPump: "Тепловий насос",
  electric: "Електричне",
  solidFuel: "Твердопаливне",
};
const SPECIAL_ROOM_LABELS: Record<string, string> = {
  dressing: "Гардеробна",
  pantry: "Комора",
  laundry: "Пральня",
  boiler: "Котельня",
  gym: "Спортзал",
  sauna: "Сауна",
  poolIndoor: "Критий басейн",
  cinema: "Домашній кінотеатр",
  wineCellar: "Винний погріб",
  office: "Кабінет",
  workshop: "Майстерня",
  guest: "Гостьова кімната",
  terrace: "Тераса",
  fireplace: "Камін",
};
const SYSTEM_LABELS: Record<string, string> = {
  ventilation: "Вентиляція з рекуперацією",
  ac: "Кондиціювання",
  smartHome: "Розумний дім",
  solar: "Сонячні панелі",
  well: "Свердловина",
  septic: "Септик / очисна станція",
  generator: "Резервне живлення",
};
const PACKAGE_LABELS: Record<string, string> = {
  light: "Light",
  basic: "Basic",
  premium: "Premium",
};
const EXTRA_LABELS: Record<string, string> = {
  viz3d: "3D-візуалізація",
  passport: "Будівельний паспорт",
  interior: "Дизайн інтер'єру",
  landscape: "Ландшафтний дизайн",
  supervision: "Авторський нагляд",
};

/* ── Англомовний промпт для AI-візуалізації плану проєктування ── */

const STYLE_PROMPT_EN: Record<string, string> = {
  minimalism: "minimalist modern architecture with an open-plan, clean rectangular layout",
  modern: "contemporary modern architecture with bold geometric volumes",
  toscana: "Tuscan villa architecture with warm, spacious living areas",
  neoclassic: "neoclassical architecture with elegant proportions and a formal layout",
  classic: "classic European architecture with a symmetrical, formal room layout",
  baroque: "grand baroque-influenced architecture with ornate, spacious rooms",
};
const FLOORS_PROMPT_EN: Record<string, string> = {
  "1": "single-story",
  mansard: "one-and-a-half story (with a habitable attic)",
  "2": "two-story",
  "3": "three-story",
};

export function buildDesignPlanPrompt(v: Partial<DesignConfiguratorValues>): string {
  const floorsWord = FLOORS_PROMPT_EN[v.floors ?? "2"] ?? "two-story";
  const area = v.area ?? 180;
  const bedrooms = (v.bedrooms ?? "3").replace("+", " or more");
  const bathrooms = (v.bathrooms ?? "2").replace("+", " or more");
  const style = v.style ? STYLE_PROMPT_EN[v.style] : "premium contemporary architecture";

  const kitchen =
    v.kitchen === "separate"
      ? "a separate kitchen"
      : v.kitchen === "island"
        ? "a kitchen with a central island and dining area"
        : "an open-plan kitchen-living room with a dining area";

  const rooms = [
    "a spacious living room",
    kitchen,
    `${bedrooms} bedrooms including a master suite with en-suite bathroom and walk-in closet`,
    `${bathrooms} bathrooms`,
    "an entrance hall and hallways",
  ];
  if (v.basement && v.basement !== "none") rooms.push("a basement level");
  if (v.garage && v.garage !== "none") rooms.push("an integrated garage");
  SPECIAL_ROOMS.forEach((r) => {
    if (v.specialRooms?.includes(r.key)) rooms.push(`a ${SPECIAL_ROOM_LABELS_EN[r.key]}`);
  });

  const floorsNote =
    v.floors === "1"
      ? "Show the single floor level."
      : "Show all floor levels arranged side by side, each clearly labeled.";

  return [
    `Detailed top-down 2D architectural floor plan of a ${floorsWord} private premium house,`,
    `total living area approximately ${area} square meters, ${style}.`,
    `The layout includes: ${rooms.join(", ")}.`,
    floorsNote,
    "Professional architectural blueprint style: clean black lines on a white background,",
    "accurate wall thicknesses, room labels in English, furniture layout, door and window openings,",
    "dimension lines and measurements, scale bar, north arrow, orthographic top view.",
    "Highly detailed, precise, realistic technical drawing.",
  ].join(" ");
}

const SPECIAL_ROOM_LABELS_EN: Record<string, string> = {
  dressing: "dressing room",
  pantry: "pantry",
  laundry: "laundry room",
  boiler: "boiler / utility room",
  gym: "home gym",
  sauna: "sauna",
  poolIndoor: "indoor swimming pool",
  cinema: "home cinema",
  wineCellar: "wine cellar",
  office: "home office",
  workshop: "workshop",
  guest: "guest room",
  terrace: "terrace",
  fireplace: "living room with a fireplace",
};

const list = (map: Record<string, string>, keys: readonly string[] | undefined) =>
  keys?.length ? keys.map((k) => map[k] ?? k).join(", ") : "—";

/** Формує повідомлення в Telegram для заявки з конфігуратора проєктування. */
export function formatDesignLeadMessage(
  name: string,
  phone: string,
  v: Partial<DesignConfiguratorValues>,
): string {
  const price = computeDesignPrice(v);
  const pkg = v.package ? PACKAGE_LABELS[v.package] : "—";

  const lines = [
    "🆕 <b>Нова заявка — ПРОЄКТУВАННЯ</b>",
    "Джерело: Конфігуратор проєктування",
    "",
    `👤 Ім'я: ${name}`,
    `📞 Телефон: ${phone}`,
    "",
    "📐 <b>Ділянка:</b>",
    `Статус: ${v.plotStatus ? PLOT_STATUS[v.plotStatus] : "—"}`,
    `Рельєф: ${v.terrain ? TERRAIN[v.terrain] : "—"}`,
    `Вишукування: ${v.survey ? SURVEY[v.survey] : "—"}`,
    "",
    "🏠 <b>Будинок:</b>",
    `Площа: ${v.area ?? "—"} м²`,
    `Поверховість: ${v.floors ? FLOORS[v.floors] : "—"}`,
    `Цоколь: ${v.basement ? BASEMENT[v.basement] : "—"}`,
    `Гараж: ${v.garage ? GARAGE[v.garage] : "—"}`,
    "",
    "👨‍👩‍👧 <b>Спосіб життя:</b>",
    `Мешканців: ${v.residents ?? "—"}`,
    `Спальні: ${v.bedrooms ?? "—"}`,
    `Санвузли: ${v.bathrooms ?? "—"}`,
    `Склад родини: ${v.household ? HOUSEHOLD[v.household] : "—"}`,
    "",
    "🛋 <b>Приміщення:</b>",
    `Кухня: ${v.kitchen ? KITCHEN[v.kitchen] : "—"}`,
    `Спецприміщення: ${list(SPECIAL_ROOM_LABELS, v.specialRooms)}`,
    "",
    "🏛 <b>Архітектура:</b>",
    `Стиль: ${v.style ? STYLE[v.style] : "—"}`,
    `Дах: ${v.roof ? ROOF[v.roof] : "—"}`,
    `Фасад: ${v.facade ? FACADE[v.facade] : "—"}`,
    "",
    "⚙️ <b>Інженерія:</b>",
    `Опалення: ${list(HEATING, v.heating)}`,
    `Системи: ${list(SYSTEM_LABELS, v.systems)}`,
    "",
    "📋 <b>Обсяг проєкту:</b>",
    `Пакет: ${pkg}`,
    `Додатково: ${list(EXTRA_LABELS, v.extras)}`,
    "",
    `💰 <b>Орієнтовна вартість проєктування: ${formatDesignCurrency(price.min)} – ${formatDesignCurrency(price.max)}</b>`,
    "",
    "🎨 <b>Промпт для AI-візуалізації плану</b> (скопіюйте та надішліть ШІ):",
    `<pre>${escapeHtml(buildDesignPlanPrompt(v))}</pre>`,
  ];

  return lines.join("\n");
}
