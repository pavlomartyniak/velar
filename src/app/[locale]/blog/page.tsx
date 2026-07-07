import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import { getAllPosts, paginatePosts } from "@/lib/blog";
import BlogList from "@/components/blog/BlogList";

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { page } = await searchParams;
  const t = await getTranslations({ locale, namespace: "meta.blog" });
  const pageNum = Number(page) || 1;

  const metadata = createMetadata({
    locale: locale as Locale,
    title: t("title"),
    description: t("description"),
    path: "/blog",
  });

  // Сторінки пагінації, крім першої, не варто індексувати окремо — тонкий,
  // похідний контент; посилання з них усе одно передають вагу далі (follow).
  if (pageNum > 1) {
    metadata.robots = { index: false, follow: true };
  }

  return metadata;
}

export default async function BlogPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const { page } = await searchParams;
  setRequestLocale(locale);

  const posts = getAllPosts(locale as Locale);
  const { items, currentPage, totalPages } = paginatePosts(posts, Number(page) || 1);

  return (
    <BlogList
      locale={locale as Locale}
      posts={items}
      currentPage={currentPage}
      totalPages={totalPages}
    />
  );
}
