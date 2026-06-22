import { z } from "zod";

export const CURRENCY = "USD";

/**
 * Опції конфігуратора містять лише логіку (значення, ціни, множники, зображення).
 * Лейбли та описи — у перекладах (namespace "configurator"), за ключем value.
 */

export const HOUSE_STYLES = [
  { value: "classic", pricePerM2: 1560, image: "/house-styles/classic.jpg" },
  {
    value: "neoclassic",
    pricePerM2: 1440,
    image: "/house-styles/neo-classic.png",
  },
  { value: "modern", pricePerM2: 1625, image: "/house-styles/modern.jpg" },
  {
    value: "minimalism",
    pricePerM2: 1250,
    image: "/house-styles/minimalism.jpg",
  },
  { value: "toscana", pricePerM2: 1375, image: "/house-styles/toscana.jpg" },
] as const;

export type HouseStyleValue = (typeof HOUSE_STYLES)[number]["value"];

export const ADDONS = [
  { key: "pool", price: 24000 },
  { key: "spa", price: 30000 },
  { key: "garage", price: 18000 },
  { key: "smartHome", price: 18000 },
  { key: "solar", price: 15000 },
] as const;

export type AddonKey = (typeof ADDONS)[number]["key"];

/* ───────────────── Крок «Деталі» ───────────────── */

export const FLOORS_OPTIONS = [
  { value: "1", multiplier: 1 },
  { value: "2", multiplier: 1.05 },
  { value: "3", multiplier: 1.12 },
] as const;

export const BEDROOMS_OPTIONS = [
  { value: "2", price: 0 },
  { value: "3", price: 10000 },
  { value: "4", price: 22000 },
  { value: "5+", price: 38000 },
] as const;

export const FINISH_OPTIONS = [
  { value: "standard", multiplier: 1 },
  { value: "premium", multiplier: 1.25 },
  { value: "deluxe", multiplier: 1.5 },
] as const;

export const TIMELINE_OPTIONS = [
  { value: "standard", multiplier: 1 },
  { value: "fast", multiplier: 1.15 },
] as const;

/* ───────────────── Крок «Інженерія» ───────────────── */

export const WALL_OPTIONS = [
  { value: "aerated", multiplier: 1 },
  { value: "brick", multiplier: 1.08 },
  { value: "monolith", multiplier: 1.18 },
] as const;

export const ROOF_OPTIONS = [
  { value: "flat", multiplier: 1 },
  { value: "pitched", multiplier: 1.04 },
  { value: "mansard", multiplier: 1.08 },
] as const;

export const HEATING_OPTIONS = [
  { value: "gas", price: 0 },
  { value: "heatPump", price: 15000 },
  { value: "electric", price: 5000 },
] as const;

export const PLOT_OPTIONS = [{ value: "have" }, { value: "search" }] as const;

const values = <T extends { value: string }>(opts: readonly T[]) =>
  opts.map((o) => o.value) as [T["value"], ...T["value"][]];

export const AREA_MIN = 80;
export const AREA_MAX = 1000;
export const AREA_STEP = 10;
export const AREA_DEFAULT = 220;

export const configuratorSchema = z.object({
  style: z.enum(values(HOUSE_STYLES)),
  area: z.number().min(AREA_MIN).max(AREA_MAX),
  floors: z.enum(values(FLOORS_OPTIONS)),
  bedrooms: z.enum(values(BEDROOMS_OPTIONS)),
  finish: z.enum(values(FINISH_OPTIONS)),
  timeline: z.enum(values(TIMELINE_OPTIONS)),
  wallMaterial: z.enum(values(WALL_OPTIONS)),
  roof: z.enum(values(ROOF_OPTIONS)),
  heating: z.array(z.enum(values(HEATING_OPTIONS))).min(1),
  plot: z.enum(values(PLOT_OPTIONS)),
  addons: z.object({
    pool: z.boolean(),
    spa: z.boolean(),
    garage: z.boolean(),
    smartHome: z.boolean(),
    solar: z.boolean(),
  }),
});

export type ConfiguratorValues = z.infer<typeof configuratorSchema>;

export const defaultConfiguratorValues = {
  area: AREA_DEFAULT,
  floors: "2",
  bedrooms: "3",
  finish: "standard",
  timeline: "standard",
  wallMaterial: "aerated",
  roof: "pitched",
  heating: ["gas"],
  plot: "have",
  addons: {
    pool: false,
    spa: false,
    garage: false,
    smartHome: false,
    solar: false,
  },
} satisfies Partial<ConfiguratorValues>;

export interface BudgetBreakdown {
  base: number;
  construction: number;
  bedroomsCost: number;
  heatingCost: number;
  addonsTotal: number;
  total: number;
  min: number;
  max: number;
}

const multiplierOf = <T extends { value: string; multiplier: number }>(
  opts: readonly T[],
  value: string | undefined,
) => opts.find((o) => o.value === value)?.multiplier ?? 1;

const priceOf = <T extends { value: string; price: number }>(
  opts: readonly T[],
  value: string | undefined,
) => opts.find((o) => o.value === value)?.price ?? 0;

export const bedroomsCostOf = (value: string | undefined) =>
  priceOf(BEDROOMS_OPTIONS, value);
export const heatingCostOf = (selected: readonly string[] | undefined) =>
  (selected ?? []).reduce((sum, v) => sum + priceOf(HEATING_OPTIONS, v), 0);

/** Орієнтовний кошторис на основі всіх відповідей конфігуратора. */
export function computeBudget(v: Partial<ConfiguratorValues>): BudgetBreakdown {
  const style = HOUSE_STYLES.find((s) => s.value === v.style);
  const area = v.area ?? 0;
  const base = style ? style.pricePerM2 * area : 0;

  const construction =
    base *
    multiplierOf(FINISH_OPTIONS, v.finish) *
    multiplierOf(FLOORS_OPTIONS, v.floors) *
    multiplierOf(TIMELINE_OPTIONS, v.timeline) *
    multiplierOf(WALL_OPTIONS, v.wallMaterial) *
    multiplierOf(ROOF_OPTIONS, v.roof);

  const bedroomsCost = priceOf(BEDROOMS_OPTIONS, v.bedrooms);
  const heatingCost = heatingCostOf(v.heating);
  const addonsTotal = ADDONS.reduce(
    (sum, addon) => sum + (v.addons?.[addon.key] ? addon.price : 0),
    0,
  );
  const total = construction + bedroomsCost + heatingCost + addonsTotal;

  return {
    base,
    construction: Math.round(construction),
    bedroomsCost,
    heatingCost,
    addonsTotal,
    total,
    min: Math.round((total * 0.95) / 1000) * 1000,
    max: Math.round((total * 1.05) / 1000) * 1000,
  };
}

const currencyFormatter = new Intl.NumberFormat("uk-UA", {
  style: "currency",
  currency: CURRENCY,
  maximumFractionDigits: 0,
});

export const formatCurrency = (value: number) =>
  currencyFormatter.format(value);
