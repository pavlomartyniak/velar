import { z } from "zod";

export const DESIGN_CURRENCY = "USD";

/**
 * Конфігуратор ПРОЄКТУВАННЯ будинку.
 * Питання побудовані за логікою архітектурного брифу. Лейбли/описи — у
 * перекладах (namespace "designConfigurator"), тут лише логіка та ціни.
 *
 * Базова ставка — $/м² за обраним пакетом (Light/Basic/Premium), помножена на
 * множники складності (рельєф, поверховість, стиль, дах, фасад тощо) та з
 * додаванням фіксованих позицій (гараж, інженерні розділи, додаткові послуги).
 * Усі числа — орієнтовні, легко редагуються.
 */

/* ───────────────── Площа ───────────────── */

export const DESIGN_AREA_MIN = 60;
export const DESIGN_AREA_MAX = 1500;
export const DESIGN_AREA_STEP = 10;
export const DESIGN_AREA_DEFAULT = 180;

/* ───────────────── Крок 1 · Ділянка ───────────────── */

export const PLOT_STATUS_OPTIONS = [
  { value: "have" },
  { value: "buying" },
  { value: "searching" },
] as const;

export const TERRAIN_OPTIONS = [
  { value: "flat", multiplier: 1 },
  { value: "slope", multiplier: 1.08 },
  { value: "complex", multiplier: 1.15 },
] as const;

export const SURVEY_OPTIONS = [
  { value: "done", price: 0 },
  { value: "needHelp", price: 150 },
] as const;

/* ───────────────── Крок 2 · Будинок ───────────────── */

export const DESIGN_FLOORS_OPTIONS = [
  { value: "1", multiplier: 1 },
  { value: "mansard", multiplier: 1.05 },
  { value: "2", multiplier: 1.08 },
  { value: "3", multiplier: 1.15 },
] as const;

export const BASEMENT_OPTIONS = [
  { value: "none", multiplier: 1 },
  { value: "technical", multiplier: 1.05 },
  { value: "living", multiplier: 1.12 },
] as const;

export const GARAGE_OPTIONS = [
  { value: "none", price: 0 },
  { value: "integrated1", price: 250 },
  { value: "integrated2", price: 450 },
  { value: "separate", price: 600 },
] as const;

/* ───────────────── Крок 3 · Спосіб життя ───────────────── */

export const RESIDENTS_OPTIONS = [
  { value: "1-2" },
  { value: "3-4" },
  { value: "5-6" },
  { value: "7+" },
] as const;

export const DESIGN_BEDROOMS_OPTIONS = [
  { value: "1", price: 0 },
  { value: "2", price: 100 },
  { value: "3", price: 200 },
  { value: "4", price: 350 },
  { value: "5+", price: 500 },
] as const;

export const BATHROOMS_OPTIONS = [
  { value: "1", price: 0 },
  { value: "2", price: 80 },
  { value: "3", price: 160 },
  { value: "4+", price: 280 },
] as const;

export const HOUSEHOLD_OPTIONS = [
  { value: "single", multiplier: 1 },
  { value: "multiGen", multiplier: 1.08 },
] as const;

/* ───────────────── Крок 4 · Приміщення ───────────────── */

export const KITCHEN_OPTIONS = [
  { value: "separate" },
  { value: "open" },
  { value: "island" },
] as const;

export const SPECIAL_ROOMS = [
  { key: "dressing", price: 80 },
  { key: "pantry", price: 60 },
  { key: "laundry", price: 80 },
  { key: "boiler", price: 80 },
  { key: "gym", price: 150 },
  { key: "sauna", price: 200 },
  { key: "poolIndoor", price: 350 },
  { key: "cinema", price: 180 },
  { key: "wineCellar", price: 150 },
  { key: "office", price: 100 },
  { key: "workshop", price: 100 },
  { key: "guest", price: 120 },
  { key: "terrace", price: 100 },
  { key: "fireplace", price: 90 },
] as const;

export type SpecialRoomKey = (typeof SPECIAL_ROOMS)[number]["key"];

/* ───────────────── Крок 5 · Архітектура ───────────────── */

export const DESIGN_STYLE_OPTIONS = [
  { value: "minimalism", multiplier: 1 },
  { value: "modern", multiplier: 1.05 },
  { value: "toscana", multiplier: 1.08 },
  { value: "neoclassic", multiplier: 1.12 },
  { value: "classic", multiplier: 1.18 },
  { value: "baroque", multiplier: 1.3 },
] as const;

export const DESIGN_ROOF_OPTIONS = [
  { value: "flat", multiplier: 1 },
  { value: "pitched", multiplier: 1.05 },
  { value: "mansard", multiplier: 1.1 },
  { value: "complex", multiplier: 1.12 },
] as const;

export const FACADE_OPTIONS = [
  { value: "simple", multiplier: 1 },
  { value: "moderate", multiplier: 1.08 },
  { value: "complex", multiplier: 1.18 },
] as const;

/* ───────────────── Крок 6 · Інженерія ───────────────── */

export const DESIGN_HEATING_OPTIONS = [
  { value: "gas" },
  { value: "heatPump" },
  { value: "electric" },
  { value: "solidFuel" },
] as const;

export const ENGINEERING_SYSTEMS = [
  { key: "ventilation", price: 300 },
  { key: "ac", price: 200 },
  { key: "smartHome", price: 400 },
  { key: "solar", price: 250 },
  { key: "well", price: 200 },
  { key: "septic", price: 200 },
  { key: "generator", price: 150 },
] as const;

export type EngineeringSystemKey = (typeof ENGINEERING_SYSTEMS)[number]["key"];

/* ───────────────── Крок 7 · Обсяг проєкту ───────────────── */

export const DESIGN_PACKAGES = [
  { value: "light", pricePerM2: 15, includes3d: false, includesPassport: false, fixedFee: 0 },
  { value: "basic", pricePerM2: 17, includes3d: true, includesPassport: false, fixedFee: 0 },
  { value: "premium", pricePerM2: 17, includes3d: true, includesPassport: true, fixedFee: 200 },
] as const;

export type DesignPackageValue = (typeof DESIGN_PACKAGES)[number]["value"];

/** Додаткові послуги. supervision рахується як % від проміжної суми. */
export const DESIGN_EXTRAS = [
  { key: "viz3d", price: 400 },
  { key: "passport", price: 500 },
  { key: "interior", pricePerM2: 8 },
  { key: "landscape", price: 700 },
  { key: "supervision", percent: 0.1 },
] as const;

export type DesignExtraKey = (typeof DESIGN_EXTRAS)[number]["key"];

/* ───────────────── Схема ───────────────── */

const values = <T extends { value: string }>(opts: readonly T[]) =>
  opts.map((o) => o.value) as [T["value"], ...T["value"][]];

export const designConfiguratorSchema = z.object({
  // Ділянка
  plotStatus: z.enum(values(PLOT_STATUS_OPTIONS)),
  terrain: z.enum(values(TERRAIN_OPTIONS)),
  survey: z.enum(values(SURVEY_OPTIONS)),
  // Будинок
  area: z.number().min(DESIGN_AREA_MIN).max(DESIGN_AREA_MAX),
  floors: z.enum(values(DESIGN_FLOORS_OPTIONS)),
  basement: z.enum(values(BASEMENT_OPTIONS)),
  garage: z.enum(values(GARAGE_OPTIONS)),
  // Спосіб життя
  residents: z.enum(values(RESIDENTS_OPTIONS)),
  bedrooms: z.enum(values(DESIGN_BEDROOMS_OPTIONS)),
  bathrooms: z.enum(values(BATHROOMS_OPTIONS)),
  household: z.enum(values(HOUSEHOLD_OPTIONS)),
  // Приміщення
  kitchen: z.enum(values(KITCHEN_OPTIONS)),
  specialRooms: z.array(z.enum(SPECIAL_ROOMS.map((r) => r.key) as [SpecialRoomKey, ...SpecialRoomKey[]])),
  // Архітектура
  style: z.enum(values(DESIGN_STYLE_OPTIONS)),
  roof: z.enum(values(DESIGN_ROOF_OPTIONS)),
  facade: z.enum(values(FACADE_OPTIONS)),
  // Інженерія
  heating: z.array(z.enum(values(DESIGN_HEATING_OPTIONS))).min(1),
  systems: z.array(z.enum(ENGINEERING_SYSTEMS.map((s) => s.key) as [EngineeringSystemKey, ...EngineeringSystemKey[]])),
  // Обсяг
  package: z.enum(values(DESIGN_PACKAGES)),
  extras: z.array(z.enum(DESIGN_EXTRAS.map((e) => e.key) as [DesignExtraKey, ...DesignExtraKey[]])),
});

export type DesignConfiguratorValues = z.infer<typeof designConfiguratorSchema>;

export const defaultDesignValues = {
  plotStatus: "have",
  terrain: "flat",
  survey: "done",
  area: DESIGN_AREA_DEFAULT,
  floors: "2",
  basement: "none",
  garage: "integrated2",
  residents: "3-4",
  bedrooms: "3",
  bathrooms: "2",
  household: "single",
  kitchen: "open",
  specialRooms: [],
  style: "modern",
  roof: "pitched",
  facade: "moderate",
  heating: ["gas"],
  systems: [],
  package: "basic",
  extras: [],
} satisfies DesignConfiguratorValues;

/* ───────────────── Розрахунок ───────────────── */

export interface DesignBreakdown {
  base: number;
  designCore: number;
  fixedFees: number;
  supervision: number;
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

/** Орієнтовна вартість проєктування на основі відповідей. */
export function computeDesignPrice(v: Partial<DesignConfiguratorValues>): DesignBreakdown {
  const pkg = DESIGN_PACKAGES.find((p) => p.value === v.package) ?? DESIGN_PACKAGES[0];
  const area = v.area ?? 0;
  const base = pkg.pricePerM2 * area;

  const designCore =
    base *
    multiplierOf(TERRAIN_OPTIONS, v.terrain) *
    multiplierOf(DESIGN_FLOORS_OPTIONS, v.floors) *
    multiplierOf(BASEMENT_OPTIONS, v.basement) *
    multiplierOf(HOUSEHOLD_OPTIONS, v.household) *
    multiplierOf(DESIGN_STYLE_OPTIONS, v.style) *
    multiplierOf(DESIGN_ROOF_OPTIONS, v.roof) *
    multiplierOf(FACADE_OPTIONS, v.facade);

  const specialRoomsCost = SPECIAL_ROOMS.filter((r) =>
    v.specialRooms?.includes(r.key),
  ).reduce((sum, r) => sum + r.price, 0);

  const systemsCost = ENGINEERING_SYSTEMS.filter((s) =>
    v.systems?.includes(s.key),
  ).reduce((sum, s) => sum + s.price, 0);

  // Додаткові послуги (крім авторського нагляду, який рахується у %)
  let extrasCost = 0;
  if (v.extras?.includes("viz3d") && !pkg.includes3d) extrasCost += 400;
  if (v.extras?.includes("passport") && !pkg.includesPassport) extrasCost += 500;
  if (v.extras?.includes("interior")) extrasCost += area * 8;
  if (v.extras?.includes("landscape")) extrasCost += 700;

  const fixedFees =
    priceOf(SURVEY_OPTIONS, v.survey) +
    priceOf(GARAGE_OPTIONS, v.garage) +
    priceOf(DESIGN_BEDROOMS_OPTIONS, v.bedrooms) +
    priceOf(BATHROOMS_OPTIONS, v.bathrooms) +
    specialRoomsCost +
    systemsCost +
    pkg.fixedFee +
    extrasCost;

  const subtotal = designCore + fixedFees;
  const supervision = v.extras?.includes("supervision") ? subtotal * 0.1 : 0;
  const total = subtotal + supervision;

  return {
    base: Math.round(base),
    designCore: Math.round(designCore),
    fixedFees: Math.round(fixedFees),
    supervision: Math.round(supervision),
    total: Math.round(total),
    min: Math.round((total * 0.93) / 100) * 100,
    max: Math.round((total * 1.07) / 100) * 100,
  };
}

const currencyFormatter = new Intl.NumberFormat("uk-UA", {
  style: "currency",
  currency: DESIGN_CURRENCY,
  maximumFractionDigits: 0,
});

export const formatDesignCurrency = (value: number) => currencyFormatter.format(value);
