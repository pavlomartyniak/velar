import type { Locale } from "@/i18n/routing";
import { posts as uk } from "@/content/blog/uk";
import { posts as en } from "@/content/blog/en";
import { posts as de } from "@/content/blog/de";
import { posts as fr } from "@/content/blog/fr";
import { posts as it } from "@/content/blog/it";
import { posts as pl } from "@/content/blog/pl";

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  /** ISO-дата публікації, напр. "2026-06-01". */
  publishedAt: string;
  blocks: BlogBlock[];
};

const POSTS_BY_LOCALE: Record<Locale, BlogPost[]> = { uk, en, de, fr, it, pl };

/** Канонічний перелік slug'ів — однаковий у всіх локалях (для sitemap і generateStaticParams). */
export const BLOG_SLUGS = POSTS_BY_LOCALE.uk.map((post) => post.slug);

export const BLOG_PAGE_SIZE = 6;

/** Найновіші статті першими. */
export function getAllPosts(locale: Locale): BlogPost[] {
  return [...POSTS_BY_LOCALE[locale]].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export function getPostBySlug(locale: Locale, slug: string): BlogPost | undefined {
  return POSTS_BY_LOCALE[locale].find((post) => post.slug === slug);
}

/** Розбиває список статей на сторінку розміром BLOG_PAGE_SIZE; page — 1-індексована, затиснута в межі. */
export function paginatePosts(posts: BlogPost[], page: number) {
  const totalPages = Math.max(1, Math.ceil(posts.length / BLOG_PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * BLOG_PAGE_SIZE;
  return {
    items: posts.slice(start, start + BLOG_PAGE_SIZE),
    currentPage,
    totalPages,
  };
}
