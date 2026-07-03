import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { createMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { BLOG_SLUGS, getPostBySlug } from "@/lib/blog";
import BlogPostHeader from "@/components/blog/BlogPostHeader";
import ArticleBody from "@/components/blog/ArticleBody";
import ServicesCta from "@/components/shared/ServicesCta";
import { Container } from "@mui/material";

type PageProps = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPostBySlug(locale as Locale, slug);
  if (!post) return {};

  return createMetadata({
    locale: locale as Locale,
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const post = getPostBySlug(locale as Locale, slug);
  if (!post) notFound();

  const tBlog = await getTranslations({ locale, namespace: "blog" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const postUrl = `${siteConfig.url}/${locale}/blog/${slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    mainEntityOfPage: { "@type": "WebPage", "@id": postUrl },
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    author: { "@id": `${siteConfig.url}/${locale}#organization` },
    publisher: { "@id": `${siteConfig.url}/${locale}#organization` },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: tNav("home"), item: `${siteConfig.url}/${locale}` },
      { "@type": "ListItem", position: 2, name: tBlog("title"), item: `${siteConfig.url}/${locale}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogPostHeader locale={locale as Locale} post={post} />
      <Container maxWidth="md" sx={{ pb: { xs: 8, md: 10 } }}>
        <ArticleBody blocks={post.blocks} />
      </Container>
      <ServicesCta />
    </>
  );
}
