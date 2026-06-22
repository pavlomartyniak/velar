/** Глобальна конфігурація сайту — джерело правди для SEO, sitemap, robots, JSON-LD. */
export const siteConfig = {
  name: "Velar Development",
  shortName: "Velar",
  // TODO: замінити на реальний продакшн-домен
  url: "https://velar.ua",
  description:
    "Velar Development — будівництво будинків, вілл і котеджів преміумкласу під ключ та реставрація. Створіть проєкт власної вілли в онлайн-конфігураторі за 3 хвилини.",
  locale: "uk_UA",
  ogImage: "/hero-villa.png",
  phone: "+380994407123",
  email: "velardevelopment@gmail.com",
  address: {
    locality: "Київ",
    street: "вул. Хрещатик, 1",
    country: "UA",
  },
  socials: ["https://www.instagram.com/velar_development", "", ""],
  keywords: [
    "будівництво будинків",
    "будівництво вілл",
    "котеджі під ключ",
    "реставрація будівель",
    "преміум будівництво",
    "проєкт будинку",
    "конфігуратор будинку",
    "будинок під ключ",
    "Velar Development",
  ],
} as const;
